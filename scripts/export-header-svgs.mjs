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
  const nodeIds = ['249:15525', '249:15529', '249:15536'];
  const data = await fetchFigma(`images/${FILE_KEY}?ids=${nodeIds.join(',')}&format=svg`);
  console.log('SVG URLs:', data.images);
  for (const [nodeId, url] of Object.entries(data.images)) {
    if (url) {
      const res = await fetch(url);
      const text = await res.text();
      const filename = `public/images/figma_${nodeId.replace(':', '_')}.svg`;
      fs.writeFileSync(filename, text);
      console.log(`Saved ${filename}`);
    }
  }
}

run().catch(console.error);
