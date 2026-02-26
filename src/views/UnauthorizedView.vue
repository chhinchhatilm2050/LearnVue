<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center">
      <div class="text-8xl mb-6">🚫</div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p class="text-gray-600 mb-8">
        You don't have permission to access this page.
        <br>
        Contact your administrator if you think this is a mistake.
      </p>
      <div class="space-x-4">
        <router-link
          to="/dashboard"
          class="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
          Go to Dashboard
        </router-link>
        <button
          @click="handleLogout"
          class="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const router = useRouter();
const handleLogout = () => {
  authStore.logout();
  router.push({
    path: 'login'
  });
}
</script>
