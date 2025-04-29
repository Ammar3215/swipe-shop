import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SwipeShop - Fashion Discovery',
  description: 'Discover and shop for clothes with a swipe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Cart />
        </CartProvider>
      </body>
    </html>
  )
} 