const fs = require('fs');
const path = require('path');

console.log('🚀 Building static site for GitHub Pages...');

// Ensure .nojekyll file exists in out directory
const outDir = path.join(process.cwd(), 'out');
const nojekyllPath = path.join(outDir, '.nojekyll');

if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file');
}

// Copy public files to out directory
const publicDir = path.join(process.cwd(), 'public');
const copyPublicFiles = (src, dest) => {
  if (fs.existsSync(src)) {
    if (fs.lstatSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(file => {
        copyPublicFiles(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
};

if (fs.existsSync(publicDir)) {
  copyPublicFiles(publicDir, outDir);
  console.log('✅ Copied public files to out directory');
}

// Create a simple 404.html for GitHub Pages
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        h1 { color: #333; }
        a { color: #0070f3; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Go back home</a>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, '404.html'), notFoundHtml);
console.log('✅ Created 404.html for GitHub Pages');

console.log('🎉 Static build completed successfully!');
console.log('📁 Static files are ready in the "out" directory');
console.log('🌐 Ready for GitHub Pages deployment'); 