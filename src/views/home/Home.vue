<template>
  <div class="home">
    <el-container class="home-container">
      <el-header class="header">
        <!-- HomeHeader 头部组件 -->
        <HomeHeader></HomeHeader>
      </el-header>
      <el-container>
        <el-aside width="160px">
          <!-- Aside 侧边栏组件 -->
          <HomeAside></HomeAside>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import HomeHeader from "@/components/HomeHeader/HomeHeader.vue";
import HomeAside from "../../components/HomeAside/HomeAside.vue";
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
}
.home-container {
  height: 100%;
}
.header {
  height: 60px;
  background-color: var(--background-color);
  color: #fff;
}
</style>
