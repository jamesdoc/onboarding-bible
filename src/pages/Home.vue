<template>
  <div>
    <main-layout>
      <h1>Welcome</h1>
      <markdown></markdown>
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
