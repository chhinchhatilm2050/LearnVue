import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUIStore = defineStore('ui', () => {
  const notifications = ref([]);
  const isCreateModalOpen = ref(false);

  const showNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type
    }
    notifications.value.push(notification);
    setTimeout(() => {
      removeNotification(notification.id)
    },25000)
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(nontify => nontify.id !== id);
  }

  const openCreateModal = () => {
    isCreateModalOpen.value = true;
  }

  const closeCreateModal = () => {
    isCreateModalOpen.value = false;
  }

  return {
    notifications,
    isCreateModalOpen,
    showNotification,
    removeNotification,
    openCreateModal,
    closeCreateModal
  }
});

