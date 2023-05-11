<template>
  <div class="app">
    <!-- 入场动画 -->
    <!-- animate__animated animate__lightSpeedInLeft -->
    <!-- 路由 -->
    <router-view></router-view>
    <BottomControl />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import BottomControl from "@/components/bottomcontrol/BottomControl.vue";

import WOW from "wow.js";
onMounted(() => {
  new WOW().init();
});

//
document.onselectstart = (e) => e.preventDefault();
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
