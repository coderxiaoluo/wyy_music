<template>
  <div class="login-box" v-if="isShow">
    <div class="page1" v-show="isPage">
      <h3 class="text">扫码登录</h3>
      <img :src="qrimg.qrimg" alt="登录" />
      <p>使用 <span class="wyytext">网易云音乐APP</span> 扫码登录</p>
      <p class="bottomtext" @click="handleTelClick">选择其它登录模式&gt;</p>
      <svg @click="exitClick" class="btns" aria-hidden="true">
        <use xlink:href="#icon-cuowu"></use>
      </svg>
    </div>
    <PhoneLogin />
  </div>
</template>

<script setup>
import PhoneLogin from "./childeren/PhoneLogin.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { userLoginStore } from "@/stores/login/index";

const loginStores = userLoginStore();

// 获取登录图片
const { qrimg, timers, isShow, isPage } = storeToRefs(loginStores);

// 切换手机登录
const handleTelClick = () => {
  clearInterval(timers.value);
  isPage.value = !isPage.value;
};
// 退出登录
const exitClick = () => {
  clearInterval(timers.value);
  isShow.value = false;
};
</script>

<style lang="less" scoped>
.login-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 4px 4px 4px 4px #e7e5e5;
  width: 300px;
  height: 400px;
  background-color: var(--color-white-primary);
  padding: 20px;
  text-align: center;
  color: var(--color-black-primary);

  .text {
    text-align: center;
    font-size: 30px;
    margin: 30px 0;
  }
  img {
    text-align: center;
    margin-left: -4px;
  }
  .wyytext {
    color: rgb(21, 93, 209);
  }
  .bottomtext {
    font-size: 12px;
    margin-top: 80px;
    cursor: pointer;
  }
  .btns {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 12px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #e3dede;

    use {
      color: #e3dede;
    }
  }
}
</style>
