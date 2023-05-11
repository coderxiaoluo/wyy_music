import { defineStore } from "pinia";
import { getSongUrl, getCheckMusic } from "@/service"

export const useSongStore = defineStore("song", {
  state: () => {
    return {
      // 当前音乐的信息
      playMusic: {},
      // 当前音乐的url  mp3
      songUrl: [],
      // 获取到所有的歌曲
      songMusicAll: [],
      // 是否播放
      isShowPlay: false,
      // 是否显示歌单列表
      isDrawer: false
    }
  },
  actions: {
    // 获取音乐的url
    async getSongUrlAction(id) {
      const result = await getSongUrl(id)
      this.songUrl = result.data
    },
    // 音乐是否可以用
    async getCheckMusicAction(id) {
      const result = await getCheckMusic(id)
      console.log(result)
    },
    // 点击音乐将音乐存储起来
    storageMusic(v) {
      this.playMusic = v
    },
    // 双击获取全部歌单
    getSongMusicAction(v) {
      this.songMusicAll = v
    }

  }
})