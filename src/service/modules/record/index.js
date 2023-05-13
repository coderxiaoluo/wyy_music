import lRequest from "../../request/index"
import local from "@/utils/local";


// 获取歌词
export function getLyricData(id) {
  return lRequest.get({
    url: `/lyric?id=${id}`
  })
}


// 获取逐字歌词
export function getLyricNewData(id) {
  return lRequest.get({
    url: `/lyric/new?id=${id}`
  })
}