import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/figma-landing-desktop.json', 'utf8'));
const landingPage = data.nodes['249:15307'].document;

function printDetailed(node, depth = 0) {
  const pad = '  '.repeat(depth);
  const textInfo = node.characters ? ` | text="${node.characters.replace(/\n/g, ' ')}"` : '';
  const fontInfo = node.style ? ` [${node.style.fontFamily} ${node.style.fontWeight} ${node.style.fontSize}px]` : '';
  const fillInfo = node.fills && node.fills.length ? ` (fill: ${JSON.stringify(node.fills[0]?.color || node.fills[0]?.type)})` : '';
  const boxInfo = node.absoluteBoundingBox ? ` {${Math.round(node.absoluteBoundingBox.width)}x${Math.round(node.absoluteBoundingBox.height)}}` : '';
  console.log(`${pad}- "${node.name}" (${node.type}, id: ${node.id})${boxInfo}${textInfo}${fontInfo}`);

  if (node.children) {
    for (const c of node.children) {
      printDetailed(c, depth + 1);
    }
  }
}

for (const child of landingPage.children) {
  console.log(`\n================== ${child.name} (${child.id}) ==================`);
  printDetailed(child);
}
