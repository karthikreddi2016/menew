import fs from 'fs';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = 'LEcuuUDYT5phibm1cFYW0L';

async function fetchFigma(endpoint) {
  const res = await fetch(`https://api.figma.com/v1/${endpoint}`, {
    headers: { 'X-Figma-Token': FIGMA_TOKEN },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function run() {
  console.log('Fetching all frames on Landing Page (Desktop + 1 / Wireframe - 1 / 249:15308 / etc)...');
  
  // Let's search for the main landing page frame in the file
  const fileData = await fetchFigma(`files/${FILE_KEY}`);
  const devPage = fileData.document.children.find(p => p.name.includes('Dev ready'));
  
  console.log(`Searching frames in "${devPage.name}"...`);
  const landingFrame = devPage.children.find(f => f.name.toLowerCase().includes('landing') || f.name.includes('Desktop + 1') || f.name.includes('Wireframe - 1'));
  
  console.log('Found frame:', landingFrame?.name, landingFrame?.id);
  
  // Fetch full details of landing frame
  const landingId = landingFrame ? landingFrame.id : '249:15308';
  const fullLanding = await fetchFigma(`files/${FILE_KEY}/nodes?ids=${landingId}&depth=6`);
  fs.writeFileSync('scripts/figma-complete-landing-page.json', JSON.stringify(fullLanding, null, 2));
  console.log('Saved scripts/figma-complete-landing-page.json');
}

run().catch(console.error);
