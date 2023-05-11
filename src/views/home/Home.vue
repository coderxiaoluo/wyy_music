<template>
  <div class="home">
    <el-container class="home-container">
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeHeader from "@/components/HomeHeader/HomeHeader.vue";
import HomeAside from "../../components/HomeAside/HomeAside.vue";

import { useRecommendStore } from "@/stores/recommend";
import { useUserMusicStore } from "@/stores/usermusic";

import { useMusicListStore } from "@/stores/musiclist";
const musiclistStore = useMusicListStore();
musiclistStore.getHotPlayListDataAction();

const recommendStore = useRecommendStore();
// 轮播图
recommendStore.getBannerDataAction();
// 推荐歌单
recommendStore.getRelatedDataListAction();

// 获取创建歌单列表 和 收藏歌单列表
const userMusicStore = useUserMusicStore();
userMusicStore.userPlaylistAction();
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
</style>
