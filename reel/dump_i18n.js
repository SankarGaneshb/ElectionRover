import fs from 'fs';
import path from 'path';

const fileContent = fs.readFileSync('c:\\Users\\bsank\\ElectionRover\\src\\shared\\lib\\i18n.js', 'utf-8');

// Strip imports
const stripped = fileContent
  .replace(/import .*/g, '')
  .replace('export const resources', 'global.resources');

// Evaluate the code to get the object
eval(stripped);

console.log(JSON.stringify(global.resources, null, 2));
