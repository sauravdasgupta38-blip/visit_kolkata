const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = getFiles(path.resolve('./src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix capitalizations
  content = content.replace(/our London guests/g, 'Our London Guests');
  content = content.replace(/OUR LONDON GUESTS/g, 'Our London Guests');

  // Fix grammar cases where it was used as an adjective
  content = content.replace(/Our London Guests Visit Brief/g, 'Visit Brief for Our London Guests');
  content = content.replace(/Confidential Our London Guests Brief/g, 'Confidential Brief for Our London Guests');
  content = content.replace(/Detailed Our London Guests Blueprint/g, 'Detailed Blueprint for Our London Guests');
  content = content.replace(/Dual-Phase Our London Guests Visit/g, 'Dual-Phase Visit for Our London Guests');
  content = content.replace(/Exportable Our London Guests Summary/g, 'Exportable Summary for Our London Guests');
  content = content.replace(/Printable Our London Guests Brief/g, 'Printable Brief for Our London Guests');
  content = content.replace(/Our London Guests Nightlife/g, 'Nightlife for Our London Guests');
  content = content.replace(/Our London Guests Advisory/g, 'Advisory for Our London Guests');
  content = content.replace(/Our London Guests Forecast Window/g, 'Forecast Window for Our London Guests');
  content = content.replace(/Our London Guests Packing & Essential Guidelines/g, 'Packing & Essential Guidelines for Our London Guests');
  content = content.replace(/Essential Our London Guests Guidelines/g, 'Essential Guidelines for Our London Guests');
  content = content.replace(/Luxury Our London Guests Guide/g, 'Luxury Guide for Our London Guests');
  content = content.replace(/Our London Guests Concierge/g, 'Concierge for Our London Guests');
  content = content.replace(/Our London Guests Desk/g, 'Desk for Our London Guests');
  content = content.replace(/Our London Guests Confidential/g, 'Confidential for Our London Guests');
  content = content.replace(/Private Our London Guests Club/g, 'Private Club for Our London Guests');
  content = content.replace(/Our London Guests hotels/g, 'hotels for Our London Guests');
  content = content.replace(/Our London Guests Emergency Liaison/g, 'Emergency Liaison for Our London Guests');
  content = content.replace(/Our London Guests Helpline/g, 'Helpline for Our London Guests');
  content = content.replace(/Our London Guests Evening Attire/g, 'Evening Attire for Our London Guests');
  content = content.replace(/Our London Guests Casual/g, 'Casual Attire for Our London Guests');
  content = content.replace(/Our London Guests chauffeur/g, 'chauffeur for Our London Guests');
  content = content.replace(/Our London Guests travel/g, 'travel for Our London Guests');
  content = content.replace(/PROPOSED OUR LONDON GUESTS WINDOW/gi, 'PROPOSED WINDOW FOR OUR LONDON GUESTS');
  content = content.replace(/OUR LONDON GUESTS 5-DAY BLUEPRINT/gi, '5-DAY BLUEPRINT FOR OUR LONDON GUESTS');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
}
