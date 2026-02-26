<template>
  <nav-bar />
  <router-view />
  <my-footer />
</template>

<script>
  import NavBar from '@/components/NavBar.vue'
  import MyFooter from '@/components/MyFooter.vue'

  export default {
    components: {
      NavBar,
      MyFooter
    }
  }
</script>
