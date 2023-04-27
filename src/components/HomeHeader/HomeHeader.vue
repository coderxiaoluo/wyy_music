<template>
  <div class="home-header">
    <!-- 左边部分 -->
    <LogoInfos />
    <!-- 右边部分 -->
    <UserInfos />
    <!-- 扫码登录 -->
    <LoginQr />
  </div>
</template>
<script setup>
import UserInfos from "./c-cpn/UserInfos.vue";
import LogoInfos from "./c-cpn/LogoInfos.vue";
import LoginQr from "./c-cpn/LoginQr.vue";
</script>

<style lang="less" scoped>
.home-header {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}
</style>
