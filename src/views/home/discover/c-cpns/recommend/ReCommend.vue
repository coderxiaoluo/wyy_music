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
      <div class="list">
        <ul>
          <li v-for="item in songList">
            <img :src="item.picUrl" alt="" />
            <div class="icons">
              <el-icon><VideoPlay /></el-icon>
            </div>
            <p class="play">
              <el-icon><Headset /></el-icon>
              {{ formatePayCount(item.playCount) }}
            </p>
            <el-text class="mx-1">{{ item.name }}</el-text>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRecommendStore } from "@/stores/recommend";
import { ArrowRight } from "@element-plus/icons-vue";
import { formatePayCount } from "@/utils/formatplay";
import { Headset, VideoPlay } from "@element-plus/icons-vue";
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

  // 列表
  .list {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        position: relative;
        width: 200px;
        height: 250px;
        margin: 20px 0;
        border-radius: 10px;
        border: 1px solid transparent;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 200px;
          margin-bottom: 10px;
        }
        .el-text {
          font-size: 14px;
          padding: 5px 0;
          color: var(--color-black-primary);
        }
        .play {
          position: absolute;
          right: 5px;
          top: 5px;
          color: #ffffff;
          font-size: 12px;
        }
        .icons {
          position: absolute;
          opacity: 0;
          right: 7px;
          bottom: 50px;
          font-size: 30px;
          color: var(--background-color);
          transition: opacity 0.3s linear 0s;
        }
        .icons:hover {
          opacity: 1;
        }
        img:hover + .icons {
          opacity: 1;
        }
      }
    }
  }
}
</style>
