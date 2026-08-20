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

const node = findNode(landingPage, '249:15583');
console.log(JSON.stringify(node, null, 2));
