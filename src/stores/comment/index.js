import { defineStore } from "pinia";
import { sendComments, likeCommentIsShow } from "@/service"
import local from "../../utils/local";
import { useMusicDetailStore } from "../musicdetail"

const musicDetailStore = useMusicDetailStore()
export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      commentContent: {},
    }
  },
  actions: {
    // 分页评论
    async sendCommentsActions(id, content) {
      const result = await sendComments(id, content)
      if (result.code === 200) {
        this.commentContent = result.comment
        musicDetailStore.getCommentIdAction(id)
      }

    },
    async likeCommentIsShowAction(likeCount, id, cid) {
      const result = await likeCommentIsShow(likeCount, id, cid)
      if (result.code == 200) {
        musicDetailStore.getCommentIdAction(id)
        return 0
      }
    }
  }
})