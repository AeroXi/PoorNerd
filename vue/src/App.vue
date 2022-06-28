<template>
  <PoorNerd />

</template>

<script>

import PoorNerd from '@/components/PoorNerd.vue'



export default {
  name: 'App',
  components: {
    PoorNerd,
  }
}
</script>

<style>
html,body {
  height: 100%;
}

h1, .nav {
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
</style>

