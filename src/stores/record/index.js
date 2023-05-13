import { defineStore } from "pinia";
import { getLyricData, getLyricNewData } from "@/service"
import local from "../../utils/local";


export const useRecordStore = defineStore("record", {
  state: () => {
    return {
      isRecordPage: false,
      lyricTime: 0,
      lyricData: {}
    }
  },
  actions: {
    // 获取歌词
    async getLyricDataAction(id) {
      const result = await getLyricData(id)
      console.log(result)
      this.lyricData = result.lrc
    },
    // 获取获取逐字歌词
    async getLyricNewDataAction(id) {
      const result = await getLyricNewData(id)
      // console.log(result)
    }
  },


  getters: {

  }

})