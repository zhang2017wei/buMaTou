/* eslint-disable */
export default {
  base: {
    domain: {
      development: 'http://192.168.11.46:80',
      production: 'https://api.91hotplay.com'
    },
    path: {
      saveDataUrl: 'go/games/webconfig/save', // 新增 or 保存
      getListUrl: 'go/games/webconfig/list', // 活动列表
      getDetailUrl: 'go/games/webconfig/detail', // 活动数据详情
      deleteListUrl: 'go/games/webconfig/delete', // 删除

      saveServerAcUrl: 'go/games/webconfig/saveServerActivity', // 保存服务端活动配置
      getServerAcUrl: 'go/games/webconfig/getServerActivitys', // 服务端活动列表
      getServerDetailUrl: 'go/games/webconfig/getServerActivityDetail', // 服务端活动详情
      unionInfoUrl: 'go/games/webconfig/unionInfo', // 获取联盟的简易信息
      userInfoUrl: 'go/games/webconfig/userInfo', // 获取用户的简易信息 uid
      loginUrl: 'go/games/webconfig/serverLogin',
      sendLinkUrl: 'go/games/webconfig/sendPreviewMsg'
    }
  }
}
