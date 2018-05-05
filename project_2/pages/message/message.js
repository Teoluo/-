// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unRead:3,
  },
  openChat:function(){
    wx.navigateTo({
      url: '../chat/chat',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  onPullDownRefresh: function () {
    wx.vibrateShort();
    console.log('刷新啦message');
    //填写要刷新的数据了
    success: {
      wx.stopPullDownRefresh();
    }

  }
})