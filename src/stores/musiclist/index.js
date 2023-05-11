import { defineStore } from "pinia";
import { getCatListData, getHighquaLityData, getHotPlayListData, getTopPLayListOrder, getBoutiqueDataList } from "@/service"

export const useMusicListStore = defineStore("musiclist", {
  state: () => {
    return {
      highqualist: [],
      // 标签
      tags: [],
      // 列表标签
      categoriesList: [],
      // 歌单列表
      playLists: [],
      // 精品歌单第一个
      FirstBoutiqueDataList: {}
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
    async getBoutiqueDataListAction(cat) {
      const result = await getBoutiqueDataList(cat)
      this.BoutiqueDataList = result
      this.FirstBoutiqueDataList = result.playlists[0]
    },
    // 热门歌单分类
    async getHotPlayListDataAction() {
      const result = await getHotPlayListData()
      this.tags = result.tags
    },
    // 歌单(网友精选)
    async getTopPLayListOrderAction(name, num) {
      const result = await getTopPLayListOrder(name, num)
      this.playLists = result.playlists
    }
  },
  getters: {

  }
})