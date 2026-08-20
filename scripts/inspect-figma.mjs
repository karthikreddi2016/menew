import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/figma-landing-node.json', 'utf8'));

function traverse(node, depth = 0) {
  const indent = '  '.repeat(depth);
  console.log(`${indent}- [${node.type}] "${node.name}" (id: ${node.id}) ${node.characters ? `text: "${node.characters}"` : ''}`);
  if (node.children) {
    for (const child of node.children) {
      traverse(child, depth + 1);
    }
  }
}

for (const [id, nodeData] of Object.entries(data.nodes)) {
  console.log(`\n================ NODE: ${id} ================\n`);
  traverse(nodeData.document);
}
