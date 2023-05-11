import lRequest from "../../request/index"
import local from "@/utils/local"
const cookie = local.getLocalCache("cookie")

export function topRankingList() {
  return lRequest.get({
    url: "/toplist/detail",
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}

// 获取歌手
export function artistList() {
  return lRequest.get({
    url: "/artist/list"
  })
}