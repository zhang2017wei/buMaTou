/* eslint-disable */
export function formatMsgTime(time) {
  var dateTime = new Date(time)

  var year = dateTime.getFullYear()
  var month = dateTime.getMonth() + 1
  var day = dateTime.getDate()
  var hour = dateTime.getHours()
  var minute = dateTime.getMinutes()
  // var second = dateTime.getSeconds();
  var now = new Date()
  // var now_new = Date.parse(now.toDateString());  //typescript转换写法
  var now_new = Date.parse(new Date()) //typescript转换写法

  if (hour < 10) hour = '0' + hour
  if (minute < 10) minute = '0' + minute
  var milliseconds = 0
  var timeSpanStr

  milliseconds = now_new - time
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚'
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前'
  } else if (
    1000 * 60 * 60 * 1 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24
  ) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
  } else if (
    1000 * 60 * 60 * 24 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24 * 15
  ) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
  } else if (
    milliseconds > 1000 * 60 * 60 * 24 * 15 &&
    year === now.getFullYear()
  ) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  }
  return timeSpanStr
}

export function setTime(val, format) {
  const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
  if (val) {
    let date = new Date(val)
    date.setHours(date.getHours() + 8)
    //勿删
    // eslint-disable-next-line no-unused-vars
    let [whole, yy, MM, dd, hh, mm, ss] = date.toISOString().match(REGEX)
    // const year = new Date().getFullYear(),
    //     month = new Date().getMonth() + 1,
    //     dates = new Date().getDate();
    if (dd < 10) dd = dd.substring(1)
    if (MM < 10) MM = MM.substring(1)
    if (format) {
      return format
        .replace('yyyy', yy)
        .replace('yy', yy.slice(2))
        .replace('MM', MM)
        .replace('dd', dd)
        .replace('hh', hh)
        .replace('mm', mm)
        .replace('ss', ss)
      //}
    } else {
      // return [yy, MM, dd].join('-') + ' ' + [hh, mm, ss].join(':');
      return [yy, MM, dd].join('-')
    }
  } else {
    return '--'
  }
}

// 时间转换   35s  => 00:35
export function countdownTime(time) {
  if (time > -1) {
    var hour = Math.floor(time / 3600)
    var min = Math.floor(time / 60) % 60
    var sec = time % 60
    if (sec < 10) {
      sec = '0' + sec
    }
    if (min < 10) {
      min = '0' + min
    }
    if (hour > 0) {
      if (hour < 10) return '0' + hour + '时' + min + '分' + sec + '秒'
      return hour + '时' + min + '分' + sec + '秒'
    }
    return min + '分' + sec + '秒'
  }
}

// 转换时间戳
export function dateFormat(dateData) {
  var date = new Date(dateData)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}
