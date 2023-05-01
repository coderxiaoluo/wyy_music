import { defineStore } from "pinia";
import { getLogin, getCreateUser, getQrlogin, getStatus } from "@/service"
import local from "../../utils/local";
import { ElMessage } from 'element-plus'

export const userLoginStore = defineStore("login", {
  state: () => ({
    unikey: "",
    qrimg: {},
    timers: null,
    isShow: false,
    isPage: true,
    // cookie
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
          // 存储cookie
          local.setLocalCache("cookie", results.cookie)
          this.cookie = results.cookie
          this.isShow = false
          // 提示
          ElMessage('登录成功!')
          // 获取用户id
          this.getStatusActions()
          // 停止请求
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
      // 存储用户id
      this.profile = results.data.profile
      this.account = results.data.account
      //  持久化存储
      local.setLocalCache("account", results.data.account)
      local.setLocalCache("profile", results.data.profile)
    },

  },
  getters: {
  }
})

