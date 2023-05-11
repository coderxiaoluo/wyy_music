<template>
  <div class="logo">
    <h1>
      <svg class="icon h1icon" aria-hidden="true">
        <use xlink:href="#icon-music"></use>
      </svg>
      <img src="@/assets/img/logo.png" alt="" />
    </h1>
    <div class="search">
      <div>
        <el-button
          class="btn"
          :icon="ArrowLeft"
          circle
          @click="onLeftBackClick"
        />
        <el-button
          class="btn"
          :icon="ArrowRight"
          circle
          @click="onRightBackClick"
        />
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
import { useRouter } from "vue-router";

// 搜索
const searchInp = ref("");

// 路由跳转
const router = useRouter();
const onLeftBackClick = () => {
  router.back();
  // location.reload();
};
const onRightBackClick = () => {
  router.forward();
  // location.reload();
};
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
  position: relative;
  left: 0;
  height: 100%;
  width: 150px;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  img {
    width: 140px;
    height: 35px;
  }
  .h1icon {
    position: absolute;
    left: -6px;
    top: 10px;
  }
}
.search {
  display: flex;
  margin-left: 30px;
  flex: 1;

  .btn {
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    color: var(--color-white-primary);
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
