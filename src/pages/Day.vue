<template>
  <div>
    <main-layout class="main-content" v-bind:class="{ introshowing: start }">
      
      <h1><router-link :to="path + 'read'">{{ title }}</router-link></h1>
      
      <div v-if="start" class="overlay">
        <router-link class="close" :to="path + 'read'"></router-link>
        <div class="content wrap" v-html="intro"></div>
      </div>
      
      <div class="content content--reading wrap wrap--top" v-if="start || read" v-html="reading"></div>

      <div class="content content--reading content--study wrap wrap--top" v-if="study" v-html="reading"></div>

      <router-link class="button button--short" v-if="read" :to="path + 'study'">Next</router-link>
      <router-link class="button button--short" v-if="study" :to="path + 'read-again'">Read Again</router-link>
      <router-link class="button button--short" v-if="readAgain" :to="path + 'end'">End</router-link>
      
    </main-layout>
  </div>
</template>

<script>
  import MainLayout from '../components/MainLayout.vue'

  export default {
    data () {
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
        window.scrollTo(0, 0)
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
          console.error(error)
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
        if ( methodSupplied && ['read', 'study', 'read-again', 'pray', 'end'].includes(methodSupplied) ) {
          return methodSupplied
        }

        return ''
      },

      addData: function(response) {
        this.title = 'Day ' + response.day
        this.intro = this.parse(response.intro)
        this.reading = this.parse(response.reading.text)
        this.anchors = response.reading.anchors

        Object.keys(this.anchors).map(x => {
          this.reading = this.reading.replace(`href="#${x}"`, `href="#${x}" @click="{{ anchor(${x}) }}"`)
        })
      },

      parse: function(content) {
        return content.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' )
      },

      anchor: function(event) {
        console.log('a', event)
      }
    }
  }
</script>
