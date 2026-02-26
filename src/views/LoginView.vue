<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h1>
      <p class="text-gray-600 mb-8 text-center">Sign in to access your dashboard</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="form.isAdmin"
            type="checkbox"
            id="admin"
            class="w-4 h-4">
          <label for="admin" class="text-gray-700">Login as Admin</label>
        </div>

        <button
          type="submit"
          class="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition">
          Sign In
        </button>
      </form>

      <p class="text-sm text-gray-600 mt-6 text-center">
        Demo: Any email/password works
      </p>
    </div>
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
import { useUIStore } from '@/stores/ui'
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore();
const uiStore = useUIStore();
const route = useRoute();
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  isAdmin: false
});

const ui = computed(() => {
  return uiStore;
});

const handleLogin = () => {
  debugger;
  authStore.login(form.email, form.password, form.isAdmin)
  const redirect = route.query.redirect || '/dashboard'
  router.push(redirect)
}
const notificationClass = (type) => {
  const classes = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }
  return classes[type] || classes.info;
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

