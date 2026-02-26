<template>
  <div class="max-w-4xl mx-auto p-8">
    <div v-if="loading" class="text-center py-16 text-xl text-gray-600">
      Loading product...
    </div>

    <div v-else-if="product">
      <div class="text-8xl text-center mb-8">{{ product.emoji }}</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
      <p class="text-3xl font-bold text-emerald-600 mb-6">${{ product.price }}</p>
      <p class="text-lg text-gray-600 mb-8">{{ product.description }}</p>

      <button
        @click="goBack"
        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
        ← Back to Products
      </button>
    </div>

    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
      <router-link
        to="/products"
        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
        Go to product
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const loading = ref(true);
const product = ref(null);
const allProducts = [
  { id: 1, name: 'Laptop', price: 999, emoji: '💻', description: 'High-performance laptop' },
  { id: 2, name: 'Phone', price: 699, emoji: '📱', description: 'Latest smartphone' },
  { id: 3, name: 'Headphones', price: 199, emoji: '🎧', description: 'Noise-cancelling' }
];

const productId = computed(() => Number(route.params.id));

const loadProduct = () => {
  loading.value = true;
  setTimeout(() => {
    product.value = allProducts.find(p => p.id === productId.value);
    loading.value = false;
  },500)
}

const goBack = () => {
  router.push({name: 'products'})
}

onMounted(() => {
  loadProduct();
});

watch(() =>
  route.params.id,
  () => loadProduct()
)
</script>
