<template>
  <section class="max-w-6xl mx-auto px-8 py-12 font-roboto">
    <h1 class="text-5xl font-bold text-center mb-12">📝 Blog</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in blogPosts"
        :key="post.id"
        class="bg-white p-8 rounded-xl shadow-md transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="text-5xl mb-4">{{ post.emoji }}</div>

        <h2 class="text-2xl font-semibold mb-3">
          {{ post.title }}
        </h2>

        <p class="text-gray-600 mb-4">
          {{ post.excerpt }}
        </p>

        <router-link
          :to="{ name: 'blog-post', params: { slug: post.slug } }"
          class="text-emerald-600 font-semibold hover:underline"
        >
          Read More →
        </router-link>
      </article>
    </div>
  </section>
</template>

<script>
import { useBlogPosts } from '@/data/blogPost'; // Make sure this points to your Pinia store
import { storeToRefs } from 'pinia'

export default {
  name: 'BlogView',
  data() {
    return {
      blogPosts: [] // Local reactive property
    }
  },
  created() {
    const blogStore = useBlogPosts()        // Get store
    const { blogPosts } = storeToRefs(blogStore) // ✅ Make reactive references

    // Assign reactive ref to local data property
    this.blogPosts = blogPosts
  }
}
</script>
