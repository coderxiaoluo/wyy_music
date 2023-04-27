<template>
  <div class="logo">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ArrowLeft, ArrowRight, Search } from "@element-plus/icons-vue";

// 搜索
const searchInp = ref("");
</script>

<style lang="less" scoped>
.logo {
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
</style>
