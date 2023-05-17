import lRequest from "../../request/index"
import local from "@/utils/local";
const cookie = local.getLocalCache("cookie")
// 获取音乐URL 
export function getSongUrl(id) {
  if (!id) return
  return lRequest.get({
    url: `/song/url?id=${id}`,
    params: {
      cookie: cookie,
      timestamp: new Date().getTime(),
      withCredentials: true
    }
  })
}


export function getCheckMusic(id) {
  return lRequest.get({
    url: `/check/music?id=${id}`
  })
}