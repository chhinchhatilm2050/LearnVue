<template>
  <button
    :class="[
      'flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-all active:scale-95 ',
      type === 'primary' ? 'bg-blue-500 hover:bg-blue-500 text-white border-blue-800 cursor-pointer' : '',
      type === 'danger' ? 'bg-red-500 hover:bg-red-500 text-white border-red-800 cursor-pointer' : '',
      type === 'success' ? 'bg-green-500 hover:bg-green-500 text-white border-green-800 cursor-pointer' : ''
    ]"
    @click="$emit('click')"
  >
    <slot>
      Confirm
    </slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'primary'
  }
})
</script>
