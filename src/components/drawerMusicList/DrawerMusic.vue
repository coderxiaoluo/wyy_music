<template>
  <div class="drawer-music"></div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useSongStore } from "@/stores/song";

const songStore = useSongStore();
// 双击播放才能拿到playMusic和 songUrl
const { songUrl, isShowPlay, songMusicAll } = storeToRefs(songStore);
console.log(songUrl);
console.log(songMusicAll);

// 显示隐藏
const isShowDrawer = ref(true);
</script>

<style lang="less" scoped>
.drawer-music {
  width: 100px;
  height: 100px;
}
.el-drawer {
  width: 100%;
  height: 100%;
  z-index: 98 !important;
}
</style>
