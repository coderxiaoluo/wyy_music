
export function formatePayCount(count) {
  var counter = parseInt(count)
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + "亿";
  }
  if (counter > 10000) {
    return (counter / 10000).toFixed(1) + "万";
  }
  return counter + "";
}


function padLeftZore(time) {
  time = time + "";
  return ("00" + time).slice(time.length);
}

export function formatDuration(duration) {
  duration = duration / 1000;
  var minute = Math.floor(duration / 60);
  var second = Math.floor(duration) % 60;
  return padLeftZore(minute) + ":" + padLeftZore(second);
}

