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
  console.log('Fetching image fill URLs from Figma file...');
  const res = await fetchFigma(`files/${FILE_KEY}/images`);
  const imageMap = res.meta?.images || {};
  const imageRef = '51d6330885635cb0614c164b9556a2b437199e13';
  const url = imageMap[imageRef];
  console.log('Image URL for 3D art:', url);
  if (url) {
    const imgRes = await fetch(url);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync('public/images/figma_testimonial_sample_art.png', buffer);
    console.log('Saved public/images/figma_testimonial_sample_art.png');
  }
}

run().catch(console.error);
