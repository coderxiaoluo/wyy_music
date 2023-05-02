<template>
  <div class="home-aside">
    <ul>
      <template v-for="item in asideList" :key="item.id">
        <li @click="handlePageClick(item)">
          <el-icon class="icon">
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.value }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { asideList } from "@/assets/data/aside";

const router = useRouter();
const handlePageClick = (v) => {
  router.push({
    path: v.path,
  });
};
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
