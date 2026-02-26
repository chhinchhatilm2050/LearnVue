import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    notifications: [],
    isCreateModalOpen: false,
    isSidebarOpen: false,
    theme: 'light'
  }),

  actions: {
    showNotification(message, type = 'info') {
      const notification = {
        id: Date.now(),
        message,
        type
      }

      this.notifications.push(notification)

      setTimeout(() => {
        this.removeNotification(notification.id)
      }, 3000)
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter(
        n => n.id !== id
      )
    },

    openCreateModal() {
      this.isCreateModalOpen = true
    },

    closeCreateModal() {
      this.isCreateModalOpen = false
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  },

  persist: {
    paths: ['theme']
  }
})
