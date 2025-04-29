'use client'

import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to SwipeShop
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover your perfect style, one swipe at a time
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/preferences"
            className="flex w-full justify-center rounded-md bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Get Started
          </Link>
          
          <Link
            href="/categories"
            className="flex w-full justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Skip Preferences
          </Link>
        </div>
      </div>
    </div>
  )
} 