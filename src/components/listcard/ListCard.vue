<template>
  <div class="list-card">
    <ul>
      <template v-for="item in cardList" :key="item.id">
        <li @click="handleHighquaLityMusic(item)">
          <img v-if="item.coverImgUrl" :src="item.coverImgUrl" alt="" />
          <img v-else :src="item.picUrl" alt="" />

          <div class="icons">
            <el-icon><VideoPlay /></el-icon>
          </div>
          <p class="play">
            <el-icon><Headset /></el-icon>
            {{ formatePayCount(item?.playCount) }}
          </p>
          <el-text class="mx-1">{{ item.name }}</el-text>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { formatePayCount } from "@/utils/formatplay";

const props = defineProps({
  cardList: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

// 进入详情
const router = useRouter();
const handleHighquaLityMusic = (item) => {
  router.push({
    path: `/musicdetail/${item.id}`,
  });
};
</script>

<style lang="less" scoped>
.list-card {
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
        border-radius: 10px;
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
</style>
