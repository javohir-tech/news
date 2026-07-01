<template>
  <div id="app">
    <AppNavbar />
    <router-view />
    <footer class="text-center py-4 nh-muted small">
      &copy; {{ currentYear }} NewsHub — Vue 2 + Vuex o'quv loyihasi
    </footer>
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'

export default {
  name: 'App',
  components: { AppNavbar },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>
