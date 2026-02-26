export const products = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'electronics', rating: 5, emoji: '💻' },
  { id: 2, name: 'Wireless Mouse', price: 49, category: 'electronics', rating: 4, emoji: '🖱️' },
  { id: 3, name: 'Mechanical Keyboard', price: 159, category: 'electronics', rating: 5, emoji: '⌨️' },
  { id: 4, name: 'T-Shirt', price: 29, category: 'clothing', rating: 4, emoji: '👕' },
  { id: 5, name: 'Jeans', price: 79, category: 'clothing', rating: 4, emoji: '👖' },
  { id: 6, name: 'Sneakers', price: 99, category: 'clothing', rating: 5, emoji: '👟' },
  { id: 7, name: 'JavaScript Guide', price: 39, category: 'books', rating: 5, emoji: '📘' },
  { id: 8, name: 'Vue.js Cookbook', price: 44, category: 'books', rating: 5, emoji: '📗' },
  { id: 9, name: 'Design Patterns', price: 49, category: 'books', rating: 4, emoji: '📕' }
]
import { defineStore } from "pinia"
export const useProsuctsStore = defineStore('productStor', {
  state: () => ({
    products: [
      
    ]
  })
})
