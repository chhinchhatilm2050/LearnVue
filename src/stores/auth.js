import { defineStore } from 'pinia'
import { usePostsStore } from './posts'
import { useUIStore } from './ui'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userName: (state) => state.user?.name || 'Guest',
    userRole: (state) => state.user?.role || 'guest'
  },

  actions: {
    login(email, password, isAdmin) {
      this.token = 'token-' + Date.now()
      this.user = {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        role: isAdmin ? 'admin' : 'user',
        avatar: email.charAt(0).toUpperCase()
      }

      const postsStore = usePostsStore();
      postsStore.fetchPosts();
      const uiStore = useUIStore();
      uiStore.showNotification('Welcome back!', 'success')
    },

    logout() {
      this.user = null
      this.token = null

      const postsStore = usePostsStore()
      postsStore.clearPosts()

      const uiStore = useUIStore()
      uiStore.showNotification('Logged out successfully', 'info')
    },

    updateProfile(updates) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    }
  },
  persist: {
    paths: ['token', 'user']
  }
})
