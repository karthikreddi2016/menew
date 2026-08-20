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
  console.log('Fetching full node 249:15307 (Landing Page | Desktop + 1)...');
  const data = await fetchFigma(`files/${FILE_KEY}/nodes?ids=249:15307&depth=6`);
  fs.writeFileSync('scripts/figma-landing-desktop.json', JSON.stringify(data, null, 2));

  const doc = data.nodes['249:15307'].document;
  console.log(`\n=== LANDING PAGE ROOT: "${doc.name}" ===`);
  for (const child of doc.children) {
    console.log(`- "${child.name}" (id: ${child.id}, type: ${child.type}) [${Math.round(child.absoluteBoundingBox?.width || 0)}x${Math.round(child.absoluteBoundingBox?.height || 0)}]`);
    if (child.children) {
      for (const sub of child.children) {
        console.log(`    └─ "${sub.name}" (id: ${sub.id}, type: ${sub.type}) [${Math.round(sub.absoluteBoundingBox?.width || 0)}x${Math.round(sub.absoluteBoundingBox?.height || 0)}]`);
      }
    }
  }
}

run().catch(console.error);
