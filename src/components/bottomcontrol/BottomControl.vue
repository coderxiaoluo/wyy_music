<template>
  <div class="bottom-control">
    <audio
      ref="audioEl"
      v-show="false"
      :src="songUrl[0]?.url"
      controls
      @play="onPlay"
      @pause="onPause"
      @ended="overAudio"
      @canplay="canplayLoad"
      @timeupdate="onTimeupDateMusic"
    ></audio>

    <!-- 音乐 -->
    <div class="left">
      <div v-if="playMusic.al" class="avatar" @click="handleRecordClick">
        <img :src="playMusic.al?.picUrl" alt="" />
        <i
          ><el-icon><ArrowUpBold /></el-icon
        ></i>
      </div>
      <div v-else class="desc">初听不知曲中意 再听已是曲中人</div>
      <!--  歌名 / 作者 -->
      <div class="musicInfo">
        <p class="musicName">{{ playMusic?.name }}</p>
        <p class="singer">
          <span v-if="playMusic.ar" class="name">
            {{ playMusic?.ar[0]?.name }}{{ playMusic?.ar[1]?.name }}
          </span>
        </p>
      </div>
    </div>

    <!-- 播放 -->
    <div class="center">
      <div class="buttons">
        <span>
          <svg
            @click="onchangeMusicList"
            class="icon playicon"
            aria-hidden="true"
          >
            <use :xlink:href="svgArr[svgIndex]"></use>
          </svg>
        </span>
        <span>
          <svg
            @click="previousMusicClick"
            class="icon playicon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-shangyishou1"></use>
          </svg>
        </span>
        <!-- 暂停和播放 -->
        <span>
          <svg
            @click="playPause(false)"
            v-if="isShowPlay"
            class="icon playicon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-zanting2"></use>
          </svg>
          <svg
            @click="playPause(true)"
            v-else
            class="icon playicon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-kaishi"></use>
          </svg>
        </span>
        <span>
          <svg @click="nextMusicClick" class="icon playicon" aria-hidden="true">
            <use xlink:href="#icon-xiayishou1"></use>
          </svg>
        </span>
      </div>
      <!-- 进度条 -->
      <div class="progressBar">
        <!-- 开始时间 -->
        <div class="currentTime">
          <span v-if="!currentTimes == 0">{{
            currentDuration(currentTimes)
          }}</span>
          <span v-else>00:00</span>
        </div>
        <!-- 滑块 -->
        <div class="slider-demo-block">
          <el-slider
            @input="onInputTime"
            v-model="sliderbar"
            :show-tooltip="false"
            size="small"
          />
        </div>
        <!-- 结束时间 -->
        <div class="endTime" v-if="playMusic.dt">
          {{ formatDuration(playMusic.dt) }}
        </div>
        <div class="endTime" v-else>00:00</div>
      </div>
    </div>
    <!-- 右边部分 -->
    <div class="right">
      <!-- icon-bofangliebiao -->
      <div class="volumeControl">
        <!-- 音量 -->
        <svg class="icon volumeicon" aria-hidden="true">
          <use xlink:href="#icon-yinliang"></use>
        </svg>
        <!-- 音量 滑块-->
        <el-slider
          :max="100"
          :min="0"
          @input="onInputVolume"
          v-model="volume"
          size="small"
        />
        <!-- 列表 -->
        <div class="playList">
          <svg
            class="icon playicon"
            @click="handleDrawerClick"
            aria-hidden="true"
          >
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
        </div>
      </div>
      <!-- 备案 -->
      <div class="filings">渝ICP备20230613号</div>
    </div>

    <!-- 抽屉 -->
    <el-drawer
      v-model="isShowDrawer"
      title=""
      :with-header="false"
      :modal="true"
      :lock-scroll="false"
      :show-close="false"
      :append-to-body="true"
      size="25%"
      :z-index="77"
      height="83%"
    >
      <h2 class="songlist">
        <span v-if="!songMusicAll.length == 0"
          >{{ songMusicAll.length }}首</span
        >
        <span class="start-text" v-else>忍者时代即将结束</span>
      </h2>
      <el-table
        ref="tableEl"
        v-show="isDrawer"
        :show-header="false"
        :data="songMusicAll"
        :row-class-name="tableRowClassName"
        @row-dblclick="onplaydbDrawerClick"
      >
        <el-table-column
          class="musicName"
          property="name"
          label="name"
          width="150"
        >
          <template #default="scope" :span="4">
            <el-text class="w-100px" truncated>{{ scope.row.name }}</el-text>
          </template>
        </el-table-column>
        <el-table-column property="ar" width="120">
          <template #default="scope" :span="4">
            <el-text class="w-100px" truncated v-if="scope.row.ar[1]"
              >{{ scope.row.ar[0].name }} /
              {{ scope.row?.ar[1]?.name }}</el-text
            >
            <el-text v-else>{{ scope.row.ar[0].name }} </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="dt" width="100">
          <template #default="scope">
            <span>{{ formatDuration(scope.row.dt) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useSongStore } from "@/stores/song";
import { useRecordStore } from "@/stores/record";
import local from "@/utils/local";
import { formatDuration, currentDuration } from "@/utils/formatplay";
import { randomMusic } from "@/utils/random";

const songStore = useSongStore();
// 双击播放才能拿到playMusic和 songUrl / songMusicAll
const { playMusic, songUrl, isShowPlay, isDrawer, songMusicAll } =
  storeToRefs(songStore);

const recordStore = useRecordStore();
// 展开唱片页
const { isRecordPage, lyricTime } = storeToRefs(recordStore);

// 设置顺序播放  / 循环播放 / 随机播放
const svgArr = [
  "#icon-shunxubofang",
  "#icon-danquxunhuan",
  "#icon-suijibofang1",
];
let svgIndex = ref(0);
const onchangeMusicList = () => {
  svgIndex.value++;
  if (svgIndex.value == svgArr.length) svgIndex.value = 0;
};

// 拿到audio元素
const audioEl = ref(null);
if (audioEl.value == null) {
  isShowPlay.value = null;
}
// 表格
const tableEl = ref(null);
// 音量
const volume = ref(local.getLocalCache("locVolume") * 100 ?? 100);
// 音频准备就绪了
function canplayLoad() {
  // 双击播放
  audioEl.value.play();
}

// 给列表添加样式
function tableRowClassName({ row, rowIndex }) {
  if (playMusic.value.id == row.id) {
    return "back-row-index";
  } else {
    return "";
  }
}
// 滑块进度条业务逻辑
const sliderbar = ref(0);
let currentTimes = ref(0);

// 当进度条改变了将值存储再store中 ，在唱片页中进行歌词匹配
watch(currentTimes, (newvalue) => {
  lyricTime.value = newvalue;
});
// 当前时间
const currentTime = ref(audioEl.value?.currentTime);
// 总时间
const durationTime = ref(audioEl.value?.duration);
// 百分比时间
const tmpOffsetTime = ref(0);
// 拖动滑块时间
const onInputTime = (v) => {
  // 设置当前播放时间
  currentTimes.value = Math.floor(durationTime.value * (v / 100));
  audioEl.value.currentTime = Math.floor(durationTime.value * (v / 100));
};
// 当时间改变时触发
function onTimeupDateMusic() {
  // 格式化时间
  currentTimes.value = audioEl.value?.currentTime;
  // 计算当前时间是总时间的百分比   当前时间 / 总时间
  currentTime.value = audioEl.value?.currentTime;
  durationTime.value = audioEl.value?.duration;
  const tmpTime = currentTime.value / durationTime.value;
  tmpOffsetTime.value = Math.floor(100 * tmpTime);
  // 给值赋值给滑块
  sliderbar.value = tmpOffsetTime.value;

  audioEl.value.volume = local.getLocalCache("locVolume") ?? 1;
  volume.value = local.getLocalCache("locVolume") * 100 ?? 100;
}

/* 音量业务逻辑  */
const onInputVolume = (v) => {
  local.setLocalCache("locVolume", (v / 100).toFixed(1));
};

// 播放/暂停
const playPause = (v) => {
  if (isShowPlay.value == null) return;
  if (v) {
    // isShowPlay.value = v;
    audioEl.value.play();
  } else {
    audioEl.value.pause();
    // isShowPlay.value = v;
  }
};

// 开始播放
function onPlay() {
  isShowPlay.value = true;
}
// 当音频暂停
function onPause() {
  isShowPlay.value = false;
}
// 播放结束触发
function overAudio() {
  // 自动播放下一首
  if (playMusic.value.index == songMusicAll.value.length - 1) return;

  /* 
    下面的代码可以封装再hook中  ++++++++++++++++++++++++++++++   5/11
  */
  // 0 表示顺序播放
  if (svgIndex.value == 0) {
    songStore.getSongUrlAction(
      songMusicAll.value[playMusic.value.index + 1].id
    );
    // 发送请求 获取歌词
    recordStore.getLyricDataAction(playMusic.value.id);
    playMusic.value = songMusicAll.value[playMusic.value.index + 1];
    // 拿到歌词
    recordStore.getLyricDataAction(playMusic.value.id);
  }
  // 2 表示单曲循环
  if (svgIndex.value == 1) {
    songStore.getSongUrlAction(songMusicAll.value[playMusic.value.index].id);
    playMusic.value = songMusicAll.value[playMusic.value.index];
  }
  // 3 表示随机播放
  if (svgIndex.value == 2) {
    let random = randomMusic(0, songMusicAll.value.length - 1);
    songStore.getSongUrlAction(songMusicAll.value[random].id);
    playMusic.value = songMusicAll.value[random];
    // 拿到歌词
    recordStore.getLyricDataAction(playMusic.value.id);
  }
}

// 抽屉展开与隐藏
const isShowDrawer = ref(false);

const handleDrawerClick = () => {
  isShowDrawer.value = !isShowDrawer.value;
};

// 抽屉点击播放
function onplaydbDrawerClick(v) {
  // 点击的是当前播放的直接返回
  if (playMusic.value.id == v.id) return;
  songStore.getSongUrlAction(v.id);
  playMusic.value = v;
}

// 上一首
const previousMusicClick = () => {
  if (playMusic.value.index == 0) return;
  // 0 表示顺序播放
  if (svgIndex.value == 0) {
    songStore.getSongUrlAction(
      songMusicAll.value[playMusic.value.index - 1].id
    );
    playMusic.value = songMusicAll.value[playMusic.value.index - 1];
    // 拿到歌词
    recordStore.getLyricDataAction(playMusic.value.id);
  }
  // 2 表示单曲循环
  if (svgIndex.value == 1) {
    songStore.getSongUrlAction(songMusicAll.value[playMusic.value.index].id);
    playMusic.value = songMusicAll.value[playMusic.value.index];
  }
  // 3 表示随机播放
  if (svgIndex.value == 2) {
    let random = randomMusic(0, songMusicAll.value.length - 1);
    songStore.getSongUrlAction(songMusicAll.value[random].id);
    playMusic.value = songMusicAll.value[random];
    // 拿到歌词
    recordStore.getLyricDataAction(playMusic.value.id);
  }
};
// 下一首
const nextMusicClick = () => {
  if (playMusic.value.index == songMusicAll.value.length - 1) return;
  // 0 表示顺序播放
  if (svgIndex.value == 0) {
    songStore.getSongUrlAction(
      songMusicAll.value[playMusic.value.index + 1].id
    );
    playMusic.value = songMusicAll.value[playMusic.value.index + 1];
    // 发送请求 获取歌词
    recordStore.getLyricDataAction(playMusic.value.id);
  }
  // 2 表示单曲循环
  if (svgIndex.value == 1) {
    songStore.getSongUrlAction(songMusicAll.value[playMusic.value.index].id);
    playMusic.value = songMusicAll.value[playMusic.value.index];
  }
  // 3 表示随机播放
  if (svgIndex.value == 2) {
    let random = randomMusic(0, songMusicAll.value.length - 1);
    songStore.getSongUrlAction(songMusicAll.value[random].id);
    playMusic.value = songMusicAll.value[random];
    recordStore.getLyricDataAction(playMusic.value.id);
  }
};

// 展开唱片功能
const handleRecordClick = () => {
  console.log("展开唱片page");
  isRecordPage.value = !isRecordPage.value;
};
</script>

<style lang="less" scoped>
.bottom-control {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-top: 1px solid var(--color-tags);
  background-color: var(--color-white-primary);
  z-index: 99;

  display: flex;
  justify-content: space-between;

  // 左边部分
  .left {
    display: flex;

    width: 400px;

    .avatar {
      position: relative;
      margin: 5px 0 10px 10px;
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
      }

      i {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: none;
        .el-icon {
          text-align: center;
          line-height: 50px;
          color: #ffffff;
        }
      }
    }
    .avatar:hover i {
      cursor: pointer;
      display: block;
    }
    .desc {
      text-align: center;
      font-size: 12px;
      line-height: 55px;
      padding-left: 20px;
    }
    .musicInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 20px;
      color: var(--color-black-primary);
      .name {
        font-size: 12px;
      }
    }
  }
  // 中间部分
  .center {
    display: flex;
    flex-direction: column;
    width: 400px;
    justify-self: flex-start;
    padding: 10px 0;
    .buttons {
      display: flex;
      justify-content: space-around;
      margin: 5px 110px 0 100px;
      // text-align: center;
      span {
        width: 25px;
        height: 25px;
        cursor: pointer;
        margin: 0 10px;
        .playicon {
          width: 100%;
          height: 100%;
        }
      }
    }
    .progressBar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      // 滑块
      .slider-demo-block {
        display: flex;
        flex: 1;
        align-items: center;
      }
      .slider-demo-block .el-slider {
        margin: 0 12px;
      }
      :deep(.el-slider) {
        --el-slider-main-bg-color: var(--background-color);
      }
      :deep(.el-slider__button-wrapper) {
        --el-slider-main-bg-color: var(--background-color);
        --el-slider-button-size: 10px;
      }
    }
  }
  .right {
    width: 400px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 20px;
    .volumeControl {
      display: flex;
      align-items: center;
      height: 50px;
      width: 200px;
      .volumeicon {
        margin: 0 20px;
        font-size: 30px;
      }
      .playList {
        margin: 0 20px;

        .playicon {
          cursor: pointer;
        }
      }
    }
    .filings {
      font-size: 12px;
      margin-right: 43px;
    }
  }
}

.songlist {
  font-size: 14px;
  text-align: center;

  .start-text {
    color: var(--color-black-primary);
  }
}

.el-table {
  :deep(.back-row-index) {
    // color: rgb(13, 128, 216) !important;
    // background-color: var(--background-color) !important;
    // --el-table-row-hover-bg-color: #d9deec;
    .el-text {
      color: var(--background-color);
    }
    color: var(--background-color);
  }

  .el-text {
    cursor: pointer;

    font-size: 12px;
  }
}
</style>
