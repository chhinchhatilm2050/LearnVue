<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8 text-gray-800">Movie Search</h1>
    <div class="max-w-2xl mx-auto mb-8">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search for movies..."
        class="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Searching movies...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 text-lg">{{ error }}</p>
    </div>

    <div v-else-if="searchQuery && movies.length === 0 && !loading" class="text-center py-12">
      <p class="text-gray-500 text-lg">No movies found. Try another search term.</p>
    </div>

    <div v-else-if="movies.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
      >
        <img
          :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'"
          :alt="movie.Title"
          class="w-full h-80 object-cover"
        />
        <div class="p-4">
          <h3 class="font-semibold text-gray-800 truncate">{{ movie.Title }}</h3>
          <p class="text-sm text-gray-600">{{ movie.Year }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500 text-lg">Start typing to search for movies...</p>
    </div>
  </div>
</template>

<script setup>
import { useFetch, useDebounce } from '@/composables';
import { ref, computed, watch } from 'vue';
const searchQuery = ref('');
const debouncedeSearch = useDebounce(searchQuery, 500);
const {data, loading, error, fetchData } = useFetch('https://www.omdbapi.com/');
const movies = computed(() => {
  return data.value?.Search || []
});
watch(debouncedeSearch, (newVal) => {
  if(!newVal.trim() || newVal.length < 3) return;
  fetchData({
    apikey: '64d2ce21',
    s: newVal,
    type: 'movie'
  })
})

</script>
