var app = getApp()
var IMG = "https://cloud-minapp-14538.cloud.ifanrusercontent.com/1fMQftPWEtwNAIhy.jpg"
Page({
  data: {
    activities: [],
    posterUrl: IMG
  },
  onLoad: function (options) {
    this.queryActivityByAid(app.globalData.userID);
  },
  onShow: function () {
    this.onLoad()
  },
  queryActivityByAid: function (uid) {
    var query = new wx.BaaS.Query()
    query.compare('created_by', '=', uid);
    var Product = new wx.BaaS.TableObject(35678)
    Product.orderBy('-created_at')//倒叙
    Product.setQuery(query).find().then(res => {
      console.log(res.data.objects.imgs)
      if (res.data.objects) {
        this.setData({
          hasUserInfo: true,
          activities: res.data.objects
        })
        console.log(this.data.activities)
      } else {
        this.setData({
          hasUserInfo: false,
        })
      }
      
    }, err => {
      // err
    })
  },

  delete: function (e) {
    var that = this
    let tableID = 35678
    let recordID = e.currentTarget.dataset.aid
    let Product = new wx.BaaS.TableObject(tableID)
    wx.showModal({
      content: '是否想要删除此活动',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          Product.delete(recordID).then(res => {
            wx.showToast({
              title: '成功删除活动',
              icon: 'success',
              duration: 2000
            })
            that.onLoad()
          }, err => {
            // err
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },

})