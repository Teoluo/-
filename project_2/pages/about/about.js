// pages/about/about.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello My World',
    userInfo: {},
    submitNumber:1,
    joinNumber:1,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo == null) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    };
    this.setData({
      userInfo:app.globalData.userInfo
    })

  },
  
  onPullDownRefresh: function () {
    wx.vibrateShort();
    console.log('刷新啦about');
    this.setData({
      submitNumber: 1,
      joinNumber: 1,
    })
    //填写要刷新的数据了
    success: {
      wx.stopPullDownRefresh();
    }
  },
  showdetailinfo1: function () {
    var add=this.data.submitNumber+1;
    this.setData({
      submitNumber:add,
    })
  },
  showdetailinfo2:function(){
    var add = this.data.joinNumber + 1;
    this.setData({
      joinNumber: add,
    })
  }
})
