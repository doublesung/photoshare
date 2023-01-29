<template>
  <div id="app">
    <Navbar/>
    <router-view class="min-vh-100"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style lang='scss'>
@import "./assets/customize.scss";

#app {
  font-family: 'Noto Sans TC';
  font-weight: bold;
}

a {
  text-decoration: none;
  color: $primary;
}


ul {
  padding: 0;
  
  li {
    list-style-type: none;
  }
}

button {
  background-color: #FFF;
  transition: .3s ease;

  &:hover {
    background-color: #efefef;
  }
}

.svg-icon {
  fill: #6e6d7a;
}

</style>
