#!/usr/bin/env node
// Script to completely reconstruct the dota-2 blueprint file

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/blueprints/dota-2.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Split the content into parts
const tabsStart = content.indexOf('"tabs": [');
const tabsEnd = content.indexOf('// --- 4. THE CONTENT SECTIONS (The "Meat") ---');

if (tabsStart !== -1 && tabsEnd !== -1) {
  // Extract the beginning part (before tabs)
  const beginning = content.substring(0, tabsStart);
  
  // Extract the tabs part (until the sections comment)
  const tabsRaw = content.substring(tabsStart, tabsEnd);
  
  // Extract the sections part (from the comment onwards)
  const sectionsRaw = content.substring(tabsEnd);
  
  // Process the tabs to ensure they only have navigation properties
  let processedTabs = tabsRaw;
  
  // Define the correct tabs structure
  const correctTabs = `"tabs": [
    {
      id: "competitive",
      label: "Competitive",
      icon: "Swords",
      anchor: "competitive",
    },
    {
      id: "utilities",
      label: "Utilities",
      icon: "Wrench",
      anchor: "utilities",
    },
    {
      id: "progression",
      label: "Progression & Plus",
      icon: "Crown",
      anchor: "progression",
    },
    {
      id: "grinding",
      label: "Grinding & Leveling",
      icon: "Gamepad2",
      anchor: "grinding",
    },
    {
      id: "marketplace",
      label: "Accounts & Items",
      icon: "ShoppingBag",
      anchor: "marketplace",
    },
    {
      id: "recovery",
      label: "Recovery & Coaching",
      icon: "Shield",
      anchor: "recovery",
    },
  ],`;
  
  // Replace the tabs part with the correct structure
  const fixedContent = beginning + correctTabs + '\n\n' + sectionsRaw;
  
  // Write the fixed content back
  fs.writeFileSync(filePath, fixedContent);
  console.log('Reconstructed the dota-2 blueprint file with correct structure!');
} else {
  console.error('Could not find proper tabs start/end markers');
}