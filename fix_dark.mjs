import fs from 'fs';

const files = [
  'src/pages/about.tsx',
  'src/pages/account.tsx', 
  'src/pages/cart.tsx',
  'src/pages/checkout.tsx',
  'src/pages/contact.tsx',
  'src/pages/detail.tsx',
  'src/pages/home.tsx',
  'src/pages/layout.tsx',
  'src/pages/login.tsx',
  'src/pages/products.tsx',
  'src/pages/signup.tsx',
  'src/pages/wishlist.tsx'
];

files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf8');
  const original = content;
  
  // Pattern 1: Replace ${isDark ? "dark" : "light"} with "light"
  content = content.replace(/\$\{\s*isDark\s*\?\s*"([^"]*)"\s*:\s*"([^"]*)"\s*\}/g, '"$2"');
  
  // Pattern 2: Replace ${isDark ? \`dark\` : \`light\`} with \`light\`
  content = content.replace(/\$\{\s*isDark\s*\?\s*`([^`]*)`\s*:\s*`([^`]*)`\s*\}/g, '`$2`');
  
  // Pattern 3: Replace isDark ? "dark" : "light" with "light"
  content = content.replace(/isDark\s*\?\s*"([^"]*)"\s*:\s*"([^"]*)"/g, '"$2"');
  
  // Pattern 4: Replace isDark ? 'dark' : 'light' with 'light'
  content = content.replace(/isDark\s*\?\s*'([^']*)'\s*:\s*'([^']*)'/g, "'$2'");
  
  // Pattern 5: Replace isDark ? \`dark\` : \`light\` with \`light\`
  content = content.replace(/isDark\s*\?\s*`([^`]*)`\s*:\s*`([^`]*)`/g, '`$2`');
  
  // Pattern 6: Remove transition-colors duration-300
  content = content.replace(/\s+transition-colors\s+duration-300/g, '');
  content = content.replace(/transition-colors\s+duration-300\s+/g, '');
  
  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed: ${filepath}`);
  }
});

console.log('Done!');
