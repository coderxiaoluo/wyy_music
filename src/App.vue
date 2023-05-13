<template>
  <!--  @contextmenu.prevent="contextInfos" -->
  <div class="app" @contextmenu.prevent="contextInfos">
    <!-- animate__animated animate__lightSpeedInLeft -->
    <!-- 路由 -->
    <router-view></router-view>
    <!-- <BottomControl /> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import WOW from "wow.js";
onMounted(() => {
  new WOW().init();
});

//
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
