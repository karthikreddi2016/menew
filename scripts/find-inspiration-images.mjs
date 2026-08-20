import fs from 'fs';

const nodes = JSON.parse(fs.readFileSync('scripts/all-image-nodes.json', 'utf8'));

const inspirationNodes = nodes.filter(n => 
  n.name.toLowerCase().includes('inspiration') || 
  n.name.toLowerCase().includes('ppt') ||
  n.name.toLowerCase().includes('deck') ||
  n.name.toLowerCase().includes('card')
);

console.log('Inspiration related image nodes:', JSON.stringify(inspirationNodes, null, 2));

// Also let's check all unique imageRefs in all-image-nodes.json
const uniqueRefs = new Set();
for (const n of nodes) {
  for (const f of n.fills) {
    if (f.imageRef) uniqueRefs.add(f.imageRef);
  }
}
console.log('Total unique image refs in Figma file:', uniqueRefs.size);
