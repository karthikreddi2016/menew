import fs from 'fs';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = 'LEcuuUDYT5phibm1cFYW0L';

async function run() {
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}?depth=2`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  const data = await res.json();
  
  for (const page of data.document.children) {
    console.log(`\nPAGE: "${page.name}" (id: ${page.id})`);
    if (page.children) {
      for (const frame of page.children) {
        console.log(`  - Frame: "${frame.name}" (id: ${frame.id}) [${Math.round(frame.absoluteBoundingBox?.width || 0)}x${Math.round(frame.absoluteBoundingBox?.height || 0)}]`);
      }
    }
  }
}

run().catch(console.error);
