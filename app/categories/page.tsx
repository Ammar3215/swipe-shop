'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  image: string
}

const categories: Category[] = [
  {
    id: 'tshirts',
    name: 'T-Shirts',
    image: '/images/categories/tshirts.jpg'
  },
  {
    id: 'jackets',
    name: 'Jackets',
    image: '/images/categories/jackets.jpg'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    image: '/images/categories/shoes.jpg'
  },
  {
    id: 'pants',
    name: 'Pants',
    image: '/images/categories/pants.jpg'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/images/categories/accessories.jpg'
  },
  {
    id: 'dresses',
    name: 'Dresses',
    image: '/images/categories/dresses.jpg'
  }
]

export default function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Choose a Category</h1>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/swipe/${category.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative aspect-square overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 