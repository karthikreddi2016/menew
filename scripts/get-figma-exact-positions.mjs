import fs from 'fs';

const fullData = JSON.parse(fs.readFileSync('scripts/figma-full-landing.json', 'utf8'));
const landingPage = fullData.nodes['249:15308'].document;

function findNode(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const c of node.children) {
      const f = findNode(c, id);
      if (f) return f;
    }
  }
  return null;
}

const headerSection = findNode(landingPage, '249:15309');
console.log('=== HEADER SECTION ===');
console.log('Header box:', headerSection.absoluteBoundingBox);
console.log('Header layoutMode:', headerSection.layoutMode);
console.log('Header padding:', headerSection.paddingTop, headerSection.paddingRight, headerSection.paddingBottom, headerSection.paddingLeft);
console.log('Header itemSpacing:', headerSection.itemSpacing);

for (const child of headerSection.children) {
  console.log(`\nChild: "${child.name}" (id: ${child.id})`);
  console.log('  box:', child.absoluteBoundingBox);
  console.log('  relativeTransform:', child.relativeTransform);
  if (child.children) {
    for (const sub of child.children) {
      console.log(`    Sub: "${sub.name}" (id: ${sub.id})`);
      console.log('      box:', sub.absoluteBoundingBox);
      console.log('      style:', sub.style);
    }
  }
}
