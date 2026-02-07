#!/usr/bin/env node
// Precise script to fix the dota-2 blueprint file structure

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/blueprints/dota-2.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original file length:', content.length);

// Find the exact location where tabs should end
const tabsEndMarker = '      anchor: "learning",\n    },';
const tabsEndIndex = content.indexOf(tabsEndMarker);

if (tabsEndIndex !== -1) {
  // Find the next occurrence of a new tab after the learning tab
  const contentAfterTabsEnd = content.substring(tabsEndIndex + tabsEndMarker.length);
  
  // Look for the next tab definition that starts with "{\n      id:"
  const nextTabRegex = /\{\s*\n\s*"id":/;
  const nextTabMatch = nextTabRegex.exec(contentAfterTabsEnd);
  
  if (nextTabMatch) {
    // Calculate the absolute index
    const absoluteNextTabIndex = tabsEndIndex + tabsEndMarker.length + nextTabMatch.index;
    
    // Extract everything up to the next tab
    const beforeNextTab = content.substring(0, absoluteNextTabIndex);
    
    // Find the sections start marker
    const sectionsStartMarker = '// --- 4. THE CONTENT SECTIONS (The "Meat") ---';
    const sectionsStartIndex = content.indexOf(sectionsStartMarker);
    
    if (sectionsStartIndex !== -1) {
      // Extract the sections part
      const sectionsPart = content.substring(sectionsStartIndex);
      
      // Create the fixed content
      const fixedContent = beforeNextTab + '\n  ],\n\n' + sectionsPart;
      
      // Write the fixed content back
      fs.writeFileSync(filePath, fixedContent);
      console.log('Fixed the tabs array structure by removing orphaned content!');
      
      // Count how many tabs we have now
      const tabCount = (fixedContent.match(/"id":\s*"[^"]+"/g) || []).filter(match => {
        // Find where tabs array starts and ends
        const tabsStart = fixedContent.indexOf('tabs:');
        const sectionsStart = fixedContent.indexOf(sectionsStartMarker);
        const matchIndex = fixedContent.indexOf(match);
        return matchIndex > tabsStart && matchIndex < sectionsStart;
      }).length;
      
      console.log(`Fixed file has ${tabCount} tabs in the tabs array`);
    } else {
      console.error('Could not find sections start marker');
    }
  } else {
    console.log('No additional tabs found after learning tab - structure might already be correct');
  }
} else {
  console.error('Could not find tabs end marker');
}

console.log('New file length:', fs.readFileSync(filePath, 'utf8').length);