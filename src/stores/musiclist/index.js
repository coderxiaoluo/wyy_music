import { defineStore } from "pinia";
import { getCatListData, getHighquaLityData, getHotPlayListData, getTopPLayListOrder } from "@/service"
import local from "../../utils/local";


export const useMusicListStore = defineStore("musiclist", {
  state: () => {
    return {
      highqualist: [],
      // 标签
      tags: [],
      // 列表标签
      categoriesList: [],
      // 歌单列表
      playLists: []
    }
  },
  actions: {
    // 歌单分类
    async getCatListDataAction() {
      const result = await getCatListData()
      this.categoriesList = result
    },
    // 精品歌单标签列表
    async getHighquaLityDataAction() {
      const result = await getHighquaLityData()
      this.highqualist = result
      // console.log(result)
    },
    // 热门歌单分类
    async getHotPlayListDataAction() {
      const result = await getHotPlayListData()
      this.tags = result.tags
    },
    // 歌单(网友精选)
    async getTopPLayListOrder() {
      const result = await getTopPLayListOrder()
      this.playLists = result.playlists
    }
  },
  getters: {

  }
})