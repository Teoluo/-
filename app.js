//app.js

App({
  onLaunch: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    
    
    
    // 引入 SDK
    require('./utils/sdk-v1.4.0.js')

    // 初始化 SDK
    let clientID = '518dd0600b9dfc75151b'
    wx.BaaS.init(clientID)

    wx.BaaS.login(false).then(res => {
      this.globalData.userID=res.id
    }, res => {
      
    })
  },
  
  globalData: {
    userID:'',
    userInfo: null,
    clientId: '518dd0600b9dfc75151b', // 从 BaaS 后台获取 ClientID
    tableId: 35679, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
  },

})