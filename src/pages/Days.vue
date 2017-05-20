<template>
  <div>
    <main-layout>
      <h1>{{ title}}</h1>
      <div class="days">
        <article v-for="day in days">
          <router-link :to="day.path">Day {{ day.id }}</router-link>
        </article>
      </div>
    </main-layout>
  </div>
</template>

<script>
  import MainLayout from '../components/MainLayout.vue'

  export default {
    data () {
      var days = []
      for (var i = 1; i <= 30; i++) {
        days.push({
          id: i,
          path: '/days/' + i
        })
      }

      return {
        title: 'All the days',
        days: days
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
      MainLayout
    }
  }
</script>
