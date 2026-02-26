import { defineStore } from 'pinia'

export const useBlogPosts = defineStore('blogPostsStore', {
  state: () => ({
    blogPosts: [
      {
        id: 1,
        slug: 'getting-started-with-vue',
        title: 'Getting Started with Vue.js',
        author: 'Jane Doe',
        date: '2026-01-15',
        excerpt: 'Learn the basics of Vue.js and build your first application.',
        content: `Vue.js is an approachable, performant framework for building web interfaces...`,
        category: 'Tutorial',
        readTime: '5 min read',
        emoji: '🚀'
      },
      {
        id: 2,
        slug: 'vue-router-guide',
        title: 'Complete Vue Router Guide',
        author: 'John Smith',
        date: '2026-01-20',
        excerpt: 'Master routing in Vue applications with this comprehensive guide.',
        content: `Vue Router is the official router for Vue.js...`,
        category: 'Tutorial',
        readTime: '10 min read',
        emoji: '🛤️'
      },
      {
        id: 3,
        slug: 'vue-best-practices',
        title: 'Vue.js Best Practices 2026',
        author: 'Sarah Johnson',
        date: '2026-01-25',
        excerpt: 'Follow these best practices to write better Vue code.',
        content: `After years of Vue development...`,
        category: 'Best Practices',
        readTime: '8 min read',
        emoji: '⭐'
      }
    ]
  }),
})
