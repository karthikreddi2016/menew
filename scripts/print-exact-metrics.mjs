import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/figma-styles-dump.json', 'utf8'));

console.log('=== HERO SECTION CONTAINER STYLES ===');
function printNode(node, depth = 0) {
  const pad = ' '.repeat(depth * 2);
  console.log(`${pad}Node: "${node.name}" (${node.type})`);
  if (node.styles.fontFamily) {
    console.log(`${pad}  Font: ${node.styles.fontFamily} ${node.styles.fontWeight}, size: ${node.styles.fontSize}px, lineHeight: ${node.styles.lineHeightPx}px, letterSpacing: ${node.styles.letterSpacing}`);
  }
  if (node.styles.fills && node.styles.fills.length > 0) {
    console.log(`${pad}  Fills:`, JSON.stringify(node.styles.fills));
  }
  if (node.box) {
    console.log(`${pad}  Box: w=${node.box.width}, h=${node.box.height}`);
  }
  if (node.styles.paddingTop !== undefined) {
    console.log(`${pad}  Padding: top=${node.styles.paddingTop}, right=${node.styles.paddingRight}, bottom=${node.styles.paddingBottom}, left=${node.styles.paddingLeft}, gap=${node.styles.itemSpacing}`);
  }
  if (node.children) {
    for (const child of node.children) {
      printNode(child, depth + 1);
    }
  }
}

for (const [id, node] of Object.entries(data)) {
  console.log(`\n*** ROOT ID: ${id} ***`);
  printNode(node);
}
