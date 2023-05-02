import lRequest from "../../request/index"

//  精品歌单标签列表
export function getHighquaLityData() {
  return lRequest.get({
    url: "/playlist/highquality/tags"
  })
}

// 歌单分类
export function getCatListData() {
  return lRequest.get({
    url: "/playlist/catlist"
  })
}

// 热门歌单分类
export function getHotPlayListData() {
  return lRequest.get({
    url: "/playlist/hot"
  })
}

// 歌单(网友精选)
export function getTopPLayListOrder() {
  return lRequest.get({

    url: `/top/playlist?limit=100&cat=${"华语"}`
  })
}
// 'top/playlist?limit=10&order=new