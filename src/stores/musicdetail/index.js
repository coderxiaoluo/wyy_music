import { defineStore, storeToRefs } from "pinia";
import { getDetailsDataListAll, getTrackAllData, getDynamicDetailId, getCommentId, getSubscribesAll } from "@/service"
import { useSongStore } from "../song"


export const useMusicDetailStore = defineStore("musicdatail", {
  state: () => {
    return {
      // 相关歌单推荐
      DetailData: {},
      // 获取所有的歌曲
      songsAll: [],
      // 收藏全部的人
      subScribersAll: [],
      // 评论
      commentsAll: {}
    }
  },
  actions: {
    // 没有登录调用这个接口 获取歌单详情 里面包含大部分数据
    async getDetailsDataListAllAction(id) {
      const result = await getDetailsDataListAll(id)
      this.DetailData = result
    },
    // 如果登录了就调用这个接口 获取歌单所有歌曲
    async getTrackAllDataAction(id, trackCount) {
      const result = await getTrackAllData(id, trackCount)
      this.songsAll = result.songs
    },
    async getDynamicDetailIdAction(id) {
      const result = await getDynamicDetailId(id)
    },
    // 歌单评论
    async getCommentIdAction(id, offset) {
      const result = await getCommentId(id, offset)
      this.commentsAll = result
    },
    // 如果登录了就调用这个接口 获取歌单所有的收藏的人
    async getSubscribesAllAction(id) {
      const result = await getSubscribesAll(id)
      this.subScribersAll = result.subscribers
    }

  },
  getters: {

  }
})