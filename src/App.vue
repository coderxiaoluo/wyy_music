<template>
  <div class="app animate__animated animate__lightSpeedInLeft">
    <!-- 路由 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import WOW from "wow.js";
onMounted(() => {
  new WOW().init();
});
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
