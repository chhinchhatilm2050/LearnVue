<template>
  <div class="flex h-screen bg-gray-100 font-roboto">
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-6">
        <h1 class="text-white text-2xl">📊 Admin Panel</h1>

        <nav v-for="(link, index) in layoutLink" :key="index" class="space-y-2">
          <router-link
            :to="link.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition"
            exact-active-class="text-teal-600 font-semibold bg-blue-200 px-2 py-1 rounded-xl"
          >
            <span>{{ link.icon }}</span>
            <span>{{link.name}}</span>
          </router-link>
        </nav>

      </div>

      <!-- User Info -->
      <div class="mt-auto p-6 border-t border-gray-700">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-lg">
            {{ currentUser.name.charAt(0) }}
          </div>
          <div>
            <p class="font-semibold">{{ currentUser.name }}</p>
            <p class="text-sm text-gray-400">{{ currentUser.role }}</p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-full px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <!-- <div class="px-8 py-4">
          <h2 class="text-2xl font-bold text-gray-800">{{ pageTitle }}</h2>
        </div> -->
      </header>

      <!-- Page Content -->
      <div class="p-8">
        <router-view />
      </div>
    </main>

    <div class="fixed top-6 left-1/2 -translate-x-1/2 space-y-2 z-50">
      <div
        v-for="notif in uiStore.notifications"
        :key="notif.id"
        :class="notificationClass(notif.type)"
        class="px-6 py-4 rounded-lg shadow-lg animate-slide-in ">
        {{ notif.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// const route = useRoute();

const authStore = useAuthStore();
const uiStore = useUIStore();

const layoutLink = [
  { name: 'Overviews', path: '/dashboard/overview', icon: '📈' },
  { name: 'Users', path: '/dashboard/users', icon: '👥' },
  { name: 'Products', path: '/dashboard/products', icon: '📦' },
  { name: 'Settings', path: '/dashboard/sitting', icon: '⚙️' }
];

const currentUser = computed(() => {
  return authStore.user || { name: 'guest', role: 'guest'}
});

const notificationClass = (type) => {
  const classes = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }
  return classes[type] || classes.info;
}
// const pageTitle = computed(() => {
//   return route.meta.title || 'Dashboard'
// });

const logout = () => {
  authStore.logout();
  router.push('/login')
}
</script>

