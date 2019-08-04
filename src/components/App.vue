<template>
  <div class="main-container">
    <md-progress-bar class="absolute top-0" md-mode="indeterminate" v-if="loading" />
    <Header class="flex justify-center w-100 pv3" />
    <div class="section-container flex justify-center">
      <section class="w-100 w-50-ns">
        <router-view />
      </section>
    </div>
  </div>
</template>

<script>
import Header from './Header';

export default {
  name: 'app',
  components: {
    Header
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  }
}
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
    primary: #39d4f1, // The primary color of your brand
    accent: #1a11e8 // The secondary color of your brand
  ));

  @import "~vue-material/dist/theme/all";

  html {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 16px;
    user-select: none;
    touch-action: manipulation;

    .md-content.md-theme-default,
    .md-tabs.md-theme-default .md-tabs-navigation {
      background-color: transparent;
    }
  }
</style>
