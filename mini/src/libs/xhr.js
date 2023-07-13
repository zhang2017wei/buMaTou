import Taro from '@tarojs/taro'

export default class Xhr {
  static get(url, options={}) {
    Xhr.getJson(url).then(res => {
      if (options.onComplete) options.onComplete(res);
    }).catch(e => {
      if (options.onError) options.onError(null, null, e.message);
    });
  }

  static post(url, data, options={}) {
    Xhr.postJson(url, data).then(res => {
      if (options.onComplete) options.onComplete(res);
    }).catch(e => {
      if (options.onError) options.onError(null, null, e.message);
    });
  }

  static getJson(url, options) {
    var options = options || {};
    return new Promise((resolve, reject) => {
      Taro.request({
        url: Xhr._withUrl(url),
        header: Xhr.getHeader(),
        headers: {
          Accept: 'application/json',
          Authorization: 'e6d5bb4c61799f3'
        }
      }).then((res) => {
        if (res.statusCode != 200 || typeof res.data == 'string') {
          reject({ message: "error json" });
        } else {
          if (res.data.success === true || options.disableAutoError) {
            resolve(res.data);
          } else {
            reject({ message: res.data.msg || '服务返回数据异常' });
          }
        }
      }).catch((e) => {
        reject({ message: '网络请求错误' });
      });
    });
  }


  static postJson(url, data, options) {
    // var options = options || {};
    return new Promise((resolve, reject) => {
      Taro.request({
        url: Xhr._withUrl(url),
        data: data,
        method: 'post',
        header: Xhr.getHeader(),
      }).then((res) => {
        // if (res.statusCode != 200 || typeof res.data == 'string') {
        //   reject(Xhr._getEror(res));
        // } else {
        //   if (res.data.success === true || options.disableAutoError) {
        //     resolve(res.data);
        //   } else {
        //     reject({ message: res.data.msg || '服务返回数据异常' });
        //   }
        // }
      }).catch((e) => {
        reject({ message: '网络请求错误' });
      });
    });
  }

  static _withUrl(url) {
    // development: 'http://192.168.11.46:80',
    //   production: 'https://api.91hotplay.com'
    const baseUrl = 'https://api.91hotplay.com/'
    return baseUrl + url
  }

  static getHeader() {
    return {
      'User-Channel': 'weapp_party', //渠道号
      'Accept': 'application/json',
      'Authorization': 'e6d5bb4c61799f3',
    };
  }
}
