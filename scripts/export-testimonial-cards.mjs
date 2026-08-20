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
  const nodeIds = ['249:15588', '249:15590', '249:15594', '249:15596'];
  const data = await fetchFigma(`images/${FILE_KEY}?ids=${nodeIds.join(',')}&format=png&scale=2`);
  console.log('API response:', data);
  if (data.images) {
    for (const [nodeId, url] of Object.entries(data.images)) {
      if (url) {
        const res = await fetch(url);
        const buffer = Buffer.from(await res.arrayBuffer());
        const filename = `public/images/testimonial_work_${nodeId.replace(':', '_')}.png`;
        fs.writeFileSync(filename, buffer);
        console.log(`Saved ${filename}`);
      }
    }
  }
}

run().catch(console.error);
