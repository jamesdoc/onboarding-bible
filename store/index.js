import Vuex from 'vuex'
import idbKeyval from 'idb-keyval'

const store = () => new Vuex.Store({
  state: {
    currentDay: null,
    anchor: null,
    days: [],
    intro: true,
    view: 'intro',
    answers: []
  },
  mutations: {
    setDayReading (state, reading) {
      state.currentDay = reading
    },
    setAnchor (state, anchor) {
      state.anchor = anchor
    },
    hideIntro (state) {
      state.intro = false
    },
    setView (state, view) {
      state.view = view
    },
    addAnswers (state, answers) {
      state.answers = answers
    },
    setDays (state, days) {
      state.days = days
    },
    addCompletion (state, completion) {
      if (state.days.length > 0) {
        state.days.forEach((day) => {
          day.complete = completion.indexOf(day.day + '') !== -1
        })
      }
    }
  },
  getters: {
    currentAnchor: state => {
      if (!state.currentDay || !state.anchor) return ''
      if (state.currentDay.reading.anchors[state.anchor] === undefined) return ''
      return state.currentDay.reading.anchors[state.anchor]
    }
  },
  actions: {
    async getAnswers (context, day) {
      const answersFromDb = await idbKeyval.get(`day${day}`)
      context.commit('addAnswers', answersFromDb ? JSON.parse(answersFromDb) : [])
    },
    async setAnswers (context, { answers, day }) {
      const newAnswers = [...context.state.answers, answers]
      await idbKeyval.set(`day${day}`, JSON.stringify(newAnswers))
      context.commit('addAnswers', newAnswers)
    },
    async deleteAnswer (context, { answer, day }) {
      const oldAnswers = [...context.state.answers]
      oldAnswers.splice(oldAnswers.indexOf(answer), 1)
      await idbKeyval.set(`day${day}`, JSON.stringify(oldAnswers))
      context.commit('addAnswers', oldAnswers)
    },
    async getCompletion (context) {
      const completionFromDb = await idbKeyval.get('days')
      context.commit('addCompletion', completionFromDb ? JSON.parse(completionFromDb) : [])
    },
    async setCompletion (context, day) {
      const completionFromDb = await idbKeyval.get('days')
      const complete = completionFromDb ? JSON.parse(completionFromDb) : []
      if (complete.indexOf(day) === -1) {
        complete.push(day)
        await idbKeyval.set('days', JSON.stringify(complete))
      }
    }
  }
})

export default store
