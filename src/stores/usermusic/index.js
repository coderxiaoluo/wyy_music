import { defineStore } from "pinia";
import { userPlaylist } from "@/service"

export const useUserMusicStore = defineStore("usermusic", {
  state: () => {
    return {
      createdList: []
    }
  },
  actions: {
    async userPlaylistAction(id) {
      const result = await userPlaylist(id)
      this.createdList = result.playlist
    }
  },
  getters: {

  }
})