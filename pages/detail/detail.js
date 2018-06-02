var app = getApp()

Page({

  data: {
    aid: '',
    userID: '',
    userInfo: '',
    aInfo: [],        //活动信息
    partners: [],     //参与者信息
    comment: [],      //评论信息
    isPartner: false,
    thisPartner: [],
    imgs: [],
    latitude: '',
    longitude: '',
    posterUrl: 'https://cloud-minapp-14538.cloud.ifanrusercontent.com/1fMQftPWEtwNAIhy.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.imgs.length)
    
    var Imgs = []
    if (options.imgs) {
      console.log('123')
      Imgs = options.imgs.split(",");
    }

    this.setData({
      userID: app.globalData.userID,
      userInfo: app.globalData.userInfo,
      aid: options.aid,
      longitude: options.longitude,
      latitude: options.latitude,
      imgs: Imgs,

    })

    console.log(this.data.posterUrl)
    this.queryActivityByAid(this.data.aid);
    this.queryCommentByAid(this.data.aid);
    this.queryPartnerByAid(this.data.aid);
    this.queryPartnerByAidAndUid(this.data.aid);

  },
  onShow: function () {
    console.log("asd")
    console.log(this.data.userID)
    console.log(this.data.aInfo.created_by)
    console.log(this.data.comment)
    this.queryActivityByAid(this.data.aid);
    this.queryCommentByAid(this.data.aid);
    this.queryPartnerByAid(this.data.aid);
    this.queryPartnerByAidAndUid(this.data.aid);
  },

  //预览图片
  clickImg: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imgs,
    })
  },

  //按照  aid  查询  活动
  queryActivityByAid: function (aid) {
    var query = new wx.BaaS.Query()
    query.compare('id', '=', aid);
    var Product = new wx.BaaS.TableObject(35678)
    Product.setQuery(query).find().then(res => {
      this.setData({
        aInfo: res.data.objects[0],
      })
    }, err => {
      // err
    })
  },

  //按照  aid  查询  留言
  queryCommentByAid: function (aid) {
    var query = new wx.BaaS.Query()
    query.compare('aid', '=', aid);
    var Product = new wx.BaaS.TableObject(36011)//评论
    Product.orderBy('-created_at')//倒叙
    Product.setQuery(query).find().then(res => {
      this.setData({
        comment: res.data.objects,
      })
    }, err => {
      // err
    })
  },

  //按照  aid  查询  本机用户是否参与
  queryPartnerByAidAndUid: function (aid) {
    var query1 = new wx.BaaS.Query()
    var query2 = new wx.BaaS.Query()
    query1.compare('aid', '=', aid);
    query2.compare('created_by', '=', app.globalData.userID);
    var andQuery = wx.BaaS.Query.and(query1, query2)
    var Product = new wx.BaaS.TableObject(36013)  //参与人
    Product.setQuery(andQuery).find().then(res => {
      if (res.data.objects.length == 0) {
        this.setData({
          isPartner: false,
        })
      } else {
        this.setData({
          isPartner: true,
          thisPartner: res.data.objects[0],
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

  //写留言
  submitComment: function (e) {
    wx.navigateTo({
      url: '/pages/comment/comment?aid=' + e.currentTarget.dataset.aid + '&username=' + e.currentTarget.dataset.username + '&useravatar=' + e.currentTarget.dataset.useravatar,
    })
  },

  //点击参与  数据库  partners+1
  addPartner: function () {
    var that = this
    let Product = new wx.BaaS.TableObject(36013)
    let product = Product.create()
    let apple = {
      aid: this.data.aid,
      userName: this.data.userInfo.nickName,
      userAvatar: this.data.userInfo.avatarUrl,
    }
    product.set(apple).save().then(res => {

    }, err => {
      // err
    })
  },

  //点击取消  数据库  partners-1
  deletePartner: function () {
    var that = this
    let tableID = 36013
    let recordID = this.data.thisPartner.id
    let Product = new wx.BaaS.TableObject(tableID)
    Product.delete(recordID).then(res => {

    }, err => {
      // err
    })
  },


  //点击删除评论
  deleteComment: function (e) {
    let tableID = 36011
    let recordID = e.currentTarget.dataset.commentid
    let Product = new wx.BaaS.TableObject(tableID)
    Product.delete(recordID).then(res => {
      this.queryCommentByAid(this.data.aid);
      wx.showToast({
        title: '成功删除评论',
        icon: 'success',
        duration: 2000
      })
    }, err => {
      // err
    })
  },
  //打开地图
  getLocation: function () {
    var latitude = this.data.aInfo.latitude
    var longitude = this.data.aInfo.longitude
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
    })
  },
  lookPartner: function () {
    wx.navigateTo({
      url: '/pages/userinfo/userinfo?aid=' + this.data.aid,
    })
  },
  //点击加入按钮  参加活动
  btnJoin: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      that.addPartner();
      wx.showModal({
        content: '恭喜您已加入成功！',
        showCancel: false,
        success: function (res) {
          that.onShow();
        }
      });
    }
  },

  //点击加入按钮  取消活动  
  btnCancel: function () {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      this.deletePartner();
      wx.showModal({
        content: '你已取消了活动,我们还有其他丰富的活动在等你哟！',
        showCancel: false,
        success: function (res) {
          that.onShow();
        }
      });
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  }
})