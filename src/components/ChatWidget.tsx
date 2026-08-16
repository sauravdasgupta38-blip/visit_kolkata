import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '../types';
import { Sparkles, MessageSquare, X, Send, Bot, User, Languages, RefreshCw, ChevronRight } from 'lucide-react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleChanged?: () => void;
  user: 'A' | 'B';
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, onScheduleChanged, user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Nomoshkar! I am the Tilottama AI Guide, your dedicated cultural concierge. How may I help you curate your Kolkata experience today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: 'English'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([
    "I want to change the schedule",
    "Can you show me the schedule for 10th Oct 2026",
    "Tell me something about the Durga Puja",
    "Show me the best spots for evening nightlife in Park Street"
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map(m => ({ role: m.sender, content: m.text })),
          user
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply || "Nomoshkar! I am here to help refine your Kolkata itinerary.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);

        if (data.suggestedPrompts && Array.isArray(data.suggestedPrompts)) {
          setPrompts(data.suggestedPrompts);
        }

        // If the schedule was modified by the chatbot, notify parent to refresh
        if (data.scheduleChanged && onScheduleChanged) {
          onScheduleChanged();
        }
      } else {
        throw new Error('Chat server returned non-OK status');
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: "Nomoshkar! I experienced a temporary network connection hiccup. As a reminder, October 1–5 is our serene pre-festival window in Kolkata. Please feel free to ask another query!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onClose} // opens chat when clicked
        className="fixed bottom-6 right-6 z-50 p-2 pr-6 rounded-full vermilion-gradient gold-border text-white shadow-2xl hover:scale-105 transition-all duration-300 group flex items-center gap-4"
        aria-label="Open AI Concierge Chat"
      >
        <img src="/tilottama.png" alt="Tilottama AI Guide" className="w-20 h-20 rounded-full object-cover animate-pulse shadow-md border-2 border-[#D4AF37]" />
        <span className="font-serif-heading text-lg font-bold tracking-wide hidden sm:inline">
          Tilottama AI Guide
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh] bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37] shadow-2xl flex flex-col overflow-hidden no-print">

      {/* Header */}
      <div className="p-4 bg-[#4A0E17] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full vermilion-gradient gold-border flex items-center justify-center overflow-hidden shrink-0 shadow-md">
            <img src="/tilottama.png" alt="Tilottama" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-heading font-bold text-base text-[#FAF7F2]">
                Tilottama AI Guide
              </h3>
              <span className="text-[10px] bg-[#D4AF37] text-[#4A0E17] font-extrabold px-1.5 py-0.2 rounded">
                2026
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
              <Bot className="w-3 h-3" />
              <span>OpenAI Powered AI Agent</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-white/60">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-10 h-10 rounded-full vermilion-gradient gold-border flex items-center justify-center shrink-0 mt-0.5 overflow-hidden shadow-sm">
                  <img src="/tilottama.png" alt="Tilottama" className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${isUser
                  ? 'bg-[#4A0E17] text-white rounded-tr-none border border-[#D4AF37]/30'
                  : 'bg-[#FAF7F2] text-[#1A1A1A] rounded-tl-none border border-gray-200'
                  }`}
              >
                <div className="markdown-chat-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ node, ...props }) => <strong className={isUser ? "font-semibold" : "font-bold text-[#8A1515]"} {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-2 space-y-1 marker:text-[#D4AF37]" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-2 space-y-1 marker:text-[#D4AF37]" {...props} />,
                      li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed" {...props} />,
                    }}
                  >
                    {m.text}
                  </ReactMarkdown>
                </div>
                <span className={`text-[9px] block text-right mt-1.5 ${isUser ? 'text-white/60' : 'text-gray-400'}`}>
                  {m.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-gray-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#4A0E17] bg-[#FAF7F2] p-3 rounded-2xl w-fit border border-gray-200">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C82323]" />
            <span>Consulting Tilottama...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-2 bg-[#FAF7F2] border-t border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p)}
            className="px-2.5 py-1 rounded-full bg-white text-[10px] font-semibold text-[#4A0E17] border border-gray-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 shrink-0 transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Kumartuli, Rajbaris, or dining in October..."
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="p-2.5 rounded-xl vermilion-gradient text-white hover:brightness-110 transition-all disabled:opacity-40 gold-border shrink-0"
          >
            <Send className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </form>
      </div>

    </div>
  );
};
