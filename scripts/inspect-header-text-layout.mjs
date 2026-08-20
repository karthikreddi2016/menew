import fs from 'fs';

const fullData = JSON.parse(fs.readFileSync('scripts/figma-full-landing.json', 'utf8'));
const landingPage = fullData.nodes['249:15308'].document;

function findNode(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const c of node.children) {
      const f = findNode(c, id);
      if (f) return f;
    }
  }
  return null;
}

const headerText = findNode(landingPage, '249:15525');
console.log('=== HEADER TEXT (249:15525) ===');
console.log('box:', headerText.absoluteBoundingBox);
console.log('layoutMode:', headerText.layoutMode);
console.log('itemSpacing:', headerText.itemSpacing);
console.log('padding:', headerText.paddingTop, headerText.paddingRight, headerText.paddingBottom, headerText.paddingLeft);
console.log('primaryAxisAlignItems:', headerText.primaryAxisAlignItems);
console.log('counterAxisAlignItems:', headerText.counterAxisAlignItems);
console.log('layoutWrap:', headerText.layoutWrap);

for (const child of headerText.children) {
  console.log(`\n- "${child.name}" (${child.type}, id: ${child.id})`);
  console.log('  box:', child.absoluteBoundingBox);
  if (child.characters) console.log('  text:', child.characters);
  if (child.style) console.log('  style:', child.style.fontSize, child.style.lineHeightPx, child.style.fontFamily, child.style.fontWeight);
  if (child.children) {
    for (const sub of child.children) {
      console.log(`    └─ "${sub.name}" (${sub.type}, id: ${sub.id})`);
      console.log('       box:', sub.absoluteBoundingBox);
      if (sub.characters) console.log('       text:', sub.characters);
      if (sub.style) console.log('       style:', sub.style.fontSize, sub.style.lineHeightPx);
    }
  }
}
