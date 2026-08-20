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

const serviceSection = findNode(landingPage, '249:15545');

function printBoxes(node, indent = '') {
  console.log(`${indent}- [${node.id}] "${node.name}" (${node.type})`);
  if (node.absoluteBoundingBox) {
    console.log(`${indent}  box: x=${node.absoluteBoundingBox.x}, y=${node.absoluteBoundingBox.y}, w=${node.absoluteBoundingBox.width}, h=${node.absoluteBoundingBox.height}`);
  }
  if (node.itemSpacing !== undefined) console.log(`${indent}  itemSpacing: ${node.itemSpacing}`);
  if (node.paddingTop !== undefined) console.log(`${indent}  padding: top=${node.paddingTop}, right=${node.paddingRight}, bottom=${node.paddingBottom}, left=${node.paddingLeft}`);
  if (node.children) {
    for (const c of node.children) {
      printBoxes(c, indent + '  ');
    }
  }
}

printBoxes(serviceSection);
