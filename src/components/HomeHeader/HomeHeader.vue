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
        <li>未登录</li>
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
  </div>
</template>
<script setup>
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Search,
  UserFilled,
  Message,
  Setting,
  Moon,
} from "@element-plus/icons-vue";
import { ref, toRefs, reactive } from "vue";

// 搜索
const searchInp = ref("");
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
</style>
