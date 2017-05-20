<template>
  <div>
    <main-layout>
      <h1>{{ title }}</h1>
      <div class="content" v-html="reading"></div>
    </main-layout>
  </div>
</template>

<script>
  import MainLayout from '../components/MainLayout.vue'

  export default {
    data () {
      var dayId = parseInt(this.$route.params.id)
      
      return {
        title: '',
        reading: '',
        id: dayId,
        path: '/days/' + dayId + '/read'
      }
    },

    mounted: function() {
      var instance = this
      fetch('/static/data/day' + this.id + '.json')
        .then(response => response.json())
        .then(function(response) {
          instance.addData(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    head: {
      title: function () {
        return {
          inner: this.title
        }
      }
    },

    components: {
      MainLayout
    },

    methods: {
      addData: function(response) {
        this.title = 'Day ' + response.day,
        this.reading = response.reading.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' )
      },
    }
  }
</script>
