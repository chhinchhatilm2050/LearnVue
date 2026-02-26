<template>
  <div class="font-roboto">
    <h1 class="text-3xl font-bold text-gray-800 mb-8 font-display">Overview</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600 text-sm font-semibold">Total Users</h3>
          <span class="text-2xl">👥</span>
        </div>
        <p class="text-4xl font-bold text-emerald-600">1,234</p>
        <p class="text-sm text-gray-500 mt-2">↑ 12% from last month</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600 text-sm font-semibold">Revenue</h3>
          <span class="text-2xl">💰</span>
        </div>
        <p class="text-4xl font-bold text-blue-600">$45,678</p>
        <p class="text-sm text-gray-500 mt-2">↑ 8% from last month</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600 text-sm font-semibold">Products</h3>
          <span class="text-2xl">📦</span>
        </div>
        <p class="text-4xl font-bold text-purple-600">567</p>
        <p class="text-sm text-gray-500 mt-2">↑ 5% from last month</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-600 text-sm font-semibold">Orders</h3>
          <span class="text-2xl">🛒</span>
        </div>
        <p class="text-4xl font-bold text-orange-600">89</p>
        <p class="text-sm text-gray-500 mt-2">↓ 3% from last month</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      <div class="space-y-4">
        <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center gap-4 pb-4 border-b">
          <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            {{ activity.icon }}
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800">{{ activity.title }}</p>
            <p class="text-sm text-gray-600">{{ activity.description }}</p>
          </div>
          <span class="text-sm text-gray-500">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewView',
  data() {
    return {
      recentActivity: [
        { id: 1, icon: '👤', title: 'New User Registered', description: 'john@example.com joined', time: '2 min ago' },
        { id: 2, icon: '📦', title: 'New Product Added', description: 'iPhone 15 Pro added to catalog', time: '15 min ago' },
        { id: 3, icon: '🛒', title: 'Order Completed', description: 'Order #1234 shipped', time: '1 hour ago' },
        { id: 4, icon: '💳', title: 'Payment Received', description: '$299 from customer', time: '2 hours ago' }
      ]
    }
  }
}
</script>
