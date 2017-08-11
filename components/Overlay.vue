<template>
  <aside class="overlay">
    <div class="wrap">
      <header class="overlay__header">
        <div v-html="header"></div>
        <button type="button" class="close" @click="hide">Close</button>
      </header>
      <div class="content">
        <div v-html="content"></div>
        <button v-if="button" type="button" class="button" @click="hide">{{ button }}</button>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    props: ['content', 'header', 'path', 'next', 'button', 'method'],
    methods: {
      hide () {
        this.$store.commit(this.method, this.next)
        history.pushState(null, null, this.path + '?v=' + this.next)
      }
    }
  }
</script>

<style lang="scss">
  
  .overlay {
    position: fixed;
    width: 100%;
    height: auto;
    left: 0;
    bottom: 0;
    background: #D8D8D8;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    z-index: 10;
    max-height: calc(100vh - 120px);

    &__header {
      min-height: 30px;
      margin-bottom: 20px;
      font-weight: 500;
      line-height: 1;

      h4 {
        margin-bottom: 0;
        font-size: 18px;
        font-style: italic;
      }

      small {
        font-size: 10px;
      }
    }

    .content {
      overflow: auto;
      max-height: calc(100vh - 210px);
    }

    h4 {
      padding-right: 40px;
    }

    @media screen and (min-width: 48em) {
      transform: translate3d(-50%, -50%, 0);
      bottom: auto;
      right: auto;
      left: 50%;
      top: 50%;
      max-width: 700px;

      &__header {
        small {
          font-size: 12px;
        }
      }
    }
  }

  .close {
    width: 25px;
    height: 25px;
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
    outline: none;
    border: none;
    text-indent: 200%;
    overflow: hidden;
    position: absolute;
    right: 1.625rem;
    top: 1.625rem;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: #333;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0) rotate(45deg);
    }


    &:after {
      height: 24px;
      width: 2px;
    }
  }

</style>
