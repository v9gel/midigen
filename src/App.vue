<template>
  <div id="app">
    <GeneratorMidi></GeneratorMidi>
  </div>
</template>

<script>

import GeneratorMidi from "./components/GeneratorMidi";
export default {
  name: 'App',
  components: {
    GeneratorMidi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
