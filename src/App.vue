<template>
  <Navbar />
  <router-view />
</template>

<script>
// Imports
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
</style>
