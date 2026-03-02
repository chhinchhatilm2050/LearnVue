import { defineStore } from 'pinia'
import { usePostsStore } from './posts'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || 'Guest')
  const userRole = computed(() => user.value?.role || 'guest')

  async function login(email, password, isAdmin = false) {

    loading.value = true
    error.value = null

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      token.value = 'token-' + Date.now()
      user.value = {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        role: isAdmin ? 'admin' : 'user',
        avatar: email.charAt(0).toUpperCase()
      }

      const postsStore = usePostsStore()
      postsStore.fetchPosts()

      return true

    } catch (err) {
      error.value = err.message
      return false

    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    const postsStore = usePostsStore()
    postsStore.clearPosts()
  }

  function updateProfile(updates) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    userName,
    userRole,
    login,
    logout,
    updateProfile
  }

}, {
  persist: {
    path: ['token', 'user']
  }
})
