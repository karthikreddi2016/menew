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
  console.log('Exporting illustrations and icons from Figma...');
  
  // 1. Export left & right illustrations as high-res PNG & SVG
  const nodeIds = [
    '249:15310', // Left illustration container
    '249:15426', // Right illustration container
    '249:15536', // Vector 4 (pink underline)
    '249:15525', // Header Text
    '754:35709', // 9 icons frame
  ];

  const pngRes = await fetchFigma(`images/${FILE_KEY}?ids=249:15310,249:15426&format=png&scale=2`);
  console.log('PNG URLs:', pngRes.images);
  for (const [nodeId, url] of Object.entries(pngRes.images)) {
    if (url) {
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      const filename = nodeId === '249:15310' ? 'public/images/figma_hero_left.png' : 'public/images/figma_hero_right.png';
      fs.writeFileSync(filename, buffer);
      console.log(`Saved ${filename}`);
    }
  }

  const svgRes = await fetchFigma(`images/${FILE_KEY}?ids=${nodeIds.join(',')}&format=svg`);
  console.log('SVG URLs:', svgRes.images);
  for (const [nodeId, url] of Object.entries(svgRes.images)) {
    if (url) {
      const res = await fetch(url);
      const svgText = await responseText(res);
      const filename = `public/images/figma_${nodeId.replace(':', '_')}.svg`;
      fs.writeFileSync(filename, svgText);
      console.log(`Saved ${filename}`);
    }
  }
}

async function responseText(res) {
  return await res.text();
}

run().catch(console.error);
