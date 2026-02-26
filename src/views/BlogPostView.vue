<template>
  <div class="max-w-4xl mx-auto px-8 py-12 font-roboto">
    <div v-if="loading" class="text-center py-16 text-xl text-gray-600">
      Loading post...
    </div>

    <article v-else-if="post" class="bg-white p-12 rounded-lg shadow-md">
      <div class="text-center mb-12 pb-8 border-b-2 border-gray-200">
        <div class="text-8xl mb-4">{{ post.emoji }}</div>
        <span class="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-2xl text-sm mb-6">
          {{ post.category }}
        </span>
        <h1 class="text-4xl font-bold text-gray-800 mb-4 leading-tight">{{ post.title }}</h1>
        <div class="flex justify-center gap-6 text-gray-600">
          <span>By {{ post.author }}</span>
          <span>{{ post.date }}</span>
          <span>{{ post.readTime }}</span>
        </div>
      </div>

      <div class="text-lg leading-relaxed text-gray-700 mb-12">
        <p class="mb-6">{{ post.content }}</p>
      </div>

      <div class="flex justify-between gap-4 pt-8 border-t-2 border-gray-200">
        <button
          @click="goBack"
          class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          ← Back to Blog
        </button>
        <button
          @click="sharePost"
          class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
          Share 📤
        </button>
      </div>
    </article>

    <div v-else class="text-center py-16">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Post Not Found</h2>
      <p class="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
      <router-link
        to="/blog"
        class="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
        ← Back to Blog
      </router-link>
    </div>
  </div>
</template>

<script>
import { useBlogPosts } from '@/data/blogPost';

export default {
  name: 'BlogPostView',
  data() {
    return {
      post: null,
      loading: true
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    }
  },
  created() {
    this.loadPost()
  },
  methods: {
    loadPost() {
      this.loading = true
      const blogStore = useBlogPosts()      // ✅ Get store here
      const posts = blogStore.blogPosts     // ✅ Access blogPosts
      const found = posts.find(p => p.slug === this.slug)
      this.post = found || null
      this.loading = false
    },
    goBack() {
      this.$router.push('/blog')
    },
    sharePost() {
      const url = window.location.href
      navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
  },
  watch: {
    '$route.params.slug'() {
      this.loadPost()
    }
  }
}
</script>
