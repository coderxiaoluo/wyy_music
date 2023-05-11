import lRequest from "../../request/index"


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
export function getTopPLayListOrder(name, num = 0) {
  return lRequest.get({
    url: `/top/playlist?limit=100&order=cat&cat=${name}&offset=${num * 100}`
  })
}

//  精品歌单标签列表
export function getHighquaLityData() {
  return lRequest.get({
    url: "/playlist/highquality/tags"
  })
}
export function getBoutiqueDataList(cat = '华语') {
  return lRequest.get({
    url: `/top/playlist/highquality?cat=${cat}`
  })
}


