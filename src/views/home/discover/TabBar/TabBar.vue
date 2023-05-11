<template>
  <div class="navBar">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <template v-for="item in tabbar" :key="item.id">
        <el-tab-pane :label="item.value" :name="item.name"> </el-tab-pane>
      </template>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tabbar } from "@/assets/data/tabbar";
import { useMusicListStore } from "@/stores/musiclist";
import { useTopListStore } from "@/stores/toplist";
import local from "@/utils/local";

const router = useRouter();
const route = useRoute();

// 处理tabbar业务逻辑
const activeName = ref(local.getLocalCache("routerActiveName") ?? "recommend");
const handleClick = (v) => {
  local.setLocalCache("routerActiveName", v.props.name);
  const localActiveName = local.getLocalCache("routerActiveName");
  activeName.value = localActiveName;
  router.push(localActiveName);
};
watch(route, (newvalue) => {
  local.setLocalCache(
    "routerActiveName",
    newvalue.path.split("/")[newvalue.path.split("/").length - 1]
  );
  activeName.value = local.getLocalCache("routerActiveName");
});

// 发送请求
const musiclistStore = useMusicListStore();
musiclistStore.getHotPlayListDataAction();
musiclistStore.getCatListDataAction();

//排行榜
const topListStore = useTopListStore();
topListStore.topRankingListAction();
topListStore.artistListAction();
</script>

<style lang="less" scoped>
.demo-tabs {
  --el-color-primary: var(--background-color);
}
:deep(.el-tabs__nav-wrap::after) {
  height: 0 !important;
}
</style>
