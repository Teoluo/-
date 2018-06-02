// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onPullDownRefresh: function () {
    wx.vibrateShort();
    console.log('刷新啦search');
    //填写要刷新的数据了
    success: {
      wx.stopPullDownRefresh();
    }

  }
})