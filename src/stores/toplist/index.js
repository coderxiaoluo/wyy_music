import { defineStore } from "pinia";
import { topRankingList, artistList } from "@/service"



export const useTopListStore = defineStore("toplist", {
  state: () => {
    return {
      toplist: [],
    }
  },
  actions: {
    async topRankingListAction() {
      const result = await topRankingList()
      this.toplist = result.list
    },
    // 获取歌手

    async artistListAction() {
      const result = await artistList()
    }
  }
})