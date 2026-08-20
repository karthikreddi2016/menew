import fs from 'fs';

const fullData = JSON.parse(fs.readFileSync('scripts/figma-full-landing.json', 'utf8'));
const landingPage = fullData.nodes['249:15308'].document;

console.log('=== ALL SECTIONS IN LANDING PAGE ===');
function printAll(node, depth = 0) {
  const pad = '  '.repeat(depth);
  console.log(`${pad}- "${node.name}" (${node.type}, id: ${node.id}) ${node.characters ? `text="${node.characters}"` : ''} [${Math.round(node.absoluteBoundingBox?.width || 0)}x${Math.round(node.absoluteBoundingBox?.height || 0)}]`);
  if (node.children) {
    for (const c of node.children) {
      printAll(c, depth + 1);
    }
  }
}

printAll(landingPage);
