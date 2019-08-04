<template>
  <header class="main-header w-100 bg-white tc pv3 shadow-4">
    <span class="absolute left-0 pl3" @click="goBack">
      <md-icon>arrow_back_ios</md-icon>
    </span>
    <span class="b">{{ $t(`${section}.title`)}}</span>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    computed: {
      section() {
        return this.$store.state.section;
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
`
