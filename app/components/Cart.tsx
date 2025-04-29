'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {items.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm font-medium">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 