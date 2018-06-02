var app = getApp();
Page({

  data: {

  },
  
  userInfoHandler:function(res){
    app.globalData.userInfo=res.detail.userInfo
    if (app.globalData.userInfo){
      
      wx.navigateBack({})
      
    }else{
      wx.showToast({
        title: '获取失败，请重试',
        icon:'loading',
        duration:1000,
      })
    }
  },

  onLoad: function (options) {
    console.log("login")
    console.log(app.globalData.userInfo)
    
  },


})