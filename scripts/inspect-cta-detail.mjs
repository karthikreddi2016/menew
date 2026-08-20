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

const cta = findNode(landingPage, '249:15597');
console.log('=== CTA SECTION (249:15597) ===');
function printAll(node, depth = 0) {
  if (!node) return;
  const pad = '  '.repeat(depth);
  const textInfo = node.characters ? ` | text="${node.characters.replace(/\n/g, ' ')}"` : '';
  const fontInfo = node.style ? ` [${node.style.fontFamily} ${node.style.fontWeight} ${node.style.fontSize}px]` : '';
  console.log(`${pad}- "${node.name}" (${node.type}, id: ${node.id})${textInfo}${fontInfo}`);

  if (node.children) {
    for (const c of node.children) {
      printAll(c, depth + 1);
    }
  }
}

printAll(cta);
