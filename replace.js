const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('src/**/*.{ts,tsx,js,jsx}');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace case variations of "Royal London Guests"
  content = content.replace(/our Royal London Guests/gi, 'our London guests');
  content = content.replace(/our Royal London guests/gi, 'our London guests');
  content = content.replace(/Royal London Guests/gi, 'our London guests');
  content = content.replace(/Royal London guests/gi, 'our London guests');
  content = content.replace(/our Royal London/gi, 'our London guests');
  
  // Replace remaining "Royal London"
  content = content.replace(/Royal London/gi, 'our London guests');

  // Fix up cases where we might have "our London guests guests" or "our London guests Guest"
  content = content.replace(/our London guests Guests/gi, 'our London guests');
  content = content.replace(/our London guests guests/gi, 'our London guests');
  content = content.replace(/our London guests Guest/gi, 'our London guests');
  content = content.replace(/our London guests guest/gi, 'our London guests');

  // Fix up "our our London guests"
  content = content.replace(/our our London guests/gi, 'our London guests');
  content = content.replace(/Our our London guests/gi, 'Our London guests');

  // Fix capitalization if it's at the beginning of a title or sentence
  content = content.replace(/Detailed our London guests/g, 'Detailed London Guests');
  content = content.replace(/Dual-Phase our London guests/g, 'Dual-Phase London Guests');
  content = content.replace(/Confidential our London guests/g, 'Confidential London Guests');
  content = content.replace(/Exportable our London guests/g, 'Exportable London Guests');
  content = content.replace(/Printable our London guests/g, 'Printable London Guests');

  // Any other capitalized places?
  // Let's just run it, but we can review git diff or just check output.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
}
