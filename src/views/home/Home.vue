<template>
  <div class="home">
    <el-container v-show="!isRecordPage" class="home-container">
      <el-header class="header">
        <!-- HomeHeader 头部组件 -->
        <HomeHeader></HomeHeader>
      </el-header>
      <el-container>
        <!-- Aside 侧边栏组件 -->
        <el-aside class="aside" width="220"> <HomeAside /></el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <!-- 底部 -->
    <BottomControl />
    <!-- 唱片 -->
    <el-drawer
      class="drawer"
      v-model="drawer"
      direction="btt"
      :show-close="false"
      :with-header="false"
      size="100%"
      :z-index="76"
    >
      <Record v-show="true" />
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Record from "../record/Record.vue";
import { storeToRefs } from "pinia";
import HomeHeader from "@/components/HomeHeader/HomeHeader.vue";
import HomeAside from "@/components/HomeAside/HomeAside.vue";
import BottomControl from "@/components/bottomcontrol/BottomControl.vue";
import { useRecommendStore } from "@/stores/recommend";
import { useUserMusicStore } from "@/stores/usermusic";
import { useMusicListStore } from "@/stores/musiclist";
import { useRecordStore } from "@/stores/record";
import { userLoginStore } from "@/stores/login";

const musiclistStore = useMusicListStore();
musiclistStore.getHotPlayListDataAction();

const recommendStore = useRecommendStore();
// 轮播图
recommendStore.getBannerDataAction();
// 推荐歌单
recommendStore.getRelatedDataListAction();
const loginStore = userLoginStore();

const { account } = storeToRefs(loginStore);
// 获取创建歌单列表 和 收藏歌单列表
const userMusicStore = useUserMusicStore();
userMusicStore.userPlaylistAction(account.value.id);

// 唱片
const recordStore = useRecordStore();
// 是否展示唱片页面的变量
const { isRecordPage } = storeToRefs(recordStore);
const drawer = ref(isRecordPage);
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

.aside {
  height: 100%;
  background-color: var(--color-white-primary);
  overflow-y: scroll;
}

:deep(.drawer) {
  --el-drawer-padding-primary: 0 !important;
}
:deep(.el-drawer__body) {
  --el-drawer-padding-primary: 0 !important;
}
</style>
