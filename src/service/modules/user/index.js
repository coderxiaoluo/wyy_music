import lRequest from "../../request/index"


// 获取用户详情
export function getUserDetail(id) {
  return lRequest.get({
    url: `/user/detail?uid=${id}`
  })
}

//  用户等级

export function getUserLevel(cooker) {
  return lRequest.get({
    url: "/user/level",
    params: {
      cookie: cooker,
      timestamp: new Date().getTime(),
    }
  })
}