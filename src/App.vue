<template>
  <div class="app" @contextmenu.prevent="contextInfos">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import WOW from "wow.js";
onMounted(() => {
  new WOW().init();
});

document.onselectstart = (e) => e.preventDefault();

const contextInfos = () => {
  console.log(1);
};
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
