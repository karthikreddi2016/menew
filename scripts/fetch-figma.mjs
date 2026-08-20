import fs from 'fs';
import path from 'path';

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
  console.log('Fetching Figma file nodes for Landing Page...');
  try {
    // 1. Get file information focusing on the Landing Page node
    const data = await fetchFigma(`files/${FILE_KEY}/nodes?ids=249:15308,249:15525`);
    fs.writeFileSync('scripts/figma-landing-node.json', JSON.stringify(data, null, 2));
    console.log('Saved figma-landing-node.json successfully!');
  } catch (err) {
    console.error('Error fetching nodes:', err);
    // If specific node fails, fetch document summary
    console.log('Attempting to fetch file summary...');
    const fileData = await fetchFigma(`files/${FILE_KEY}?depth=3`);
    fs.writeFileSync('scripts/figma-file-summary.json', JSON.stringify(fileData, null, 2));
    console.log('Saved figma-file-summary.json successfully!');
  }
}

run();
