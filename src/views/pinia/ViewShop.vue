<template>
  <div class="max-w-6xl mx-auto p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">Shop</h1>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
      >
        <!-- Product Image -->
        <div class="h-48 bg-gray-200 flex items-center justify-center text-6xl">
          {{ product.image }}
        </div>

        <!-- Product Info -->
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-3xl font-bold text-emerald-600 mb-4">${{ product.price }}</p>

          <!-- Add to Cart Button -->
          <button
            v-if="!cart.hasItem(product.id)"
            @click="cart.addItem(product)"
            class="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition"
          >
            Add to Cart
          </button>

          <!-- In Cart Badge -->
          <div v-else class="flex items-center justify-between">
            <span class="text-emerald-600 font-semibold"
              >✓ In Cart ({{ cart.getItemQuantity(product.id) }})</span
            >
            <button
              @click="cart.addItem(product)"
              class="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
            >
              + Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cart = useCartStore();
const products = [
  { id: 1, name: 'Laptop', price: 999, image: '💻', description: 'Powerful laptop for work' },
  { id: 2, name: 'Smartphone', price: 699, image: '📱', description: 'Latest smartphone model' },
  { id: 3, name: 'Headphones', price: 199, image: '🎧', description: 'Noise-canceling headphones' },
  { id: 4, name: 'Keyboard', price: 149, image: '⌨️', description: 'Mechanical keyboard' },
  { id: 5, name: 'Mouse', price: 79, image: '🖱️', description: 'Wireless gaming mouse' },
  { id: 6, name: 'Monitor', price: 399, image: '🖥️', description: '4K display monitor' }
]
</script>
