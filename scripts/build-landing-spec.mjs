import fs from 'fs';

const fullData = JSON.parse(fs.readFileSync('scripts/figma-full-landing.json', 'utf8'));
const landingPage = fullData.nodes['249:15308'].document;

console.log('=== LANDING PAGE TOP LEVEL CHILDREN ===');
for (const child of landingPage.children) {
  console.log(`- "${child.name}" (${child.type}, id: ${child.id}) [${child.absoluteBoundingBox?.width}x${child.absoluteBoundingBox?.height}]`);
  if (child.children) {
    for (const sub of child.children) {
      console.log(`   └─ "${sub.name}" (${sub.type}, id: ${sub.id}) [${sub.absoluteBoundingBox?.width}x${sub.absoluteBoundingBox?.height}]`);
      if (sub.children && sub.name.includes('Container')) {
        for (const sub2 of sub.children) {
          console.log(`       └─ "${sub2.name}" (${sub2.type}, id: ${sub2.id}) [${sub2.absoluteBoundingBox?.width}x${sub2.absoluteBoundingBox?.height}]`);
        }
      }
    }
  }
}
