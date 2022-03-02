export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function formatDate(time, fmt) {
  let date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export function formatMonthDay(time) {
  return formatDate(time, 'MM月dd日')
}

export function formatMinuteSecond(time) {
  return formatDate(time, 'mm:ss')
}
export function formatYearMonthDay(time) {
  return formatDate(time, 'yyyy-MM-dd')
}

export function returnSecond(times) {
  times = times.split(':')
  let m = parseInt(times[0])
  let s = parseInt(times[1])
  let t = m * 60 + s
  return t
}

//秒转化成 时分秒
export function handleMusicTime(time) {
  // 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
  time = parseInt(time)
  if (time > 10000) {
    time = Math.floor(time / 1000)
  } else {
    time = Math.floor(time)
  }
  let m = Math.floor(time / 60)
  let s = Math.floor(time % 60)
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  return m + ':' + s
}

export function setStorage(key, value) {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
    window.sessionStorage.setItem(key, value)
  }
  window.sessionStorage.setItem(key, value)
}
export function getStorage(key) {
  const value = JSON.parse(window.sessionStorage.getItem(key))
  return value
}

// 歌词截取
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricList) {
  const lineStrings = lyricList.split('\n')
  const lyrics = []
  for (let line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line)
      if (!result) continue
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
      const time = time1 + time2 + time3
      const content = line.replace(parseExp, '').trim()
      const lineObj = { time, content }
      lyrics.push(lineObj)
    }
  }
  return lyrics
}

// 这里 to 的 乘算需要按照 当前歌词行高来
// 例如
// scrollTo(this.$refs.lrc, (this.lyricsIndex - 3) * 52, 400)
// 52 是你当前行的 height 和 line-height 一般来说两个值是相等的
export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  let difference = to - element.scrollTop
  let perTick = (difference / duration) * 10

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}
