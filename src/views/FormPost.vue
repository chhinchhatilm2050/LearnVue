<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold mb-6">Create New Post</h1>

    <!-- Success Message -->
    <div v-if="successMessage" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
      {{ successMessage }}
    </div>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
      {{ error }}
    </div>

    <!-- Form -->
    <form @submit.prevent="creatPost" class="bg-white shadow-md rounded-lg p-6">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter post title"
        />
      </div>

      <div class="mb-6">
        <label for="body" class="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          id="body"
          v-model="form.body"
          required
          rows="6"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Write your post content..."
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {{ loading ? 'Creating...' : 'Create Post' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useFetch } from '@/composables';
const form = reactive({
  title: '',
  body: ''
});
const successMessage = ref('');
const { data, loading, error, postData } = useFetch('https://jsonplaceholder.typicode.com/posts');
const creatPost = async () => {
  successMessage.value = '';
  await postData({
    title: form.title,
    body: form.body,
    userId: 1
  });
  if(!error.value) {
    successMessage.value = `Post created successfully! ID: ${data.value.id}`
    form.title = '';
    form.body = '';
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }
}
</script>
