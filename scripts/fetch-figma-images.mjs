import https from 'https';
import fs from 'fs';

const token = process.env.FIGMA_TOKEN || '';
const fileKey = 'LEcuuUDYT5phibm1cFYW0L';

function get(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'X-Figma-Token': token
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching image fills mapping from Figma...');
  const imagesMeta = await get(`https://api.figma.com/v1/files/${fileKey}/images`);
  console.log('Image fills found in file:', Object.keys(imagesMeta.meta?.images || {}).length);
  fs.writeFileSync('scripts/figma-images-map.json', JSON.stringify(imagesMeta, null, 2));

  const images = imagesMeta.meta?.images || {};
  for (const [ref, url] of Object.entries(images)) {
    console.log(`Image ref ${ref} -> ${url}`);
    const dest = `public/images/figma_ref_${ref}.png`;
    try {
      await downloadFile(url, dest);
      console.log(`Downloaded to ${dest}`);
    } catch (e) {
      console.error(`Failed to download ${ref}:`, e.message);
    }
  }

  // Also check nodes 249:15588, 249:15590, 249:15594, 249:15596, etc.
  const nodesToExport = [
    '249:15588',
    '249:15590',
    '249:15594',
    '249:15596'
  ];
  console.log('Exporting specific testimonial nodes...');
  const exportRes = await get(`https://api.figma.com/v1/images/${fileKey}?ids=${nodesToExport.join(',')}&format=png&scale=2`);
  console.log('Export response:', exportRes);
  if (exportRes.images) {
    for (const [id, url] of Object.entries(exportRes.images)) {
      if (url) {
        const dest = `public/images/figma_node_${id.replace(':', '_')}.png`;
        await downloadFile(url, dest);
        console.log(`Exported node ${id} to ${dest}`);
      }
    }
  }
}

main().catch(console.error);
