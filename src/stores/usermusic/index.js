import { defineStore } from "pinia";
import { userPlaylist } from "@/service"

export const useUserMusicStore = defineStore("usermusic", {
  state: () => {
    return {
      createdList: []
    }
  },
  actions: {
    async userPlaylistAction() {
      const result = await userPlaylist()
      if (!result) return
      this.createdList = result.playlist
    }
  },
  getters: {

  }
})