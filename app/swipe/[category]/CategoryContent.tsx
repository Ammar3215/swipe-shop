'use client';

import { useState } from 'react';
import ProductCard from '@/app/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
}

interface CategoryContentProps {
  category: string;
}

export default function CategoryContent({ category }: CategoryContentProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Sample products data - replace with your actual data
  const products: Product[] = [
    {
      id: '1',
      name: `${category} Product 1`,
      price: 49.99,
      image: `/images/products/${category}-1.jpg`,
      category: category,
      brand: 'Brand Name',
      description: 'Product description goes here'
    },
    {
      id: '2',
      name: `${category} Product 2`,
      price: 59.99,
      image: `/images/products/${category}-2.jpg`,
      category: category,
      brand: 'Brand Name',
      description: 'Product description goes here'
    },
    {
      id: '3',
      name: `${category} Product 3`,
      price: 69.99,
      image: `/images/products/${category}-3.jpg`,
      category: category,
      brand: 'Brand Name',
      description: 'Product description goes here'
    },
  ];

  const handleAddToWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToWishlist={handleAddToWishlist}
            isInWishlist={wishlist.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
} 