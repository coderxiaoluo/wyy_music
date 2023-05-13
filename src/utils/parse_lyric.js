export function parseLyric(lyricString) {
  if (!lyricString) return
  const lyricLineString = lyricString.split('\n')
  const regexp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/i
  const lyricArray = []
  for (let item of lyricLineString) {
    const result = item.match(regexp)
    if (!result) continue
    const minuteTime = result[1] * 60 * 1000
    const secondTime = result[2] * 1000
    const mSecondTime = result[3].length === 3 ? result[3] * 1 : result[3] * 10
    const time = minuteTime + secondTime + mSecondTime
    const content = item.replace(regexp, '').trim()
    lyricArray.push({ time, content })
  }
  return lyricArray
}




// export function music(lyricString) {
//   const { currentTime } = audio
//   const minutes = parseInt(currentTime / 60)
//   const seconds = parseInt(currentTime % 60)
//   const timeStr = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
//   const reg = new RegExp('\\[' + timeStr + '\\.\\d{2,3}\\](.+)')
//   let lrc = reg.exec(lyricString)
//   console.log(lrc)
//   lrc = lrc ? lrc[1] : ''
// }