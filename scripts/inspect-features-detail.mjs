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

const features = findNode(landingPage, '249:15563');
console.log('=== FEATURES SECTION ===');
function printDetailed(node, depth = 0) {
  const pad = '  '.repeat(depth);
  const textInfo = node.characters ? ` | text="${node.characters.replace(/\n/g, ' ')}"` : '';
  const fontInfo = node.style ? ` [${node.style.fontFamily} ${node.style.fontWeight} ${node.style.fontSize}px]` : '';
  const boxInfo = node.absoluteBoundingBox ? ` {${Math.round(node.absoluteBoundingBox.width)}x${Math.round(node.absoluteBoundingBox.height)}}` : '';
  console.log(`${pad}- "${node.name}" (${node.type}, id: ${node.id})${boxInfo}${textInfo}${fontInfo}`);

  if (node.children) {
    for (const c of node.children) {
      printDetailed(c, depth + 1);
    }
  }
}

printDetailed(features);
