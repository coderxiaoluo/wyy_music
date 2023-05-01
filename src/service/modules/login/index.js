import lRequest from "../../request/index"

// 二维码 key 生成接口
export function getLogin() {
  return lRequest.post({
    url: "/login/qr/key"
  })
}

// 二维码生成接口
export function getCreateUser(id) {
  return lRequest.get({
    url: `/login/qr/create?qrimg=true&key=${id}`
  })
}

// 二维码检测扫码状态接口
export function getQrlogin(key, time) {
  return lRequest.get({
    url: `/login/qr/check?key=${key}&time=${time}`
  })
}

// 登录状态 获取id
export function getStatus(cooker) {
  return lRequest.get({
    url: "/login/status",
    params: {
      cookie: cooker,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

