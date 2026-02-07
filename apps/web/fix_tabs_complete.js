#!/usr/bin/env node
// Comprehensive script to fix the dota-2 blueprint file structure

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/blueprints/dota-2.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original file length:', content.length);

// Find the correct end of the tabs array (after the learning tab)
const tabsEndMarker = '      anchor: "learning",\n    },';
const tabsEndIndex = content.indexOf(tabsEndMarker);

if (tabsEndIndex !== -1) {
  // Extract everything up to and including the tabs end
  const beforeTabsEnd = content.substring(0, tabsEndIndex + tabsEndMarker.length + 1); // +1 for the newline
  
  // Find where the main sections array should start
  const sectionsStartMarker = '// --- 4. THE CONTENT SECTIONS (The "Meat") ---';
  const sectionsStartIndex = content.indexOf(sectionsStartMarker);
  
  if (sectionsStartIndex !== -1) {
    // Extract the sections part
    const sectionsPart = content.substring(sectionsStartIndex);
    
    // Create the fixed content with proper tabs closure
    const fixedContent = beforeTabsEnd + '\n  ],\n\n' + sectionsPart;
    
    // Write the fixed content back
    fs.writeFileSync(filePath, fixedContent);
    console.log('Fixed the tabs array structure!');
    
    // Verify the fix by checking if there are any more "sections:" properties in the tabs area
    const tabsArea = fixedContent.substring(0, fixedContent.indexOf(sectionsStartMarker));
    const hasMoreSections = /sections:/.test(tabsArea);
    if (!hasMoreSections) {
      console.log('Success: No more sections in tabs area');
    } else {
      console.log('Warning: Still has sections in tabs area');
    }
  } else {
    console.error('Could not find sections start marker');
  }
} else {
  console.error('Could not find tabs end marker');
}

console.log('New file length:', fs.readFileSync(filePath, 'utf8').length);