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
const headerContainer = findNode(landingPage, '249:15524');
console.log('=== HEADER TEXT NODE (249:15525) ===');
console.log(JSON.stringify(headerText, null, 2));

console.log('=== HEADER TEXT CONTAINER (249:15524) ===');
console.log(JSON.stringify(headerContainer, null, 2));
