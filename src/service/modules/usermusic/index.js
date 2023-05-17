import lRequest from "../../request/index"
export function userPlaylist(uid) {
  return lRequest.get({
    url: `/user/playlist?uid=${uid}`
  })
}