#!/usr/bin/env node
// Script to fix the malformed dota-2 blueprint file

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/blueprints/dota-2.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find where the tabs array should end (after the learning tab)
const tabsEndMarker = '      anchor: "learning",\n    },';
const tabsEndIndex = content.indexOf(tabsEndMarker);

if (tabsEndIndex !== -1) {
  // Extract everything up to and including the tabs end
  const beforeTabsEnd = content.substring(0, tabsEndIndex + tabsEndMarker.length);
  
  // Find where the sections array starts
  const sectionsStartMarker = '// --- 4. THE CONTENT SECTIONS (The "Meat") ---';
  const sectionsStartIndex = content.indexOf(sectionsStartMarker);
  
  if (sectionsStartIndex !== -1) {
    // Extract the sections part
    const sectionsPart = content.substring(sectionsStartIndex);
    
    // Create the fixed content
    const fixedContent = beforeTabsEnd + '\n  ],\n\n' + sectionsPart;
    
    // Write the fixed content back
    fs.writeFileSync(filePath, fixedContent);
    console.log('Fixed the tabs array structure!');
  } else {
    console.error('Could not find sections start marker');
  }
} else {
  console.error('Could not find tabs end marker');
}