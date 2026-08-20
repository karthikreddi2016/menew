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

const iconsFrame = findNode(landingPage, '754:35709');
console.log('=== 9 SERVICE ICONS IN FIGMA ===');
if (iconsFrame && iconsFrame.children) {
  for (let i = 0; i < iconsFrame.children.length; i++) {
    const icon = iconsFrame.children[i];
    let title = '';
    function getTitle(n) {
      if (n.characters) title = n.characters;
      if (n.children) n.children.forEach(getTitle);
    }
    getTitle(icon);
    console.log(`${i + 1}. Node id: ${icon.id}, title: "${title}", width: ${icon.absoluteBoundingBox?.width}`);
  }
}
