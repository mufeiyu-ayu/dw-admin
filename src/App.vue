<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import Layout from "./views/Layout.vue";
export default {
  name: "App",
  // components: { Layout },
};
</script>
<style lang="scss">
body {
  background-color: #f7f7f7;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
