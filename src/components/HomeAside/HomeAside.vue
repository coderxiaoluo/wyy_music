<template>
  <div class="home-aside">
    <ul>
      <li>
        <el-icon class="icon"><Service /></el-icon>
        <span>发现音乐</span>
      </li>
      <li>
        <el-icon class="icon"><Service /></el-icon>
        <span>发现音乐</span>
      </li>
      <li>
        <el-icon class="icon"><Service /></el-icon>
        <span>发现音乐</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Service } from "@element-plus/icons-vue";
</script>

<style lang="less" scoped>
.home-aside {
  width: 100%;
  height: 100%;
}

ul {
  width: 100%;
  padding-top: 20px;

  li {
    height: 30px;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    line-height: 30px;
    margin: 20px 0;
    .icon {
      vertical-align: middle;
    }
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
  li:hover {
    cursor: pointer;
  }
}
</style>
