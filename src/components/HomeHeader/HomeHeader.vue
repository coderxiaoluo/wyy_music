<template>
  <div class="home-header">
    <h1>
      <img src="@/assets/img/logo.png" alt="" />
    </h1>
    <div class="search">
      <div>
        <el-button class="btn" :icon="ArrowLeft" circle />
        <el-button class="btn" :icon="ArrowRight" circle />
      </div>
      <div class="input">
        <!-- input -->
        <el-row :gutter="20">
          <el-input
            v-model="searchInp"
            autocomplete="off"
            class="inp"
            placeholder=""
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </el-row>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="user-info">
      <div class="infos">
        <el-avatar class="userFilled" :icon="UserFilled" />
      </div>
      <ul>
        <li @click="handleLoginClick">未登录</li>
        <li>
          <el-icon><Moon /></el-icon>
        </li>
        <li>
          <el-icon><Setting /></el-icon>
        </li>
        <li>
          <el-icon><Message /></el-icon>
        </li>
      </ul>
    </div>

    <!-- 扫码登录 -->
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
      <div class="page2" v-show="!isPage">
        <div class="top">
          <img
            @click="handelImgePageClick"
            class="topimg"
            src="@/assets/img/qicon.png"
            alt=""
          />
          <p class="textlogin">扫码登录更安全</p>
        </div>
        <img class="loginimg" src="@/assets/img/test.jpg" alt="" />
        <div class="from">
          <el-form :model="shouFrom">
            <el-form-item label-width="30px">
              <el-input v-model="shouFrom.phone" placeholder="请输入手机号">
                <template #prefix>
                  <el-icon><Cellphone /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label-width="30px">
              <el-input
                v-model="shouFrom.password"
                show-password
                placeholder="请输入密码"
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="fromchecked">
            <el-checkbox
              v-model="checked1"
              label="自动登录"
              size="large"
              class="checkeds"
              text-color="#ec4141"
            />
            <p>
              <el-text class="mx-1" type="primary">忘记密码</el-text>
              <span class="span_">|</span>
              <el-text class="mx-1" type="primary">验证码登录</el-text>
            </p>
          </div>
        </div>
        <el-button class="buttons" type="primary" color="#ec4141" size="large"
          >登录</el-button
        >
        <div class="icons">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-QQ"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixin"></use>
          </svg>

          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shejiaotubiao-42"></use>
          </svg>
        </div>
        <svg @click="exitClick" class="btns" aria-hidden="true">
          <use class="use" xlink:href="#icon-cuowu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Cellphone,
  UserFilled,
  Search,
  Message,
  Setting,
  Lock,
  Moon,
} from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ref, toRefs, reactive } from "vue";
import { userLoginStore } from "@/stores/login/index";
import local from "@/utils/local";

const value = ref("");
const loginStores = userLoginStore();

// 搜索
const searchInp = ref("");

// 获取登录图片
const { qrimg, unikey, timers, isShow } = storeToRefs(loginStores);
loginStores.getLoginCodeQR();
// 扫码登录
const handleLoginClick = () => {
  loginStores.getCreateUserAction(unikey.value);
  loginStores.getQrloginActions();
  isShow.value = true;
};
// 退出登录
const exitClick = () => {
  clearInterval(timers.value);
  isShow.value = false;
};

// 切换手机登录
const isPage = ref(true);
const handleTelClick = () => {
  clearInterval(timers.value);
  isPage.value = !isPage.value;
};

const shouFrom = reactive({
  phone: "",
  password: "",
});
const checked1 = ref(false);

// 切换为扫码登录
const handelImgePageClick = () => {
  isPage.value = !isPage.value;
};
</script>

<style lang="less" scoped>
.home-header {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}

h1 {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  img {
    width: 140px;
    height: 35px;
  }
}
.search {
  display: flex;
  margin-left: 30px;
  flex: 1;

  .btn {
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    color: #fff;
    border-radius: 50%;
    font-size: 16px;
  }

  .input {
    margin: 0 20px;

    .inp {
      outline: none;
      width: 137px;
      border-radius: 30%;
      height: 30px !important;
      transform: scale(0.9);
      --el-fill-color-blank: #e13e3e;
      --el-border: none;
      --el-input-focus-border-color: none;
      --el-border-color: none;
      --el-border-color-hover: none;
      --el-text-color-regular: #fff;
    }
  }
}
.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 400px;
  text-align: right;

  // 头像
  .infos {
    height: 30px;
    width: 30px;
    .userFilled {
      width: 100%;
      height: 100%;
    }
  }
  //登录
  ul {
    display: flex;
    font-size: 12px;
    li {
      display: flex;
      align-items: center;
    }
    li:nth-child(1) {
      position: relative;
      margin-left: 5px;
      margin-right: 10px;
      color: #f8baba;
    }
    li:nth-child(1):hover {
      cursor: pointer;
    }
    li:nth-child(1)::after {
      position: absolute;
      bottom: 2px;
      right: -17px;
      content: "";
      width: 0px;
      height: 0px;
      border-top: 5px solid #f8baba;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-bottom: 5px solid transparent;
      display: inline-block;
    }
    .el-icon {
      font-size: 20px;
      margin-left: 20px;
    }
  }
}

.login-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 4px 4px 4px 4px #e7e5e5;
  width: 300px;
  height: 400px;
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
  color: #000;

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
    right: 2px;
    top: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #e3dede;

    use {
      color: #e3dede;
    }
  }
}

.page2 {
  position: relative;

  .top {
    position: absolute;
    left: 0;
    top: 0;

    display: flex;

    .topimg {
      position: absolute;
      left: -15px;
      top: -20px;
      width: 50px;
      transform: rotate(180deg);
      cursor: pointer;
    }
    .textlogin {
      margin-left: 20px;
      color: #fff;
      font-size: 12px;
      background-color: #373636;
      padding: 5px;
    }
  }
  .loginimg {
    width: 50px;
    margin-top: 40px;
  }
}
.from {
  margin-top: 20px;
}
.fromchecked {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px 0px 31px;

  .checkeds {
    color: #ec4141;
  }
  .mx-1 {
    color: #ec4141;
  }
  .span_ {
    display: inline-block;
    color: #ccc;
    margin: 0 5px;
  }
}

.buttons {
  margin-top: 20px;
  width: 220px;
}
.icons {
  margin-top: 20px;
  .icon {
    margin: 0 10px;
  }
}
</style>
