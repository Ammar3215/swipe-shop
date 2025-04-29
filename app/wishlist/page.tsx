'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrashIcon } from '@heroicons/react/24/outline'

interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  image: string
  url: string
}

// Mock data - in a real app this would come from local storage or an API
const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    brand: 'Essential Basics',
    price: 29.99,
    image: '/images/products/tshirt-1.jpg',
    url: 'https://example.com/product/1'
  },
  {
    id: '2',
    name: 'Black Denim Jacket',
    brand: 'Urban Style',
    price: 89.99,
    image: '/images/products/jacket-1.jpg',
    url: 'https://example.com/product/2'
  }
]

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>(mockWishlist)

  const removeItem = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
  }

  const getTotalPrice = () => {
    return wishlistItems.reduce((total, item) => total + item.price, 0)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
          <p className="mt-2 text-gray-600">
            Start swiping to find items you love!
          </p>
          <Link
            href="/categories"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Your Wishlist</h1>
        
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.brand}</p>
                <p className="mt-1 font-semibold">${item.price}</p>
              </div>

              <div className="flex gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
                >
                  Buy Now
                </a>
                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>
          <button className="mt-4 w-full rounded-lg bg-black py-3 text-center font-semibold text-white">
            Checkout All Items
          </button>
        </div>
      </div>
    </div>
  )
} 