import lRequest from "../../request/index"


// 获取用户详情
export function getUserDetail(id) {
  return lRequest.get({
    url: `/user/detail?uid=${id}`
  })
} 