import { defineStore } from "pinia";
import { getUserDetail, getUserLevel, getUserSubcount, getUserBinding } from "@/service"
import local from "../../utils/local";
const cookie = local.getLocalCache("cookie")

export const useUserInfo = defineStore("user", {
  state: () => {
    return {

    }
  },
  actions: {
    // 获取用户详情
    async getUserDetailActions(id) {
      const results = await getUserDetail(id)
      console.log("用户详情:", results)
    },
    // 获取用户等级
    async getUserLevelActions() {
      const results = await getUserLevel()
      console.log("用户等级:", results)
    },
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    async getUserSubcountActions() {
      const results = await getUserSubcount()
      console.log("用户数量:", results)
    },
    async getUserBindingActions(id) {
      const results = await getUserBinding(id)
      console.log(results)
    }
  },
  getters: {

  }
})