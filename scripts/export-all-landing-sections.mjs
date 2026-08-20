import fs from 'fs';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = 'LEcuuUDYT5phibm1cFYW0L';

async function fetchFigma(endpoint) {
  const res = await fetch(`https://api.figma.com/v1/${endpoint}`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function run() {
  console.log('Fetching all nodes inside Landing Page (249:15308)...');
  const data = await fetchFigma(`files/${FILE_KEY}/nodes?ids=249:15308&depth=4`);
  fs.writeFileSync('scripts/figma-full-landing.json', JSON.stringify(data, null, 2));

  // Let's find all images / vector nodes to export
  const landingDoc = data.nodes['249:15308'].document;
  
  const imageIds = [];
  function collectImageIds(node) {
    if (node.type === 'VECTOR' || node.type === 'GROUP' || node.type === 'FRAME' || node.type === 'INSTANCE') {
      if (node.name.toLowerCase().includes('character') || 
          node.name.toLowerCase().includes('flying') || 
          node.name.toLowerCase().includes('illustrat') ||
          node.name.toLowerCase().includes('vector') ||
          node.name.toLowerCase().includes('icon')) {
        imageIds.push(node.id);
      }
    }
    if (node.children) {
      for (const child of node.children) {
        collectImageIds(child);
      }
    }
  }

  collectImageIds(landingDoc);
  console.log(`Found ${imageIds.length} candidate visual nodes for export.`);
}

run().catch(console.error);
