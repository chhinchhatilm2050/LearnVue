import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useUIStore } from './ui'
import { ref, computed } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const currentPost = ref(null)
  const filter = ref('all')

  const authStore = useAuthStore()
  const uiStore = useUIStore()
  const filteredPosts = computed(() => {
    const userId = authStore.user?.id;
    if (filter.value === 'my-posts') {
      return userId
        ? posts.value.filter(p => p.authorId === userId)
        : []
    }

    if (filter.value === 'drafts') {
      return userId
        ? posts.value.filter(
            p => p.status === 'draft' && p.authorId === userId
          )
        : []
    }
    return posts.value.filter(p => p.status === 'published')
  })
  const myPostsCount = computed(() => {
    const userId = authStore.user?.id
    return userId
      ? posts.value.filter(p => p.authorId === userId).length
      : 0
  })

  const getPostById = (id) => {
    return posts.value.find(p => p.id === id)
  }

  const fetchPosts = () => {
    if (posts.value.length) return

    posts.value = [
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
  }

  const createPost = (postData) => {
    if (!authStore.isLoggedIn) {
      uiStore.showNotification(
        'Please login to create posts',
        'error'
      )
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

    posts.value.unshift(newPost)

    uiStore.showNotification(
      'Post created successfully!',
      'success'
    )

    return newPost
  }

  const updatePost = (id, updates) => {
    const post = posts.value.find(p => p.id === id)

    if (post) {
      Object.assign(post, updates)
      uiStore.showNotification('Post updated', 'success')
    }
  }

  const deletePost = (id) => {
    posts.value = posts.value.filter(p => p.id !== id)
    uiStore.showNotification('Post was deleted!', 'error')
  }

  const likePost = (id) => {
    if (!authStore.isLoggedIn) {
      uiStore.showNotification(
        'Please login to like posts',
        'error'
      )
      return
    }

    const post = posts.value.find(p => p.id === id)

    if (post) {
      post.likes++
    }
  }

  const addComment = (postId, commentText) => {
    if (!authStore.isLoggedIn) {
      uiStore.showNotification(
        'Please login to comment',
        'error'
      )
      return
    }

    const post = posts.value.find(p => p.id === postId)

    if (post) {
      post.comments.push({
        id: Date.now(),
        authorName: authStore.userName,
        text: commentText,
        createdAt: new Date().toISOString()
      })
    }
  }
  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  const clearPosts = () => {
    posts.value = []
    currentPost.value = null
  }

  return {
    posts,
    currentPost,
    filter,
    filteredPosts,
    myPostsCount,
    getPostById,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    setFilter,
    clearPosts
  }
},
{
  persist: {
    paths: ['posts']
  }
}
)
