import fs from 'fs';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = 'LEcuuUDYT5phibm1cFYW0L';

async function run() {
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}?depth=3`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  const data = await res.json();
  
  const devPage = data.document.children.find(p => p.name.includes('Dev ready'));
  if (devPage) {
    console.log(`\n=== PAGE: ${devPage.name} ===`);
    for (const frame of devPage.children) {
      console.log(`- Frame: "${frame.name}" (id: ${frame.id}) [${Math.round(frame.absoluteBoundingBox?.width || 0)}x${Math.round(frame.absoluteBoundingBox?.height || 0)}]`);
      if (frame.children) {
        for (const child of frame.children) {
          console.log(`    └─ "${child.name}" (id: ${child.id}) [${Math.round(child.absoluteBoundingBox?.width || 0)}x${Math.round(child.absoluteBoundingBox?.height || 0)}]`);
        }
      }
    }
  }
}

run().catch(console.error);
