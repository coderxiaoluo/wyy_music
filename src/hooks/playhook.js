// import { randomMusic } from "@/utils/random";

// export function playMethod(index, i = 1) {

//   if (index == 0) {
//     songStore.getSongUrlAction(
//       songMusicAll.value[playMusic.value.index + 1].id
//     );
//     playMusic.value = songMusicAll.value[playMusic.value.index + 1];
//   }
//   // 2 表示单曲循环
//   if (index == 1) {
//     songStore.getSongUrlAction(songMusicAll.value[playMusic.value.index].id);
//     playMusic.value = songMusicAll.value[playMusic.value.index];
//   }
//   // 3 表示随机播放
//   if (index == 2) {
//     let random = randomMusic(0, songMusicAll.value.length - 1);
//     songStore.getSongUrlAction(songMusicAll.value[random].id);
//     playMusic.value = songMusicAll.value[random];
//   }

// }