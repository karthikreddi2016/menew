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
  console.log('Fetching Dev ready (Webapp) frames...');
  // Let's get the file's document and look at the "Dev ready (Webapp)" page
  const res = await fetchFigma(`files/${FILE_KEY}?depth=3`);
  const devPage = res.document.children.find(p => p.name.includes('Dev ready'));
  
  for (const child of devPage.children) {
    if (child.name.includes('Landing Page') || child.name.includes('Desktop + 1') || child.name.includes('Wireframe - 1')) {
      console.log(`\nFrame: "${child.name}" (id: ${child.id})`);
      if (child.children) {
        for (const sub of child.children) {
          console.log(`  - Sub: "${sub.name}" (id: ${sub.id}, type: ${sub.type}) [${Math.round(sub.absoluteBoundingBox?.width || 0)}x${Math.round(sub.absoluteBoundingBox?.height || 0)}]`);
        }
      }
    }
  }
}

run().catch(console.error);
