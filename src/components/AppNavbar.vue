<template>
  <nav class="navbar navbar-expand-md navbar-dark nh-navbar">
    <div class="container">
      <router-link class="navbar-brand" to="/">📰 NewsHub</router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="isOpen = !isOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: isOpen }">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>Bosh sahifa</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Qidiruv</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">Biz haqimizda</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
