import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class lRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // 网络拦截器
    this.instance.interceptors.request.use(config => {
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      return res
    }, err => {
      return err
    })
  }
  // 发送网络请求
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
  get(config) {
    return this.request({ ...config, method: "get" })
  }
  post(config) {
    return this.request({ ...config, method: "post" })
  }

}

export default new lRequest(BASE_URL, TIMEOUT)