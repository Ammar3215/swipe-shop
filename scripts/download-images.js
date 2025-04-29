const https = require('https');
const fs = require('fs');
const path = require('path');

const categories = [
  { name: 'tshirts', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop' },
  { name: 'jackets', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop' },
  { name: 'shoes', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop' },
  { name: 'pants', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop' },
  { name: 'accessories', url: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=600&fit=crop' },
  { name: 'dresses', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=600&fit=crop' }
];

const products = [
  { category: 'tshirts', count: 3 },
  { category: 'jackets', count: 3 },
  { category: 'shoes', count: 3 },
  { category: 'pants', count: 3 },
  { category: 'accessories', count: 3 },
  { category: 'dresses', count: 3 }
];

const productUrls = {
  tshirts: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop'
  ],
  jackets: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop'
  ],
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=1000&fit=crop'
  ],
  pants: [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop'
  ],
  accessories: [
    'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=800&h=1000&fit=crop'
  ],
  dresses: [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop'
  ]
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
}

async function main() {
  // Create directories if they don't exist
  const categoriesDir = path.join(__dirname, '../public/images/categories');
  const productsDir = path.join(__dirname, '../public/images/products');
  
  if (!fs.existsSync(categoriesDir)) {
    fs.mkdirSync(categoriesDir, { recursive: true });
  }
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  // Download category images
  console.log('Downloading category images...');
  for (const category of categories) {
    const filepath = path.join(categoriesDir, `${category.name}.jpg`);
    try {
      await downloadImage(category.url, filepath);
      console.log(`Downloaded ${category.name}.jpg`);
    } catch (error) {
      console.error(`Error downloading ${category.name}:`, error);
    }
  }

  // Download product images
  console.log('\nDownloading product images...');
  for (const category of products) {
    for (let i = 1; i <= category.count; i++) {
      const filepath = path.join(productsDir, `${category.category}-${i}.jpg`);
      try {
        await downloadImage(productUrls[category.category][i-1], filepath);
        console.log(`Downloaded ${category.category}-${i}.jpg`);
      } catch (error) {
        console.error(`Error downloading ${category.category}-${i}:`, error);
      }
    }
  }

  console.log('\nAll images downloaded successfully!');
}

main().catch(console.error); 