import { defineStore } from "pinia";
import { getLogin, getCreateUser, getQrlogin, getStatus, getUserDetail, getUserLevel } from "@/service"
import local from "../../utils/local";

export const userLoginStore = defineStore("login", {
  state: () => ({
    unikey: "",
    qrimg: {},
    timers: null,
    isShow: false,
    isPage: true,
    cookie: local.getLocalCache("cookie") ?? "",
    account: local.getLocalCache("account") ?? {},
    profile: local.getLocalCache("profile") ?? {},
    detail: {}
  }),
  actions: {
    async getLoginCodeQR() {
      const results = await getLogin()
      if (!results.data) return
      this.unikey = results.data.unikey
    },
    async getCreateUserAction(id) {
      const results = await getCreateUser(id)
      this.qrimg = results.data
    },

    // 登录
    async getQrloginActions() {
      this.timers = setInterval(async () => {
        const results = await getQrlogin(this.unikey, new Date().getTime())
        // 登录成功
        if (results.code === 803) {
          local.setLocalCache("cookie", results.cookie)
          this.cookie = results.cookie
          this.isShow = false
          this.getStatusActions()
          clearInterval(this.timers)
          return
        }
        // 登录失败
        if (results.code === 800) {
          this.isShow = false
          clearInterval(this.timers)
          return
        }
      }, 3000)
    },
    // 
    // 获取用户id
    async getStatusActions() {
      const results = await getStatus(this.cookie)
      local.setLocalCache("account", results.data.account)
      local.setLocalCache("profile", results.data.profile)
      // 获取用户详细信息
      this.getUserDetailActions(results.data.account.id)
    },
    // 获取用户详情
    async getUserDetailActions(id) {
      const results = await getUserDetail(id)
      console.log(results)
    },
    async getUserLevelActions() {
      const results = await getUserLevel(this.cookie)
      console.log(results)
    }
  },
  getters: {
  }
})

