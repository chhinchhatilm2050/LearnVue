import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useUIStore } from './ui'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
    filter: 'all' // 'all', 'my-posts', 'drafts'
  }),

  getters: {
    filteredPosts() {
      const authStore = useAuthStore()

      if (this.filter === 'my-posts') {
        return this.posts.filter(p => p.authorId === authStore.user?.id)
      }
      if (this.filter === 'drafts') {
        return this.posts.filter(p => p.status === 'draft' && p.authorId === authStore.user?.id)
      }
      return this.posts.filter(p => p.status === 'published')
    },

    getPostById: (state) => {
      return (id) => state.posts.find(p => p.id === id)
    },

    myPostsCount() {
      const authStore = useAuthStore()
      return this.posts.filter(p => p.authorId === authStore.user?.id).length
    }
  },

  actions: {
    fetchPosts() {
      if (this.posts.length) return  // ← add this

      this.posts = [
        {
          id: 1,
          title: 'Getting Started with Vue 3',
          content: 'Vue 3 brings many improvements...',
          authorId: 1,
          authorName: 'Admin',
          status: 'published',
          createdAt: new Date().toISOString(),
          likes: 42,
          comments: []
        },
        {
          id: 2,
          title: 'Understanding Pinia',
          content: 'Pinia is the official state management...',
          authorId: 1,
          authorName: 'Admin',
          status: 'published',
          createdAt: new Date().toISOString(),
          likes: 38,
          comments: []
        }
      ]
    },

    createPost(postData) {
      const authStore = useAuthStore()
      const uiStore = useUIStore()

      if (!authStore.isLoggedIn) {
        uiStore.showNotification('Please login to create posts', 'error')
        return
      }

      const newPost = {
        id: Date.now(),
        title: postData.title,
        content: postData.content,
        authorId: authStore.user.id,
        authorName: authStore.userName,
        status: postData.isDraft ? 'draft' : 'published',
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      }

      this.posts.unshift(newPost)
      uiStore.showNotification('Post created successfully!', 'success')

      return newPost
    },

    updatePost(id, updates) {
      const post = this.posts.find(p => p.id === id)
      if (post) {
        Object.assign(post, updates)

        const uiStore = useUIStore()
        uiStore.showNotification('Post updated', 'success')
      }
    },

    deletePost(id) {
      this.posts = this.posts.filter(p => p.id !== id)

      const uiStore = useUIStore()
      uiStore.showNotification('Post deleted', 'info')
    },

    likePost(id) {
      const authStore = useAuthStore()

      if (!authStore.isLoggedIn) {
        const uiStore = useUIStore()
        uiStore.showNotification('Please login to like posts', 'error')
        return
      }

      const post = this.posts.find(p => p.id === id)
      if (post) {
        post.likes++
      }
    },

    addComment(postId, commentText) {
      const authStore = useAuthStore()

      if (!authStore.isLoggedIn) {
        const uiStore = useUIStore()
        uiStore.showNotification('Please login to comment', 'error')
        return
      }

      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.comments.push({
          id: Date.now(),
          authorName: authStore.userName,
          text: commentText,
          createdAt: new Date().toISOString()
        })
      }
    },

    setFilter(filter) {
      this.filter = filter
    },

    clearPosts() {
      this.posts = []
      this.currentPost = null
    }
  }
}, {
  persist: {
    paths: ['posts']
  }
})
