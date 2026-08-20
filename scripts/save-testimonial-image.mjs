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
  console.log('Fetching all image fills mapping from Figma...');
  const imagesMeta = await get(`https://api.figma.com/v1/files/${fileKey}/images`);
  const images = imagesMeta.meta?.images || {};
  
  // Download ref 51d6330885635cb0614c164b9556a2b437199e13 explicitly
  const targetRef = '51d6330885635cb0614c164b9556a2b437199e13';
  if (images[targetRef]) {
    console.log(`Downloading target image ref ${targetRef}...`);
    await downloadFile(images[targetRef], 'public/images/figma_testimonial_sample_art.png');
    await downloadFile(images[targetRef], 'public/images/figma_ref_51d6330885635cb0614c164b9556a2b437199e13.png');
    console.log('Downloaded target image!');
  }

  // Also let's search the whole Figma file for all nodes with names like "Testimonial", "Image", "Card", etc.
  const fileData = await get(`https://api.figma.com/v1/files/${fileKey}`);
  console.log('Figma file fetched, searching nodes...');
  
  const matches = [];
  function search(node) {
    if (node.fills && node.fills.some(f => f.type === 'IMAGE')) {
      matches.push({
        id: node.id,
        name: node.name,
        fills: node.fills.filter(f => f.type === 'IMAGE')
      });
    }
    if (node.children) {
      for (const c of node.children) search(c);
    }
  }
  search(fileData.document);
  console.log('Total image fill nodes in file:', matches.length);
  fs.writeFileSync('scripts/all-image-nodes.json', JSON.stringify(matches, null, 2));

  // Also copy media_1787039301378.png to public/images/figma_gold_architecture.png
  const userUploadedMedia = 'C:/Users/vkart/.gemini/antigravity-ide/brain/65e96c96-3f70-454c-a5db-2f5394b296be/.user_uploaded/media_1787039301378.png';
  if (fs.existsSync(userUploadedMedia)) {
    fs.copyFileSync(userUploadedMedia, 'public/images/figma_gold_architecture.png');
    fs.copyFileSync(userUploadedMedia, 'public/images/figma_testimonial_sample_art.png');
    console.log('Copied user uploaded gold architecture image to public/images/figma_gold_architecture.png and public/images/figma_testimonial_sample_art.png');
  }
}

main().catch(console.error);
