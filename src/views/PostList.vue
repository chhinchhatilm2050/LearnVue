<template>
  <div class="max-w-7xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Blog Posts</h1>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      <p class="mt-4 text-gray-600 text-lg">Loading posts...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
      <button @click="fetchPosts" class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Retry
      </button>
    </div>

    <!-- Success State -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          {{ post.title }}
        </h2>
        <p class="text-gray-600 text-sm">
          {{ post.body }}
        </p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-xs text-gray-500">Post #{{ post.id }}</span>
          <span class="text-xs text-gray-500">User {{ post.userId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useFetch } from '@/composables';
const { data, loading, error, fetchData } = useFetch('https://jsonplaceholder.typicode.com/posts');
const posts = computed(() => {
  return data.value ? data.value.slice(0, 12) : [];
})
onMounted(() => {
  fetchData();
})


</script>
