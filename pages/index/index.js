const app = getApp();
Page({
  data: {
    userInfo:[],
    contentInfo: [],
  },

  //点击内容   获取活动详情
  getDetail: function (e) {
    var imgs = JSON.stringify(e.currentTarget.dataset.imgs);
    wx.navigateTo({
      url: '../detail/detail?aid=' + e.currentTarget.dataset.aid + '&uid=' + e.currentTarget.dataset.uid + '&latitude=' + e.currentTarget.dataset.latitude + '&longitude=' + e.currentTarget.dataset.longitude + '&imgs=' + e.currentTarget.dataset.imgs,
    })
  },

  //点击图片图片预览
  photoTap: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current,
      urls: this.data.imgList,
    })
  },

  //下拉刷新  更新数据库内容
  onPullDownRefresh: function () {
    wx.vibrateShort();
    success: {
      this.onShow();
      wx.stopPullDownRefresh();
    }
  },

  //每次页面打开触发
  onShow: function () {
    //查询数据库信息
    this.queryDB();
    // this.queryPartner();
    
  },

  //查询数据库信息
  queryDB: function () {
    var query = new wx.BaaS.Query()
    var Product = new wx.BaaS.TableObject(35678)
    Product.orderBy('-created_at')
    Product.setQuery(query).find().then(res => {
      this.setData({
        contentInfo: res.data.objects,
      })
      // this.changeDate();
      console.log(this.data.contentInfo)
    }, err => {
      //error
      console.log('数据可查询错误')
    })
  },

  // 搜索相关
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})
