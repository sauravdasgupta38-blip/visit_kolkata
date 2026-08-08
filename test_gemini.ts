import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  const contents: any[] = [{ role: 'user', parts: [{ text: 'Add an event at 9 AM' }] }];
  const config = {
    tools: [{
      functionDeclarations: [{
        name: 'add_event',
        description: 'Add an event',
        parameters: { type: 'object', properties: { time: { type: 'string' } }, required: ['time'] }
      }]
    }]
  };
  
  let response = await ai.models.generateContent({ model: 'gemini-3.5-flash', contents, config });
  
  if (response.functionCalls && response.functionCalls.length > 0) {
    const fnCall = response.functionCalls[0];
    const modelPart = response.candidates![0].content.parts[0];
    console.log('Original model part:', JSON.stringify(modelPart));
    
    // push model response
    contents.push(response.candidates![0].content);
    
    // push user response
    contents.push({
      role: 'user',
      parts: [{
        functionResponse: {
          name: fnCall.name,
          response: { success: true }
        }
      }]
    });
    
    console.log('Executing second call...');
    try {
      response = await ai.models.generateContent({ model: 'gemini-3.5-flash', contents, config });
      console.log('Success!', response.text);
    } catch (e: any) {
      console.error('Error in second call:', e.message);
    }
  }
}
run();
