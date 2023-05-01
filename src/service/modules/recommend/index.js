
import lRequest from "../../request/index"

// 轮播图
export function getBannerData() {
  return lRequest.get({
    url: "/banner"
  })
}
// 推荐歌单
export function getRelatedDataList() {
  return lRequest.get({
    url: `/personalized`
  })
}