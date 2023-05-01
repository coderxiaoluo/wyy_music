import lRequest from "../../request/index"


// 获取用户详情
export function getUserDetail(id) {
  return lRequest.get({
    url: `/user/detail?uid=${id}`
  })
}

// 用户等级
export function getUserLevel(cookie) {
  return lRequest.get({
    url: "/user/level",
    params: {
      cookie,
      timestamp: new Date().getTime(),
    }
  })
}

//   获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserSubcount(cookie) {
  return lRequest.get({
    url: "/user/subcount",
    params: {
      cookie,
      timestamp: new Date().getTime(),
    }
  })
}

// 获取用户绑定信息

export function getUserBinding(cookie, uid) {
  return lRequest.get({
    url: "/user/binding",
    params: {
      cookie,
      timestamp: new Date().getTime(),
    }
  })
}