import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { HeartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  onAddToWishlist: (productId: string) => void;
  isInWishlist: boolean;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCard({ product, onAddToWishlist, isInWishlist }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={() => onAddToWishlist(product.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
          }`}
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Select Size:</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 