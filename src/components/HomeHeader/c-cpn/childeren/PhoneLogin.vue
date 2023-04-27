<template>
  <div class="phone-login">
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
</template>

<script setup>
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { Cellphone, Lock } from "@element-plus/icons-vue";
import { userLoginStore } from "@/stores/login/index";

const loginStores = userLoginStore();
const { isPage } = storeToRefs(loginStores);

const shouFrom = reactive({
  phone: "",
  password: "",
});
// 切换为扫码登录
const handelImgePageClick = () => {
  isPage.value = !isPage.value;
};

const checked1 = ref(false);
</script>

<style lang="less" scoped>
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
</style>
