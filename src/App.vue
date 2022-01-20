<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-family: "$font-hei";
  color: #333;
  font-size: 16px;
  background-color: #f5f5f5;
}
#app {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 1px 2px 5px 4px rgba(0, 0, 0, 0.2);
}
</style>
