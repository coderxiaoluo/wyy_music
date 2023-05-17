<template>
  <div class="music-detail">
    <!-- 歌曲 -->
    <div class="listInfo" v-if="playlist">
      <!-- 左边图片 -->
      <div class="listAvatar">
        <img :src="playlist?.coverImgUrl" alt="" />
      </div>
      <!-- 右边内容 -->
      <div class="right-box">
        <!-- 标题 -->
        <div class="title">
          <div class="titleTag">歌单</div>
          <div class="titleContent">{{ playlist.name }}</div>
        </div>
        <!-- 作者信息 /创建时间 -->
        <div class="user">
          <div class="userAvatar">
            <img :src="playlist.creator.avatarUrl" alt="" />
            <div class="userName">{{ playlist.creator.nickname }}</div>
          </div>
          <div class="createTime">
            {{ formatMonthDay(playlist.createTime, "YYYY-MM-DD") }}创建
          </div>
        </div>
        <!-- 三个按钮 -->
        <div class="buttons">
          <el-button
            @click="onplayClick"
            class="button1"
            type="primary"
            :icon="Search"
            >播放全部</el-button
          >
          <el-button class="button2" type="primary" :icon="CirclePlus"
            >收藏</el-button
          >
          <el-button class="button3" type="primary" :icon="Share"
            >分享</el-button
          >
        </div>
        <!-- 标签 -->
        <div class="tags">
          <span class="tags-item">标签:</span>
          <template v-for="(item, index) in playlist.tags">
            <span class="item"> {{ item }}</span>
            <span class="item_" v-if="index != 2">/</span>
          </template>
        </div>
        <!-- 歌曲 -->
        <div class="otherInfo">
          <div class="music-count">歌曲: {{ playlist.trackCount }}</div>
          <div class="play-count">
            播放: {{ formatePayCount(playlist.playCount) }}
          </div>
        </div>
        <!-- 简介 -->
        <div class="desc">
          <p>简介:{{ playlist.description }}</p>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="music-list" v-if="playlist">
      <el-tabs
        @tab-click="handleChangeClick"
        v-model="activeName"
        class="demo-tabs"
      >
        <el-tab-pane label="歌曲列表" name="musiclist">
          <!-- 判断是否有cookie来验证是否登录，登录展示全部 -->
          <MusicList v-if="!cookie" :tracks="playlist.tracks" />
          <MusicList v-else :tracks="songsAll" />
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <!-- 评论组件 -->
          <Comment
            v-if="commentsAll"
            :commentsAll="commentsAll"
            @commentPageClick="emitCommentPageClick"
          />
        </el-tab-pane>
        <!-- 收藏组件 -->
        <el-tab-pane label="收藏者" name="collect">
          <Collect v-if="!cookie" :subscribers="playlist.subscribers" />
          <Collect v-else :subscribers="subScribersAll" />
        </el-tab-pane>
      </el-tabs>
      <!-- 搜索框 -->
      <div v-if="activeName == 'musiclist'" class="search">
        <el-input
          v-model="searchKeywords"
          class="w-50 m-2 inp"
          placeholder="搜索歌单音乐"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useMusicDetailStore } from "@/stores/musicdetail";
import { formatMonthDay, formatePayCount } from "@/utils/formatplay";
import { Search, CirclePlus, Share } from "@element-plus/icons-vue";
import MusicList from "@/components/musiclist/MusicList.vue";
import Comment from "@/components/comment/Comment.vue";
import Collect from "@/components/collect/Collect.vue";
import local from "@/utils/local";
import { useUserMusicStore } from "@/stores/usermusic";

const userMusicStore = useUserMusicStore();
// cratedList:获取创建歌单和收藏歌单

const { createdList } = storeToRefs(userMusicStore);
// 获取cookie
const cookie = local.getLocalCache("cookie");
// 根据id发送网络请求
const route = useRoute();
const musicDetailStore = useMusicDetailStore();
// 相关歌单推荐请求
const routerId = ref(route.params.id);
// 获取所有歌单
console.log(routerId.value);
musicDetailStore.getTrackAllDataAction(routerId.value);
// 获取歌单所有的收藏的人
musicDetailStore.getSubscribesAllAction(routerId.value);
// 没有登录调用这个接口 获取歌单详情 里面包含大部分数据
musicDetailStore.getDetailsDataListAllAction(routerId.value);
musicDetailStore.getDynamicDetailIdAction(routerId.value);
// 发送评论请求 全部
musicDetailStore.getCommentIdAction(routerId.value);

// 获取数据  里面包含大部分数据
/* 
  songsAll 歌曲登录后获取的全部歌曲
  commentsAll 评论
  subScribersAll 收藏者
*/
const { DetailData, songsAll, commentsAll, subScribersAll } =
  storeToRefs(musicDetailStore);

// 拿到 DetailData 里面的 playlist数据
const playlist = computed(() => DetailData.value?.playlist);
console.log(playlist);
// 设置标签
const tags = computed(() => playlist.value?.tags.join("/"));
// 拿到 DetailData 里面的 privileges 数据
const privileges = computed(() => DetailData.value?.privileges);
// 切换tab
const activeName = ref(local.getLocalCache("activeName") ?? "musiclist");
const handleChangeClick = (v) => {
  local.setLocalCache("activeName", v.props.name);
  const localActiveName = local.getLocalCache("activeName");
  activeName.value = localActiveName;
};
// 搜索
const searchKeywords = ref("");
// 评论分页
const emitCommentPageClick = (v) => {
  musicDetailStore.getCommentIdAction(routerId.value, v - 1);
};
// 播放全部业务逻辑
const onplayClick = (v) => {
  console.log(v);
};
</script>

<style lang="less" scoped>
.listInfo {
  display: flex;
  padding: 10px;
  height: 200px;
  // background-color: rgb(229, 232, 233);
  .listAvatar {
    img {
      width: 200px;
      height: 100%;
      border-radius: 5px;
    }
  }
  // 右边部分
  .right-box {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    // title
    .title {
      display: flex;
      align-items: center;
      .titleTag {
        border: 1px solid var(--background-color);
        color: var(--background-color);
        padding: 3px;
        border-radius: 5px;
        margin: 5px;
        font-size: 12px;
      }
      .titleContent {
        font-size: 20px;
        font-weight: 900;
      }
    }
    // user
    .user {
      display: flex;
      align-items: center;
      font-size: 12px;

      // 头像
      .userAvatar {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin: 5px;
        }
        // 作者名字
        .userName {
          color: var(--color-blue-primary);
          margin: 0 7px;
        }
      }

      // 创建时间
      .createTime {
      }
    }

    // 按钮
    .buttons {
      .el-button {
        --el-color-primary: var(--background-color);
        --el-button-hover-border-color: var(--color-white-primary);
        --el-button-hover-bg-color: var(--background-color);
      }
    }
    // tags 标签
    .tags {
      font-size: 12px;
      margin: 10px 0;

      .tags-item {
        color: var(--color-black-primary);
      }
      .item {
        color: var(--color-blue-primary);
        cursor: pointer;
      }
      .item_ {
        margin: 0 5px;
      }
    }
    // 歌曲数量 和 播放数量
    .otherInfo {
      display: flex;
      font-size: 12px;
      align-items: center;
      color: var(--color-black-primary);
      .play-count {
        margin-left: 10px;
      }
    }
    // 简介：
    .desc {
      font-size: 13px;
      margin: 10px 0;
      color: var(--color-black-primary);
    }
  }
}

// 列表

.music-list {
  position: relative;
  .inp {
    position: absolute;
    right: 100px;
    top: 0;
    width: 200px;
  }
}
.demo-tabs {
  --el-color-primary: var(--background-color);
}
:deep(.el-tabs__nav-wrap::after) {
  height: 0 !important;
}
</style>
