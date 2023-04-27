import { defineStore } from "pinia";
import { getLogin, getCreateUser, getQrlogin, getStatus, getUserDetail } from "@/service"
import local from "../../utils/local";

export const userLoginStore = defineStore("login", {
  state: () => ({
    unikey: "",
    qrimg: {},
    timers: null,
    isShow: false,
    account: {}
  }),
  actions: {
    async getLoginCodeQR() {
      const results = await getLogin()
      if (!results.data) return
      this.unikey = results.data.unikey
      // local.setLocalCache("unikey", results.data.unikey)
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
          this.isShow = false
          this.getStatusActions()
          console.log(results)
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
      const results = await getStatus()
      console.log(results)
      local.setLocalCache("account", results.data.account)
      this.account = results.data.account
      // 获取用户详细信息
      // this.getUserDetailActions(results.data.account.id)
    },
    async getUserDetailActions(id) {
      const results = await getUserDetail(id)
    }
  },
  getters: {
  }
})

