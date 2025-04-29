'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface StyleOption {
  id: string
  name: string
  description: string
}

const styleOptions: StyleOption[] = [
  {
    id: 'casual',
    name: 'Casual',
    description: 'Everyday comfort and style'
  },
  {
    id: 'formal',
    name: 'Formal',
    description: 'Professional and elegant'
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Urban and trendy'
  },
  {
    id: 'athletic',
    name: 'Athletic',
    description: 'Sports and activewear'
  }
]

export default function Preferences() {
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([])
  const [gender, setGender] = React.useState<string>('')

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Your Style Preferences</h1>
        
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Select your gender</h2>
          <div className="grid grid-cols-2 gap-4">
            {['male', 'female'].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`rounded-lg p-4 text-center capitalize transition-all ${
                  gender === g
                    ? 'bg-black text-white'
                    : 'bg-white text-black ring-1 ring-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold">Choose your style preferences</h2>
        <div className="grid grid-cols-2 gap-4">
          {styleOptions.map((style) => (
            <motion.button
              key={style.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleStyle(style.id)}
              className={`rounded-lg p-4 text-left transition-all ${
                selectedStyles.includes(style.id)
                  ? 'bg-black text-white'
                  : 'bg-white text-black ring-1 ring-gray-200'
              }`}
            >
              <h3 className="font-semibold">{style.name}</h3>
              <p className="text-sm opacity-80">{style.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/categories"
            className={`block w-full rounded-lg bg-black p-4 text-center font-semibold text-white transition-opacity ${
              !gender || selectedStyles.length === 0 ? 'opacity-50' : 'opacity-100'
            }`}
          >
            Continue to Categories
          </Link>
        </div>
      </div>
    </div>
  )
} 