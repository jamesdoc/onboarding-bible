<template>
  <section>
    <div class="wrap">
      <ul class="days">
        <li v-for="day in $store.state.days">
          <nuxt-link :to="'/days/' + day.day">Day {{ day.day }}</nuxt-link>
          <span class="complete" v-if="day.complete"></span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    async fetch ({ store, params }) {
      let { data } = await axios.get(`http://localhost:3000/data/days.json`)
      store.commit('setDays', data)
    },
    mounted () {
      this.$store.dispatch('getCompletion')
    }
  }
</script>

<style lang="scss">
  .days {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    li {
      background: #E8E8E8;
      flex: 1 1 200px;
      border: 1px solid #FFF;
      position: relative;

      a {
        display: block;
        padding: 15px 15px 40px;
        text-decoration: none;
      }

      .complete {
        width: 7px;
        height: 15px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-bottom: 3px solid rgba(#9bbd78, 1);
        border-right: 3px solid rgba(#9bbd78, 1);
        transform: rotate(45deg);
      }
    }
  }
</style>
