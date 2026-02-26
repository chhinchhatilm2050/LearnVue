<template>
  <div class="max-w-4xl mx-auto p-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800">Blog Posts</h1>

      <button
        v-if="auth.isLoggedIn"
        @click="ui.openCreateModal()"
        class="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition">
        + New Post
      </button>
    </div>

    <!-- Filters -->
    <div v-if="auth.isLoggedIn" class="flex gap-3 mb-8">
      <button
        @click="posts.setFilter('all')"
        :class="filterButtonClass('all')">
        All Posts
      </button>
      <button
        @click="posts.setFilter('my-posts')"
        :class="filterButtonClass('my-posts')">
        My Posts ({{ posts.myPostsCount }})
      </button>
      <button
        @click="posts.setFilter('drafts')"
        :class="filterButtonClass('drafts')">
        Drafts
      </button>
    </div>

    <!-- Posts List -->
    <div class="space-y-6">
      <div
        v-for="post in posts.filteredPosts"
        :key="post.id"
        class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">

        <!-- Post Header -->
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ post.title }}</h2>
            <div class="flex items-center gap-4 text-gray-600">
              <span>By {{ post.authorName }}</span>
              <span>•</span>
              <span>{{ formatDate(post.createdAt) }}</span>
              <span v-if="post.status === 'draft'" class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                Draft
              </span>
            </div>
          </div>

          <!-- Actions (if author) -->
          <div v-if="post.authorId === auth.user?.id" class="flex gap-2">
            <button
              @click="editPost(post)"
              class="text-blue-600 hover:text-blue-700">
              Edit
            </button>
            <button
              @click="posts.deletePost(post.id)"
              class="text-red-600 hover:text-red-700">
              Delete
            </button>
          </div>
        </div>

        <!-- Post Content -->
        <p class="text-gray-700 mb-6">{{ post.content }}</p>

        <!-- Post Footer -->
        <div class="flex items-center gap-6 pt-4 border-t">
          <button
            @click="posts.likePost(post.id)"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
            <span class="text-xl">👍</span>
            <span>{{ post.likes }}</span>
          </button>

          <button
            @click="showComments(post)"
            class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
            <span class="text-xl">💬</span>
            <span>{{ post.comments.length }}</span>
          </button>
        </div>

        <!-- Comments Section (if open) -->
        <div v-if="openComments === post.id" class="mt-6 pt-6 border-t">
          <h3 class="font-bold text-gray-800 mb-4">Comments</h3>

          <!-- Comment Form -->
          <div v-if="auth.isLoggedIn" class="mb-6">
            <div class="flex gap-3">
              <input
                v-model="commentText"
                type="text"
                placeholder="Add a comment..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <button
                @click="addComment(post.id)"
                class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
                Post
              </button>
            </div>
          </div>

          <!-- Comments List -->
          <div class="space-y-3">
            <div
              v-for="comment in post.comments"
              :key="comment.id"
              class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <span class="font-semibold text-gray-800">{{ comment.authorName }}</span>
                <span class="text-sm text-gray-500">{{ formatDate(comment.createdAt) }}</span>
              </div>
              <p class="text-gray-700">{{ comment.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="posts.filteredPosts.length === 0" class="text-center py-16">
      <p class="text-6xl mb-4">📝</p>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">No posts yet</h2>
      <p class="text-gray-600">Be the first to create a post!</p>
    </div>

    <!-- Create Post Modal -->
    <div
      v-if="ui.isCreateModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="ui.closeCreateModal()">
      <div class="bg-white rounded-lg p-8 max-w-2xl w-full">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>

        <form @submit.prevent="createPost" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              v-model="newPost.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Content</label>
            <textarea
              v-model="newPost.content"
              rows="6"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
          </div>

          <div class="flex items-center gap-3">
            <input
              v-model="newPost.isDraft"
              type="checkbox"
              id="draft"
              class="w-4 h-4">
            <label for="draft" class="text-gray-700">Save as draft</label>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="flex-1 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition">
              Create Post
            </button>
            <button
              type="button"
              @click="ui.closeCreateModal()"
              class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Notifications -->
    <div class="fixed top-6 left-1/2 -translate-x-1/2 space-y-2 z-50">
      <div
        v-for="notif in ui.notifications"
        :key="notif.id"
        :class="notificationClass(notif.type)"
        class="px-6 py-4 rounded-lg shadow-lg animate-slide-in ">
        {{ notif.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { usePostsStore } from '@/stores/posts'
import { useUIStore } from '@/stores/ui'
import { ref, onMounted } from 'vue'
const auth = useAuthStore();
const ui = useUIStore();
const posts = usePostsStore();

const newPost = ref({
  title: '',
  content: '',
  isDraft: false
})

const commentText = ref(''),
openComments = ref(false);

onMounted(() => {
  if(posts.posts.length === 0) {
    posts.fetchPosts()
  }
});

const createPost = () => {
  posts.createPost({
    ...newPost.value
  })
  newPost.value = {
    title: '',
    content: '',
    isDraft: false
  }

  ui.closeCreateModal()
}

const addComment = (postId) => {
  if(commentText.value.trim()) {
    posts.addComment(postId, commentText.value);
    commentText.value = '';
  }
};

const showComments = (post) => {
  openComments.value = openComments.value === post.id ? null : post.id;
};

const editPost = (post) => {
  newPost.value = {
    title: post.title,
    content: post.content,
    isDraft: post.isDraft
  }
  ui.openCreateModal();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
};

const filterButtonClass = (filter) => {
  const baseClass = 'px-6 py-2 rounded-lg font-semibold transition';
  return posts.filter === filter
    ? baseClass + ' bg-emerald-500 text-white'
    : baseClass + ' bg-gray-200 text-gray-700 hover:bg-gray-300'
};

const notificationClass = (type) => {
  const classes = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }
  return classes[type] || classes.info
}

</script>

<style>
  @keyframes slide-down {
    from {
      transform: translateY(-60px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-slide-in {
    animation: slide-down 0.3s ease-out;
  }
</style>
