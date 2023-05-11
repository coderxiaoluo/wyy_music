<template>
  <div class="music-list">
    <el-table
      class="table"
      :row-class-name="rowIndexFn"
      :data="tracks"
      stripe
      lazy
      style="width: 100%"
      @row-dblclick="onplaydbClick"
    >
      <el-table-column type="index" :index="indexMethod" width="50">
        <template #default="scope">
          <span v-if="playMusic.id !== scope.row.id">{{
            scope.$index + 1
          }}</span>
          <svg v-else class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinxiang"></use>
          </svg>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <svg class="icon icon-xihuan" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use>
        </svg>
        <svg class="icon icon-xiazai" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="500" />
      <el-table-column label="歌手" width="200">
        <template #default="scope">
          <span v-if="scope.row.ar[1]"
            >{{ scope.row.ar[0].name }} / {{ scope.row?.ar[1]?.name }}</span
          >
          <span v-else>{{ scope.row.ar[0].name }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="300" />

      <el-table-column prop="dt" label="时间" width="100">
        <template #default="scope">
          <span>{{ formatDuration(scope.row.dt) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { formatDuration } from "@/utils/formatplay";
import { useSongStore } from "@/stores/song";
import { useMusicDetailStore } from "@/stores/musicdetail";

const songStore = useSongStore();
const musicDetailStore = useMusicDetailStore();

// 双击播放才能拿到playMusic和 songUrl
const { playMusic, isShowPlay, isDrawer } = storeToRefs(songStore);

const props = defineProps({
  tracks: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
// 索引
const indexMethod = (index) => {
  if (index + 1 < 10) {
    return "0" + (index + 1);
  }
  return index + 1;
};
function rowIndexFn({ row, rowIndex }) {
  row.index = rowIndex;

  if (row.id === playMusic.value?.id) {
    return "color-row-index";
  }
}
// 双击点击播放
// 播放音乐
const onplaydbClick = (v) => {
  // 将当前这首获取的音乐信息存储起来
  songStore.storageMusic(v);
  // 发送请求 获取音乐url
  songStore.getSongUrlAction(v.id);
  // songStore.getCheckMusicAction(v.id);
  isShowPlay.value = true;
  isDrawer.value = true;
  const { songsAll } = storeToRefs(musicDetailStore);
  songStore.getSongMusicAction(songsAll.value);
};
</script>

<style lang="less" scoped>
.el-table {
  // --el-table-tr-bg-color: var(--color-row-tr1);
  // --el-fill-color-light
  // --el-table-tr-bg-color

  :deep(.color-row-index) {
    color: var(--background-color) !important;
  }
  .el-table__cell {
    padding: 20px 0 !important;
  }
}

.icon-xihuan,
.icon-xiazai {
  width: 20px;
  margin: 0 5px;
  cursor: pointer;
}
</style>
