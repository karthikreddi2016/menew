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
  console.log('Exporting all assets for all Landing Page sections...');
  
  // Let's get node IDs for Why Choose Us card icons & Features
  const nodeIds = [
    '249:15578', // Card 1
    '249:15579', // Card 2
    '249:15580', // Card 3
    '249:15581', // Card 4
    '249:15564', // Features section
    '249:15582', // How it works
    '249:15583', // Testimonials
    '249:15597', // CTA section
    '249:15629', // FAQ section
  ];

  const svgRes = await fetchFigma(`images/${FILE_KEY}?ids=${nodeIds.join(',')}&format=svg`);
  console.log('Exported SVGs:', Object.keys(svgRes.images));
  for (const [nodeId, url] of Object.entries(svgRes.images)) {
    if (url) {
      const res = await fetch(url);
      const text = await res.text();
      const filename = `public/images/figma_${nodeId.replace(':', '_')}.svg`;
      fs.writeFileSync(filename, text);
      console.log(`Saved ${filename}`);
    }
  }

  // Also export high-res PNGs for cards and features
  const pngRes = await fetchFigma(`images/${FILE_KEY}?ids=249:15564,249:15582,249:15597&format=png&scale=2`);
  for (const [nodeId, url] of Object.entries(pngRes.images)) {
    if (url) {
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      const filename = `public/images/figma_${nodeId.replace(':', '_')}.png`;
      fs.writeFileSync(filename, buffer);
      console.log(`Saved ${filename}`);
    }
  }
}

run().catch(console.error);
