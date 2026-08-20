import fs from 'fs';

const token = process.env.FIGMA_TOKEN || '';
const fileKey = 'LEcuuUDYT5phibm1cFYW0L';

async function main() {
  const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: { 'X-Figma-Token': token }
  });
  const data = await res.json();

  const foundNodes = [];

  function search(node) {
    const name = node.name || '';
    if (
      name.toLowerCase().includes('order summary') ||
      name.toLowerCase().includes('pilot mode') ||
      name.toLowerCase().includes('checkout') ||
      name.toLowerCase().includes('almost there') ||
      name.toLowerCase().includes('payment success') ||
      name.toLowerCase().includes('user dashboard')
    ) {
      foundNodes.push({
        id: node.id,
        name: node.name,
        type: node.type,
        bbox: node.absoluteBoundingBox
      });
    }
    if (node.children) {
      for (const c of node.children) search(c);
    }
  }

  search(data.document);
  console.log('Found prototype frames:', JSON.stringify(foundNodes, null, 2));
  fs.writeFileSync('scripts/figma-payment-nodes.json', JSON.stringify(foundNodes, null, 2));
}

main().catch(console.error);
