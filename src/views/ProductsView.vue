<!-- views/ProductsView.vue -->
<template>
  <div class="max-w-7xl mx-auto p-8">
    <h1 class="text-3xl font-bold text-center">Our Products</h1>
    <div class="mt-10">
      <div  class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div class="shadow-xl p-8 text-center"  v-for="product in products" :key="product.id">
          <div class="text-8xl text-center mb-8">{{ product.emoji }}</div>
          <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
          <p class="text-3xl font-bold text-emerald-600 mb-6">${{ product.price }}</p>
          <p class="text-lg text-gray-600 mb-8">{{ product.description }}</p>
          <button @click="viewProduct(product.id)" class="btn cursor-pointer bg-blue-500 px-3 py-1 rounded-sm text-white">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const products = [
  { id: 1, name: 'Laptop', price: 999, emoji: '💻', description: 'High-performance laptop' },
  { id: 2, name: 'Phone', price: 699, emoji: '📱', description: 'Latest smartphone' },
  { id: 3, name: 'Headphones', price: 199, emoji: '🎧', description: 'Noise-cancelling' }
];
const viewProduct = (productId) => {
  router.push({
    name: 'product-detail',
    params: { id: productId}
  })
}
</script>
