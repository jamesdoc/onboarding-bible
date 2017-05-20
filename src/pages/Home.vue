<template>
  <div>
    <main-layout class="wrap center">
      <img src="/static/images/logo.png" class="logo">
      <markdown class="home"></markdown>
      <router-link class="button" to="/days/1/">Start Now</router-link>
    </main-layout>
  </div>
</template>

<script>
  import MainLayout from '../components/MainLayout.vue'
  import markdown from '../content/Home.md'

  export default {
    data () {
      return {
        title: 'Home'
      }
    },
    head: {
      title: function () {
        return {
          inner: this.title
        }
      }
    },
    components: {
      MainLayout,
      markdown
    }
  }
</script>
