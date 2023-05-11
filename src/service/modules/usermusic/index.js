import lRequest from "../../request/index"
import local from "@/utils/local"
const profile = local.getLocalCache("profile")
export function userPlaylist(uid) {
  if (!profile) return
  return lRequest.get({
    url: `/user/playlist?uid=${profile.userId}`
  })
}