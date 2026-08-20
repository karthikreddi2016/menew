import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/figma-landing-desktop.json', 'utf8'));
const landingPage = data.nodes['249:15307'].document;

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

const headerText = findNode(landingPage, '249:15525');
console.log('=== ALL CHILDREN OF HEADER TEXT 249:15525 ===');
for (const child of headerText.children) {
  console.log(`\nChild "${child.name}" (${child.type}, id: ${child.id})`);
  console.log(`- characters: ${child.characters || ''}`);
  console.log(`- style:`, child.style);
  console.log(`- fills:`, child.fills);
  console.log(`- box:`, child.absoluteBoundingBox);
  if (child.children) {
    for (const sub of child.children) {
      console.log(`    - sub "${sub.name}" (${sub.type}, id: ${sub.id}): ${sub.characters || ''}`);
      console.log(`      style:`, sub.style);
      console.log(`      fills:`, sub.fills);
      console.log(`      box:`, sub.absoluteBoundingBox);
    }
  }
}
