<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style lang='scss'>
@import "./assets/customize.scss";

// @import "./assets/reset.css";
#app {
  font-family: 'Noto Sans TC';
  font-weight: bold;
}

a {
  text-decoration: none;
}
</style>
