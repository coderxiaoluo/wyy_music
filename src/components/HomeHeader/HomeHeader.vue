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
import { storeToRefs } from "pinia";
import UserInfos from "./c-cpn/UserInfos.vue";
import LogoInfos from "./c-cpn/LogoInfos.vue";
import LoginQr from "./c-cpn/LoginQr.vue";
import { userLoginStore } from "@/stores/login/index";
import { useUserInfo } from "@/stores/user";
import local from "@/utils/local";

const loginStores = userLoginStore();
const { profile } = storeToRefs(loginStores);
console.log(profile);
const userInfoStore = useUserInfo();
userInfoStore.getUserDetailActions(profile.value?.userId);

if (!local.getLocalCache("cookie")) {
  loginStores.getLoginCodeQR();
}
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
