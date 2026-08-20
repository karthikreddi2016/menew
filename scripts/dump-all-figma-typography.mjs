import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/figma-landing-desktop.json', 'utf8'));
const landingPage = data.nodes['249:15307'].document;

function printAllTexts(node, path = '') {
  const currentPath = path ? `${path} > ${node.name || node.id}` : (node.name || node.id);
  if (node.type === 'TEXT') {
    const s = node.style || {};
    const fills = node.fills || [];
    const fill = fills[0] || {};
    let color = '';
    if (fill.color) {
      const r = Math.round(fill.color.r * 255);
      const g = Math.round(fill.color.g * 255);
      const b = Math.round(fill.color.b * 255);
      const a = fill.opacity !== undefined ? fill.opacity : (fill.color.a !== undefined ? fill.color.a : 1);
      color = `rgba(${r},${g},${b},${a})`;
    }
    console.log(`[TEXT] "${node.characters}"`);
    console.log(`  Path: ${currentPath}`);
    console.log(`  Font: ${s.fontFamily} ${s.fontWeight} ${s.fontStyle || ''} ${s.fontSize}px / ${s.lineHeightPx || s.lineHeightPercentFontSize || ''}px`);
    console.log(`  Color: ${color}, align: ${s.textAlignHorizontal}`);
    console.log(`---`);
  }
  if (node.children) {
    for (const c of node.children) {
      printAllTexts(c, currentPath);
    }
  }
}

printAllTexts(landingPage);
