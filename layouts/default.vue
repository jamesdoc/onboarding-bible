<template>
  <div>
    <nuxt/>
  </div>
</template>

<style lang="scss">

body {
  -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
  background: #FFF;
  font: 500 18px /1.444 "brandon-grotesque", sans-serif;
  letter-spacing: 2.15px;
  padding: 0;
  margin: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.wrap {
  padding: 1.625rem;
  max-width: 600px;
  margin: 0 auto;

  &--top {
    padding-top: 3.75rem;
  }
}

.button {
  text-decoration: none;
  color: #FFF;
  background: #777;
  padding: 10px 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3.89px;
  margin: 0 auto;
  width: 100%;
  display: inline-block;
  margin: 1rem auto;
  cursor: pointer;
  border: none;
  font: 700 20px 'brandon-grotesque', sans-serif;

  &--short {
    margin-bottom: 0;
  }
}

.center {
  text-align: center;
}

.home {
  font-size: 25px;
}

.logo {
  margin: 0 auto 1rem;
}

h1 {
  background: #777;
  padding: 0.5rem 1.625rem;
  color: #FFF;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  z-index: 10;
  font-size: 25px;

  a {
    text-decoration: none;
  }
}

a {
  color: inherit;
}

p,
h2,
h3,
h4 {
  margin: 0 0 1rem;
}

h4 {
  font-size: 1em;
  font-weight: 700;
}

.info {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #868686;
  margin-bottom: 20px;
}

ul,
ol {
  margin: 0;
  list-style: none;
  padding: 0;
}

blockquote {
  font-style: italic;
}

.vertical-center {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  &--heading {
    min-height: calc(100vh - 100px);
  }
}

</style>
