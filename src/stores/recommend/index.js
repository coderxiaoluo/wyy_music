import { defineStore } from "pinia";
import { getBannerData, getRelatedDataList } from "@/service"
import local from "../../utils/local";

export const useRecommendStore = defineStore("recommend", {
  state: () => {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单数据
      songList: []
    }
  },
  actions: {
    // 轮播图请求
    async getBannerDataAction() {
      const results = await getBannerData()
      this.banners = results.banners
    },
    // 推荐歌单
    async getRelatedDataListAction() {
      const results = await getRelatedDataList()
      // 拿到前十条数据展示
      const res = results.result.splice(0, 10)
      this.songList = res
    }
  },
  getters: {

  }
})