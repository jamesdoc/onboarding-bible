<template>
  <div>
    <small class="info">These questions are to help you think through the passage. Your answers are only kept on your device. You may want to try writing your answers in a journal.</small>
    <ul class="questions">
      <li class="question">{{ question }}</li>
      <li v-for="answer in $store.state.answers" class="answer">{{ answer }} <button type="button" @click="deleteAnswer(answer)">&cross;</button></li>
    </ul>
    <form class="question-form" @submit="sendAnswers">
      <input type="text" autofocus id="answers" required autocomplete="off" />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['question', 'day'],
    methods: {
      sendAnswers (event) {
        event.preventDefault()
        this.$store.dispatch({
          type: 'setAnswers',
          day: this.day,
          answers: event.target.answers.value || ''
        })
        event.target.answers.value = ''
      },
      deleteAnswer (answer) {
        this.$store.dispatch({
          type: 'deleteAnswer',
          day: this.day,
          answer: answer
        })
      }
    }
  }
</script>

<style lang="scss">

  .questions {
    li {
      position: relative;
      border: 1px solid #979797;
      background: #D8D8D8;
      margin: 0 0 15px 15px;
      padding: 15px;
      font-size: 12px;

      &:before,
      &:after {
        content: '';
        position: absolute;
        right: 100%;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 13px 22px 0;
      }

      &:before {
        border-color: transparent #979797 transparent transparent;
        top: -1px;
      }

      &:after {
        border-color: transparent #D8D8D8 transparent transparent;
        margin: 0 -2px 0 0;
        top: 0;
      }

      &.answer {
        background: #8E8E8E;
        margin: 0 15px 15px 0;

        &:before,
        &:after {
          transform: scaleX(-1);
          right: auto;
          left: 100%;
        }

        &:after {
          border-color: transparent #8E8E8E transparent transparent;
          margin: 0 0 0 -2px;
        }

        button {
          background: none;
          outline: none;
          border: none;
          padding: 0;
          position: absolute;
          top: -3px;
          right: -7px;
          margin: 0;
          color: #333;
          z-index: 1;
        }
      }
    }
  }


  .question-form {
    position: relative;

    input {
      border: 1px solid #979797;
      padding: 10px 60px 10px 10px;
      font: inherit;
      width: 100%;
      outline: none;
    }

    button {
      position: absolute;
      right: 1px;
      top: 1px;
      border: none;
      background: rgba(#B8E986, 0.46);
      font: inherit;
      padding: 10px;
    }
  }

</style>
