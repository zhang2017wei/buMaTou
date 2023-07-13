/* eslint-disable */
/* 获取URL中search参数的值 */
export const getParameterValue = (parameter) => {
  var reg = new RegExp('(^|&)' + parameter + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/* 获取URL中hash参数的值 */
export const getParameterHashValue = (parameter) => {
  var reg = new RegExp('(^|&)' + parameter + '=([^&]*)(&|$)', 'i')
  var r = window.location.hash.substr(3).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/* 判断Object是否为空 */
export const isEmptyObject = (items) => {
  for (let item in items) {
    return false
  }
  return true
}

// 判断手机型号 安卓 or IOS
export const judgeModel = (items) => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    return 1
  }
  if (isIOS) {
    return 2
  }
}
