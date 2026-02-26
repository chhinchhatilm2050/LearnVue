<template>
  <div class="max-w-7xl mx-auto p-8">
    <h1 class="text-5xl font-bold text-center mb-8">🛍️ Shop</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="flex-1 min-w-[200px]">
        <label class="block mb-2 font-semibold text-gray-800">Category</label>
        <select
          v-model="filters.category"
          @change="applyFilters"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>

      <div class="flex-1 min-w-[200px]">
        <label class="block mb-2 font-semibold text-gray-800">Sort By</label>
        <select
          v-model="filters.sort"
          @change="applyFilters"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div class="flex-1 min-w-[200px]">
        <label class="block mb-2 font-semibold text-gray-800">Search</label>
        <input
          v-model="filters.search"
          @input="applyFilters"
          type="text"
          placeholder="Search products..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
      </div>

      <button
        @click="clearFilters"
        class="self-end px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition whitespace-nowrap">
        Clear Filters
      </button>
    </div>

    <!-- Active Filters Display -->
    <div class="px-4 py-3 bg-sky-100 rounded-lg mb-8 text-sky-700 font-medium">
      <span>Showing {{ filteredProducts.length }} products</span>
      <span v-if="activeCategory !== 'all'"> in {{ activeCategory }}</span>
      <span v-if="activeSearch"> matching "{{ activeSearch }}"</span>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="viewProduct(product.id)"
        class="bg-white p-8 rounded-lg shadow-md cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl text-center">
        <div class="text-6xl mb-4">{{ product.emoji }}</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
        <div class="text-lg mb-3">
          {{ '⭐'.repeat(product.rating) }}
        </div>
        <p class="text-2xl font-bold text-emerald-600 mb-3">${{ product.price }}</p>
        <span class="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
          {{ product.category }}
        </span>
      </div>
    </div>

    <div v-else class="text-center py-16 text-gray-600">
      <h3 class="text-2xl font-semibold mb-2">No products found</h3>
      <p>Try adjusting your filters</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { products } from '@/data/products'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const allProducts = products;
const filters = reactive({
  category: 'all',
  sort: 'name',
  search: ''
});
const activeCategory = computed(() =>  route.query.category || 'all');
const activeSort = computed(() => route.query.sort || 'name');
const activeSearch = computed(() => route.query.search || '');
const filteredProducts = computed(() => {
  debugger;
  let filtered = [...allProducts];
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory.value)
  };
  if(activeSearch.value) {
    const searchLower = activeSearch.value.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchLower)
    )
  };
  switch(activeSort.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'name':
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name))
  }
  return filtered;
});

// onMounted(() => {
//   debugger;
//   filters.category = activeCategory.value;
//   filters.sort = activeSort.value;
//   filters.search = activeSearch.value;
// });

const applyFilters = () => {
  debugger;
  router.push({
    path: '/shop',
    query: {
      category: filters.category,
      sort: filters.sort,
      search: filters.search || undefined
    }
  })
};

const clearFilters = () =>{
  filters.category = 'all'
  filters.sort = 'name'
  filters.search = ''
  router.push('/shop')
};

const viewProduct = (productId) => {
  router.push(`/products/${productId}`)
};

watch(
  () => route.query,
  (newQuery) => {
    filters.category = newQuery.category || 'all'
    filters.sort = newQuery.sort || 'name'
    filters.search = newQuery.search || ''
  },
  { deep: true }
)
</script>

