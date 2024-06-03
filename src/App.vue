<template>
  <div class="app">
    <Sidebar />
    <router-view /> 
  </div>
</template>

<script setup>
  import Sidebar from './components/Sidebar.vue'
</script>

<style lang="scss">
:root {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root, #__next {
    isolation: isolate;
  }

  font-family: 'Roboto';
  font-weight: 400;

  color: #383838;
  background-color: #F5F5F5;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;
    //margin-left: calc(2rem + 32px);

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}

</style>