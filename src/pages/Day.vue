<template>
  <div>
    <main-layout>
      <h1>{{ title }}</h1>
      <div v-if="start">
        <div class="content" v-html="intro"></div>
      </div>
      <div v-if="read">
        <div class="content" v-html="reading"></div>
      </div>
      <router-link class="button" :to="path">Start</router-link>
      <router-link class="button" :to="path + 'read'">Read</router-link>
      <router-link class="button" :to="path + 'study'">Study</router-link>
      <router-link class="button" :to="path + 'read-again'">Read Again</router-link>
      <router-link class="button" :to="path + 'end'">End</router-link>
    </main-layout>
  </div>
</template>

<script>
  import MainLayout from '../components/MainLayout.vue'

  export default {
    data () {
      console.log('a')
      var dayId = parseInt(this.$route.params.id)
      var method = this.getMethod()
      return {
        title: '',
        intro: '',
        reading: '',
        id: dayId,
        path: '/days/' + dayId + '/',
        method: method
      }
    },

    watch: {
      '$route': function() {
        this.method = this.getMethod()
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

    computed: {
      start: function() { return this.method === '' },
      read: function() { return this.method === 'read' },
      study: function() { return this.method === 'study' },
      readAgain: function() { return this.method === 'read-again' },
      pray: function() { return this.method === 'pray' },
      end: function() { return this.method === 'end' },
    },

    methods: {
      getMethod: function() {
        var methodSupplied = this.$route.params.method
        var method = ''
        if ( methodSupplied ) {
          if ( methodSupplied === 'read' ) {
            method = methodSupplied
          } else if ( methodSupplied === 'study' ) {
            method = methodSupplied
          } else if ( methodSupplied === 'read-again' ) {
            method = methodSupplied
          } if ( methodSupplied === 'pray' ) {
            method = methodSupplied
          } else if ( methodSupplied === 'end' ) {
            method = methodSupplied
          }
        }
        return method
      },

      addData: function(response) {
        this.title = 'Day ' + response.day,
        this.intro = response.intro.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' ),
        this.reading = response.reading.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' )
      },
    }
  }
</script>
