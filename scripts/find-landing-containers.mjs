import fs from 'fs';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = 'LEcuuUDYT5phibm1cFYW0L';

async function fetchFigma(endpoint) {
  const res = await fetch(`https://api.figma.com/v1/${endpoint}`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  return res.json();
}

async function run() {
  console.log('Searching for Desktop + 1 Landing Page...');
  const fileData = await fetchFigma(`files/${FILE_KEY}?depth=4`);
  
  function search(node) {
    if (node.name && (node.name.includes('Desktop + 1') || node.name === 'Landing Page' || node.name === 'Why Choose Us Section Container' || node.name === 'Features Section Container')) {
      console.log(`Found node: "${node.name}" (id: ${node.id}, type: ${node.type})`);
    }
    if (node.children) {
      node.children.forEach(search);
    }
  }

  search(fileData.document);
}

run().catch(console.error);
