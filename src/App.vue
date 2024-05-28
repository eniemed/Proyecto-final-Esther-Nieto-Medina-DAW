<template>

  <Navbar/>
  <router-view />
  <Footer v-if="$route.path !== '/public'"></Footer>

</template>

<script>

import Navbar from './aromio/shared/Navbar.vue';
import Footer from './aromio/shared/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style>

</style>
