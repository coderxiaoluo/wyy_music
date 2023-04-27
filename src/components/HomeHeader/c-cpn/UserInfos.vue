<template>
  <div class="user-info">
    <div class="infos">
      <el-avatar v-if="userInfos" class="userFilled" :icon="UserFilled" />
      <img v-else class="avatarUrl" :src="userInfos.avatarUrl" alt="头像" />
    </div>
    <ul>
      <li v-if="userInfos" @click="handleLoginClick">未登录</li>
      <li v-else @click="handleLevelClick">{{ userInfos.nickname }}</li>
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
</template>

<script setup>
import { UserFilled, Message, Setting, Moon } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { userLoginStore } from "@/stores/login/index";

const loginStores = userLoginStore();
const { unikey, isShow, profile } = storeToRefs(loginStores);

// 扫码登录业务逻辑 4/27 +++++++++++++++++++++
const userInfos = reactive({
  ...profile.value,
});
console.log(userInfos);
// 扫码登录
const handleLoginClick = () => {
  loginStores.getCreateUserAction(unikey.value);
  loginStores.getQrloginActions();
  isShow.value = true;
};

const handleLevelClick = () => {
  loginStores.getUserLevelActions();
};
</script>

<style lang="less" scoped>
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
    margin-right: 10px;
    .userFilled {
      width: 100%;
      height: 100%;
    }

    .avatarUrl {
      width: 30px;
      display: inline-block;
      border-radius: 50%;
    }
  }
  //登录
  ul {
    display: flex;
    font-size: 12px;
    margin-right: 10px;
    li {
      display: flex;
      align-items: center;
    }
    li:nth-child(1) {
      position: relative;
      margin-left: 5px;
      margin-right: 30px;
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
</style>
