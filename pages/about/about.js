// pages/about/about.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    aContent: '',
    aTime: '',
    aPlace: '',
    aId: '',
    aNumber: '',
    paterners: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  login: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  //事件处理函数
  onLoad: function () {
    
    this.setData({
      userInfo: app.globalData.userInfo
    })

    this.queryActivityByAid(app.globalData.userID);
    this.queryPartnerByAid(this.data.aId);
    console.log(this.data.userInfo)
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.vibrateShort();
    this.onShow();
    success: {
      wx.stopPullDownRefresh();
    }
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.queryActivityByAid(app.globalData.userID);
    this.queryPartnerByAid(this.data.aId);
  },

  //按照  uid  查询  活动
  queryActivityByAid: function (uid) {
    var query = new wx.BaaS.Query()
    query.compare('created_by', '=', uid);
    var Product = new wx.BaaS.TableObject(35678)
    Product.orderBy('-created_at')//倒叙
    Product.setQuery(query).find().then(res => {
      if (res.data.objects.length!=0) {
        this.setData({
          hasUserInfo: true,
          aInfo: res.data.objects[0],
          aId: res.data.objects[0].id,
          aContent: res.data.objects[0].content,
          aTime: res.data.objects[0].holdDate + '  ' + res.data.objects[0].holdTime,
          aPlace: res.data.objects[0].placeName,
        })
      } else {
        this.setData({
          hasUserInfo: false,
        })
      }
    }, err => {
      // err
    })
  },
  //按照  aid  查询  所有参与
  queryPartnerByAid: function (aid) {
    var query = new wx.BaaS.Query()
    query.compare('aid', '=', aid);

    var Product = new wx.BaaS.TableObject(36013)  //参与人

    Product.setQuery(query).find().then(res => {
      this.setData({
        partners: res.data.objects,
      })

    }, err => {
      // err
    })
  },
  more: function () {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  }

})
