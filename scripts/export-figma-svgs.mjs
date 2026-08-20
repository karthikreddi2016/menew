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
  console.log('1. Exporting SVGs from Figma API...');
  
  // List of key node IDs to export as SVG
  const svgNodeIds = [
    '249:15536', // Vector 4 (pink underline)
    '249:15529', // Header Content Vector (I-beam cursor)
    '249:15527', // Header Content (Creative Ideas box)
    '249:15525', // Entire Header Text frame
  ];

  const svgRes = await fetchFigma(`images/${FILE_KEY}?ids=${svgNodeIds.join(',')}&format=svg`);
  console.log('SVG URLs:', svgRes.images);

  // Download each SVG and save to public/images or inspect
  for (const [nodeId, url] of Object.entries(svgRes.images)) {
    if (url) {
      const response = await fetch(url);
      const svgText = await response.text();
      const filename = `scripts/svg_${nodeId.replace(':', '_')}.svg`;
      fs.writeFileSync(filename, svgText);
      console.log(`Saved ${filename}`);
    }
  }

  // 2. Extract full CSS / layout details from figma-landing-node.json
  const landingNodeData = JSON.parse(fs.readFileSync('scripts/figma-landing-node.json', 'utf8'));
  
  function dumpStyles(node) {
    const out = {
      id: node.id,
      name: node.name,
      type: node.type,
      box: node.absoluteBoundingBox,
      styles: {
        fontFamily: node.style?.fontFamily,
        fontSize: node.style?.fontSize,
        fontWeight: node.style?.fontWeight,
        lineHeightPx: node.style?.lineHeightPx,
        letterSpacing: node.style?.letterSpacing,
        fills: node.fills,
        strokes: node.strokes,
        effects: node.effects,
        paddingTop: node.paddingTop,
        paddingRight: node.paddingRight,
        paddingBottom: node.paddingBottom,
        paddingLeft: node.paddingLeft,
        itemSpacing: node.itemSpacing,
        layoutMode: node.layoutMode,
        primaryAxisAlignItems: node.primaryAxisAlignItems,
        counterAxisAlignItems: node.counterAxisAlignItems,
        cornerRadius: node.cornerRadius,
        rectangleCornerRadii: node.rectangleCornerRadii,
      },
      children: node.children ? node.children.map(dumpStyles) : undefined,
    };
    return out;
  }

  const stylesDump = {};
  for (const [id, node] of Object.entries(landingNodeData.nodes)) {
    stylesDump[id] = dumpStyles(node.document);
  }
  fs.writeFileSync('scripts/figma-styles-dump.json', JSON.stringify(stylesDump, null, 2));
  console.log('Saved figma-styles-dump.json successfully!');
}

run().catch(console.error);
