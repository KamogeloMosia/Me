const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying static build...');

const outDir = path.join(process.cwd(), 'out');

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error('❌ Out directory not found. Run "npm run build:static" first.');
  process.exit(1);
}

// Check for CSS files
const cssFiles = [];
const findCssFiles = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findCssFiles(filePath);
    } else if (file.endsWith('.css')) {
      cssFiles.push(filePath.replace(outDir, ''));
    }
  });
};

findCssFiles(outDir);

if (cssFiles.length > 0) {
  console.log('✅ CSS files found:');
  cssFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.warn('⚠️  No CSS files found in build output');
}

// Check for HTML files
const htmlFiles = [];
const findHtmlFiles = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findHtmlFiles(filePath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath.replace(outDir, ''));
    }
  });
};

findHtmlFiles(outDir);

if (htmlFiles.length > 0) {
  console.log('✅ HTML files found:');
  htmlFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.warn('⚠️  No HTML files found in build output');
}

// Check for .nojekyll file
const nojekyllPath = path.join(outDir, '.nojekyll');
if (fs.existsSync(nojekyllPath)) {
  console.log('✅ .nojekyll file found');
} else {
  console.warn('⚠️  .nojekyll file not found');
}

// Check for 404.html
const notFoundPath = path.join(outDir, '404.html');
if (fs.existsSync(notFoundPath)) {
  console.log('✅ 404.html file found');
} else {
  console.warn('⚠️  404.html file not found');
}

console.log('🎉 Build verification completed!'); 