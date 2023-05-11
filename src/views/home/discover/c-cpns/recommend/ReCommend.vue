<template>
  <div class="recommend w">
    <!-- 轮播图 -->
    <div class="swiper area">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in banners" :key="item.encodeId">
          <img class="bannerImg" :src="item.imageUrl" :alt="item.typeTitle" />
          <p class="text" :style="{ backgroundColor: item.titleColor }">
            {{ item.typeTitle }}
          </p>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单  -->
    <div class="song-list area">
      <!-- 标题 -->
      <div class="title">
        <h3 class="songh3">推荐歌单</h3>
        <el-icon><ArrowRight /></el-icon>
      </div>
      <!-- 列表展示 -->
      <ListCard :cardList="songList" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRecommendStore } from "@/stores/recommend";
import { ArrowRight } from "@element-plus/icons-vue";
import ListCard from "@/components/ListCard/ListCard.vue";
const recommendStore = useRecommendStore();
const { banners, songList } = storeToRefs(recommendStore);
</script>

<style lang="less" scoped>
.el-carousel__item {
  border-radius: 10px;

  // 轮播图
  .bannerImg {
    width: 100%;
    height: 100%;
  }
  .text {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #ffffff;
    border-radius: 10px 0 0 0;
    padding: 4px;
    font-size: 12px;
  }
}
// 推荐歌单

.song-list {
  // 标题
  .title {
    display: flex;
    align-items: center;

    .songh3 {
      font-size: 25px;
      font-weight: 800;
    }

    .el-icon {
      font-size: 20px;
    }
  }
}
</style>
