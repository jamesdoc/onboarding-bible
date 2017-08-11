<template>
  <div>
    <header>
      <h1><nuxt-link :to="dayLink('read')">Day {{ day }}</nuxt-link></h1>
    </header>

    <section class="day wrap">

      <overlay :content="reading.intro" :header="reading.title" :path="path" button="Get Started" next="read" method="setView" v-if="!view" />

      <overlay v-if="anchor" :content="anchor.text" :header="anchor.title" :path="path" method="setAnchor" next="study" />
      
      <main class="day__content">

        <div :class="viewClass" v-if="['', 'read', 'study', 'read-again'].indexOf(view) !== -1" v-html="reading.reading.text"></div>

        <questions v-if="view === 'questions'" :day="day" :question="reading.question"></questions>
        
        <div v-if="view === 'pray'">
          <small class="info">At the end of each session we end with a prayer. Pray this prayer now based on John 1:</small>
          <blockquote v-html="reading.pray"></blockquote>
        </div>
        
        <div v-if="view === 'outro'" class="vertical-center vertical-center--heading">
          <div class="center" v-html="reading.outro"></div>
          <nuxt-link class="button" to="/">Home</nuxt-link>
        </div>
        
        <nuxt-link class="button" v-if="nextStage" :to="dayLink(nextStage[0])">{{ nextStage[1] }}</nuxt-link>

        <span class="day__content-cover"></span>
      
      </main>

    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import overlay from '../../components/Overlay'
  import questions from '../../components/Questions'

  export default {
    data () {
      const day = this.$route.params.day
      return {
        day,
        path: `/days/${day}`,
        reading: this.$store.state.currentDay
      }
    },
    computed: {
      anchor () {
        return this.$store.getters.currentAnchor
      },
      view () {
        return this.$store.state.view
      },
      answers () {
        return this.$store.state.answers
      },
      viewClass () {
        return 'reading reading--' + this.view
      },
      nextStage () {
        const pages = {
          '': ['study', 'Next'],
          'read': ['study', 'Next'],
          'study': ['read-again', 'Read Again'],
          'read-again': ['questions', 'Next'],
          'questions': ['pray', 'Next'],
          'pray': ['outro', 'Amen']
        }
        return pages[this.view]
      }
    },
    mounted () {
      this.$store.commit('setView', this.$route.query.v || '')
      if (this.view === 'read') {
        this.$store.commit('hideIntro')
      }

      this.$store.dispatch('getAnswers', this.day)

      if (this.view === 'outro') {
        this.$store.dispatch('setCompletion', this.day)
      }

      window.addEventListener('hashchange', this.hashChange)
      this.hashChange()
    },
    components: {
      overlay,
      questions
    },
    validate ({ params, query }) {
      return /^\d+$/.test(params.day) && (!query.v || ['read', 'study', 'read-again', 'questions', 'pray', 'outro'].indexOf(query.v) !== -1)
    },
    async fetch ({ store, params }) {
      let { data } = await axios.get(`http://localhost:3000/data/day${params.day}.json`)
      store.commit('setDayReading', data)
    },
    methods: {
      hashChange () {
        const anchor = this.$route.hash.replace('#', '')
        this.$store.commit('setAnchor', anchor)
      },
      dayLink (view) {
        return this.path + (view ? '?v=' + view : '')
      }
    }
  }
</script>


<style lang="scss">

  .day {
    &__content {
      position: relative;

      &-cover {
        position: absolute;
        height: 100%;
        width: 100%;
        position: fixed;
        background: #000;
        opacity: 0;
        visibility: hidden;
        transition: 300ms all;
        left: 0;
        top: 0;

        .overlay ~ .day__content & {
          opacity: 0.7;
          visibility: visible;
        }
      }
    }
  }

  .reading {
    line-height: 40px;
    font-size: 18px;

    a {
      text-decoration: none;
      color: inherit;
      pointer-events: none;
    }

    &--study a {
      border-radius: 8px;
      background: rgba(#B8E986, 0.46);
      pointer-events: auto;
    }

    @media screen and (min-width: 40em) {
      line-height: 66px;
      font-size: 25px;
    }
  }

</style>
