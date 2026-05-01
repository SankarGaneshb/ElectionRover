import fs from 'fs';

const fileContent = fs.readFileSync('c:\\Users\\bsank\\ElectionRover\\src\\shared\\lib\\i18n.js', 'utf-8');

// Use regex to extract the resources object
const match = fileContent.match(/export const resources = ([\s\S]*?)^};/m);

if (match) {
  const jsonStr = match[1] + '}';
  // Safely evaluate as an object
  let resources;
  eval('resources = ' + jsonStr);
  fs.writeFileSync('c:\\Users\\bsank\\ElectionRover\\reel\\extracted_i18n.json', JSON.stringify(resources, null, 2));
  console.log('Saved to extracted_i18n.json');
} else {
  console.log('Could not find resources object');
}
