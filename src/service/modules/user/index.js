import lRequest from "../../request/index"
import local from "@/utils/local"
const cookie = local.getLocalCache("cookie")

// 获取用户详情
export function getUserDetail(id) {
  return lRequest.get({
    url: `/user/detail?uid=${id}`
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