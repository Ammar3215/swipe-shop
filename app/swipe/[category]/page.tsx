'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  description: string
}

// Mock data - in a real app this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    brand: 'Essential Basics',
    price: 29.99,
    image: '/images/products/tshirt-1.jpg',
    description: 'Premium cotton classic fit t-shirt'
  },
  {
    id: '2',
    name: 'Black Denim Jacket',
    brand: 'Urban Style',
    price: 89.99,
    image: '/images/products/jacket-1.jpg',
    description: 'Classic denim jacket with modern fit'
  },
  {
    id: '3',
    name: 'Running Shoes',
    brand: 'SportFlex',
    price: 119.99,
    image: '/images/products/shoes-1.jpg',
    description: 'Lightweight running shoes with cushioned sole'
  }
]

export default function SwipePage({ params }: { params: { category: string } }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState<'left' | 'right' | null>(null)
  const [showInfo, setShowInfo] = React.useState(false)
  const [likedProducts, setLikedProducts] = React.useState<string[]>([])

  const currentProduct = mockProducts[currentIndex]

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection)
    if (swipeDirection === 'right') {
      setLikedProducts(prev => [...prev, currentProduct.id])
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDirection(null)
    }, 300)
  }

  if (currentIndex >= mockProducts.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No more items to show!</h2>
          <p className="mt-2 text-gray-600">
            You've liked {likedProducts.length} items
          </p>
          <Link
            href="/wishlist"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            View Wishlist
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ scale: direction ? 1 : 0.5, opacity: direction ? 1 : 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg"
          >
            <Image
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              className="object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">{currentProduct.name}</h2>
              <p className="text-lg">{currentProduct.brand}</p>
              <p className="text-xl font-semibold">${currentProduct.price}</p>
            </div>

            {showInfo && (
              <div className="absolute inset-0 bg-black/80 p-6 text-white">
                <h3 className="mb-4 text-xl font-bold">Product Details</h3>
                <p>{currentProduct.description}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => handleSwipe('left')}
            className="rounded-full bg-white p-4 shadow-lg transition-transform hover:scale-110"
          >
            <XMarkIcon className="h-8 w-8 text-red-500" />
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="rounded-full bg-white p-4 shadow-lg transition-transform hover:scale-110"
          >
            <InformationCircleIcon className="h-8 w-8 text-gray-500" />
          </button>

          <button
            onClick={() => handleSwipe('right')}
            className="rounded-full bg-white p-4 shadow-lg transition-transform hover:scale-110"
          >
            <HeartIcon className="h-8 w-8 text-green-500" />
          </button>
        </div>
      </div>
    </div>
  )
} 