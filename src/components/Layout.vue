<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// .nav-wrapper {
//   border: 1px solid green;
// }
.content {
  height: 100vh;
  overflow: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
}
</style>