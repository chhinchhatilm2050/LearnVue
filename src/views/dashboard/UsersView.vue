<template>
  <div class="font-roboto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800 font-display">Users Management</h1>
      <button class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
        + Add User
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ user.name.charAt(0) }}
                </div>
                <span class="font-medium text-gray-800">{{ user.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span :class="roleClasses(user.role)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span :class="statusClasses(user.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4">
              <button class="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
              <button class="text-red-600 hover:text-red-700">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersView',
  data() {
    return {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'moderator', status: 'active' }
      ]
    }
  },
  methods: {
    roleClasses(role) {
      const classes = {
        admin: 'bg-purple-100 text-purple-700',
        moderator: 'bg-blue-100 text-blue-700',
        user: 'bg-gray-100 text-gray-700'
      }
      return classes[role] || classes.user
    },
    statusClasses(status) {
      return status === 'active'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700'
    }
  }
}
</script>
