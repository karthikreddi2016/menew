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
  console.log('Exporting all Figma landing page visual assets...');
  
  // Specific nodes for:
  // 1. Process 3 cards (s1, s2, s3)
  // 2. Testimonials frame
  // 3. CTA Image container
  // 4. Footer
  const nodeIds = [
    '249:15582', // Full Process section
    '250:9580',  // Process card 1 image (Orange)
    '250:9592',  // Process card 2 image (Purple)
    '250:9606',  // Process card 3 image (Green)
    '249:15583', // Testimonials section
    '249:15604', // CTA image container
    '249:15605', // 3D art on CTA
    '249:15640', // Footer
  ];

  // Try exporting as 2x PNG
  const pngRes = await fetchFigma(`images/${FILE_KEY}?ids=${nodeIds.join(',')}&format=png&scale=2`);
  console.log('PNG images:', pngRes.images);
  for (const [nodeId, url] of Object.entries(pngRes.images)) {
    if (url) {
      const res = await fetch(url);
      const buffer = Buffer.from(await res.arrayBuffer());
      const filename = `public/images/figma_${nodeId.replace(':', '_')}.png`;
      fs.writeFileSync(filename, buffer);
      console.log(`Saved ${filename}`);
    }
  }

  // Also try exporting the individual step frames
  const stepsRes = await fetchFigma(`images/${FILE_KEY}?ids=250:9580,250:9592,250:9606,249:15604&format=svg`);
  for (const [nodeId, url] of Object.entries(stepsRes.images)) {
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
