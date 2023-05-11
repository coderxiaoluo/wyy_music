import lRequest from "../../request/index"
import local from "@/utils/local"
const cookie = local.getLocalCache("cookie")
// 发送评论 需要携带cookie
export function sendComments(id, content) {
  return lRequest.get({
    url: `/comment?t=1&type=2&id=${id}&content=${content}`,
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}


// 点赞 需要登录
export function likeCommentIsShow(likeCount = 1, id, cid) {
  return lRequest.get({
    url: `/comment/like?id=${id}&cid=${cid}&t=${likeCount}&type=2`,
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}