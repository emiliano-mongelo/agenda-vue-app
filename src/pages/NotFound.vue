<template>
  <div class="not-found-container">
    <h1>404 Not Found</h1>
  </div>
</template>

<script>
  export default {
    name: 'Not Found',
    mounted() {
      this.$store.commit('setSection', '404');
    }
  }
</script>
