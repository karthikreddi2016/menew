import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/figma-landing-desktop.json', 'utf8'));
const landingPage = data.nodes['249:15307'].document;

function findNode(node, nameOrId) {
  if (node.id === nameOrId || (node.name && node.name.toLowerCase().includes(nameOrId.toLowerCase()))) {
    return node;
  }
  if (node.children) {
    for (const c of node.children) {
      const f = findNode(c, nameOrId);
      if (f) return f;
    }
  }
  return null;
}

function findImageFills(node, results = []) {
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === 'IMAGE' && fill.imageRef) {
        results.push({
          id: node.id,
          name: node.name,
          imageRef: fill.imageRef,
          width: node.absoluteBoundingBox?.width,
          height: node.absoluteBoundingBox?.height
        });
      }
    }
  }
  if (node.children) {
    for (const c of node.children) {
      findImageFills(c, results);
    }
  }
  return results;
}

const frequentUsers = findNode(landingPage, 'Frequent Users') || findNode(landingPage, '249:15598');
console.log('Frequent Users node:', frequentUsers ? frequentUsers.id : 'not found');

if (frequentUsers) {
  const images = findImageFills(frequentUsers);
  console.log('Images in Frequent Users:', JSON.stringify(images, null, 2));
}

// Let's also check all image fills across the entire landing page
const allImages = findImageFills(landingPage);
console.log('All image fills count in Landing page:', allImages.length);
console.log('All image fills:', JSON.stringify(allImages, null, 2));
