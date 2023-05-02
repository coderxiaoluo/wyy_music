<template>
  <div class="navBar">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <template v-for="item in tabbar" :key="item.id">
        <el-tab-pane :label="item.value" :name="item.name">
          <router-view></router-view>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { tabbar } from "@/assets/data/tabbar";
import { useMusicListStore } from "@/stores/musiclist";

const activeName = ref("recommend");

const router = useRouter();
// 切换路由
const handleClick = (active) => {
  router.push({
    path: active.props.name,
  });
};
// 发送请求
const musiclistStore = useMusicListStore();
musiclistStore.getHotPlayListDataAction();
musiclistStore.getCatListDataAction();
// musiclistStore.getHighquaLityDataAction();
musiclistStore.getTopPLayListOrder();
</script>

<style lang="less" scoped>
.demo-tabs {
  --el-color-primary: var(--background-color);
}
:deep(.el-tabs__nav-wrap::after) {
  height: 0 !important;
}
</style>
