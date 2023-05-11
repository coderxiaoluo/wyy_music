<template>
  <div class="home-aside">
    <el-menu default-active="1" class="el-menu-vertical-demo menu">
      <template v-for="item in asideList" :key="item.id">
        <el-menu-item
          class="menu-item"
          @click="handlePageClick(item)"
          :index="String(item.id)"
        >
          <svg class="icon icon-xihuan" aria-hidden="true">
            <use v-bind:xlink:href="item.icon"></use>
          </svg>
          <template #title>{{ item.value }}</template>
        </el-menu-item>
      </template>
      <!-- 登录后展示 -->
      <el-sub-menu index="3">
        <template #title>
          <svg class="icon icon-xihuan" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use>
          </svg>
          <span>创建的歌单</span>
        </template>
        <el-menu-item-group>
          <!-- <template #title><span>Group One</span></template> -->
          <template v-for="(item, index) in createdList">
            <el-menu-item
              @click="selectPageClick(item)"
              class="item-text"
              index="3-1"
              v-if="item.creator.djStatus == 10"
              ><el-text truncated>{{
                index == 0 ? (item.name = "我喜欢的音乐") : item.name
              }}</el-text></el-menu-item
            >
          </template>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <svg class="icon icon-xihuan" aria-hidden="true">
            <use xlink:href="#icon-shoucangdaogedan"></use>
          </svg>
          <span>收藏的歌单</span>
        </template>
        <el-menu-item-group>
          <!-- <template #title><span>Group One</span></template> -->
          <template v-for="item in createdList">
            <el-menu-item
              @click="selectPageClick(item)"
              index="4-1"
              v-if="item.creator.djStatus == 0"
              ><el-text truncated>{{ item.name }}</el-text></el-menu-item
            >
          </template>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { asideList } from "@/assets/data/aside";
import { useUserMusicStore } from "@/stores/usermusic";
import { storeToRefs } from "pinia";
import { useMusicDetailStore } from "@/stores/musicdetail";

const userMusicStore = useUserMusicStore();
// cratedList:获取创建歌单和收藏歌单
const { createdList } = storeToRefs(userMusicStore);

const router = useRouter();
const handlePageClick = (v) => {
  router.push({
    path: v.path,
  });
};

const musicDetailStore = useMusicDetailStore();

const selectPageClick = (v) => {
  router.push({
    path: `/musicdetail/${v.id}`,
  });
  // 在发送一次请求,不然不会更新数据
  musicDetailStore.getDetailsDataListAllAction(v.id);
  musicDetailStore.getTrackAllDataAction(v.id, v.trackCount);
  // 发送评论请求 全部
  musicDetailStore.getCommentIdAction(v.id);
  // 获取歌单所有的收藏的人
  musicDetailStore.getSubscribesAllAction(v.id);
};
</script>

<style lang="less" scoped>
// 展开折叠
.isFold {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: skyblue;
}
.menu {
  height: 100%;
  width: 220px;
  --el-menu-active-color: var(--color-black-primary);
  --el-menu-bg-color: var(--color-white-primary);
  // 选中时候的文本颜色
  --el-menu-active-color: var(--color-black-primary);
  // --el-menu-active-color: #dd4d51;
}
.icon-xihuan {
  width: 30px;
}
</style>
