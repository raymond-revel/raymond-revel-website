const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const categories = {};

// Read all directories
const dirs = fs.readdirSync(imagesDir).filter(d => {
  const fullPath = path.join(imagesDir, d);
  return fs.statSync(fullPath).isDirectory() && d !== 'blog';
});

dirs.forEach(dir => {
  const dirPath = path.join(imagesDir, dir);
  const files = fs.readdirSync(dirPath)
    .filter(f => f.toLowerCase().endsWith('.jpg'))
    .sort();
  categories[dir] = files;
});

const categoryMap = {
  'blackwhite': 'Black & White',
  'blue_elv': 'Blue Elevator',
  'bug': 'Bug Collection',
  'clear_sky': 'Clear Sky',
  'Confident_Man_Chairs': 'Confident Man Chairs',
  'direct_flash': 'Direct Flash',
  'Elevator_Music': 'Elevator Music',
  'field': 'Field',
  'ghosts_on_the_beach': 'Ghosts On The Beach',
  'glasses-filmstrip_coloring': 'Glasses Filmstrip',
  'highflash': 'High Flash',
  'isuredo': 'I Sure Do',
  'Organ_Grainy': 'Organ Grainy',
  'primary': 'Primary',
};

let code = `export interface Photo {
  src: string;
  alt: string;
  category: string;
}

// Category mapping: folder names to display names
const categoryMap: Record<string, string> = {
`;

Object.entries(categoryMap).forEach(([key, value]) => {
  code += `  '${key}': '${value}',\n`;
});

code += `};

function generatePhotosForCategory(folder: string, files: string[]): Photo[] {
  const categoryName = categoryMap[folder] || folder;
  return files.map(file => ({
    src: \`/images/\${folder}/\${file}\`,
    alt: \`\${file.replace(/\\.jpg$/i, '').replace(/-/g, ' ')} - \${categoryName}\`,
    category: categoryName,
  }));
}

`;

// Generate photo arrays for each category
Object.entries(categories).forEach(([folder, files]) => {
  const varName = folder.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
  const displayName = categoryMap[folder] || folder;
  code += `// ${displayName} photos\n`;
  code += `const ${varName}Photos = generatePhotosForCategory('${folder}', [\n`;
  files.forEach(file => {
    code += `  '${file}',\n`;
  });
  code += `]);\n\n`;
});

// Combine all photos
code += `// Combine all photos\nexport const allPhotos: Photo[] = [\n`;
const folderKeys = Object.keys(categories);
folderKeys.forEach((folder, idx) => {
  const varName = folder.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
  code += `  ...${varName}Photos${idx < folderKeys.length - 1 ? ',' : ''}\n`;
});
code += `];\n\n`;

// Get all unique categories
code += `// Get all unique categories\nexport const allCategories: string[] = Object.values(categoryMap);\n\n`;

// Featured photos
code += `// Get featured photos for home page (selecting diverse, high-impact photos)\nexport const featuredPhotos: Photo[] = [\n`;
code += `  // Primary collection (professional/promotional)\n`;
code += `  ...primaryPhotos.slice(0, 2),\n`;
code += `  // Black & White (artistic)\n`;
code += `  ...blackwhitePhotos.slice(2, 4),\n`;
code += `  // Ghosts On The Beach (atmospheric)\n`;
const ghostsVar = 'ghosts_on_the_beach'.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
code += `  ...${ghostsVar}Photos.slice(0, 2),\n`;
code += `  // Field or Clear Sky (outdoor/natural)\n`;
code += `  ...fieldPhotos.slice(0, 1),\n`;
const clearSkyVar = 'clear_sky'.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
code += `  ...${clearSkyVar}Photos.slice(0, 1),\n`;
code += `  // Other collections for variety\n`;
const elevatorVar = 'Elevator_Music'.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '_');
code += `  ...${elevatorVar}Photos.slice(5, 6),\n`;
code += `  ...bugPhotos.slice(10, 11),\n`;
code += `].slice(0, 9); // Limit to 9 photos\n\n`;

// Get photos by category function
code += `// Get photos by category\nexport function getPhotosByCategory(category: string): Photo[] {
  return allPhotos.filter(photo => photo.category === category);
}\n`;

fs.writeFileSync(path.join(__dirname, '../lib/photos.ts'), code);
console.log('Generated photos.ts with', Object.values(categories).flat().length, 'photos');

