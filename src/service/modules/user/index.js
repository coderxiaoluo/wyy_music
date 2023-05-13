import lRequest from "../../request/index"
import local from "@/utils/local"
const cookie = local.getLocalCache("cookie")
const account = local.getLocalCache("account")
// 获取用户详情
export function getUserDetail(id) {
  if (!account) return
  return lRequest.get({
    url: `/user/detail?uid=${account.id}`
  })
}

// 用户等级
export function getUserLevel() {
  return lRequest.get({
    url: "/user/level",
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

//   获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubcount() {
  return lRequest.get({
    url: "/user/subcount",
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 获取用户绑定信息
export function getUserBinding(uid) {
  return lRequest.get({
    url: "/user/binding",
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}