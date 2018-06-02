var app = getApp();
var utils = require('../../utils/util.js');
var urls = []
Page({
  data: {
    files: [],
    filesUrl: [],
    holdDate: '',
    holdTime: '',
    placeName: '请选择活动地址',
    placeAddress: '',
    latitude: '',
    longitude: '',
    sendInfo: '',
    userMessage: '' ,
    hostName: '',
    hostAvatar: '',
    partnerNum: 0,
  },

  onLoad: function (e) {
    console.log("--onload--")
    this.setData({
      userInfoNow: app.globalData.userInfo
    })
    this.getTime();
  },

  clear: function () {
    this.setData({
      files: [],
      filesUrl: [],
      placeName: '请选择活动地址',
      placeAddress: '',
      latitude: '',
      longitude: '',
      hostName: '',
      hostAvatar: '',
      partnerNum: 0,
    })
    urls = []
  },
  cleanInput: function () {
    var setMessage = { sendInfo: this.data.userMessage }
    this.setData(setMessage)
  },
  //获取系统的时间
  getTime: function () {
    var date = new Date();
    var fullDay = utils.formatTimeYMD(date)
    var fullTime = utils.formatTimeHM(date)
    this.setData({
      holdDate: fullDay,
      holdTime: fullTime,
    })
  },
  //展示图片
  gotoShow: function () {
    var that = this;
    var pics = this.data.pics;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        that.setData({
          pics: imgsrc,
        })
      },
    })
  },
  //选图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });

      }
    })

  },
  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //日期选择器
  bindDateChange: function (e) {
    var that = this
    that.setData({
      holdDate: e.detail.value
    });
  },
  //时间选择器
  bindTimeChange: function (e) {
    var that = this
    that.setData({
      holdTime: e.detail.value
    });
  },
  //选择地点
  openMap: function () {
    var that = this
    wx.choose
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          placeName: res.name,
          placeAddress: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
  },
  //textarea输入内容
  textInput(e) {
    this.setData({
      userMessage: e.detail.value
    })
  },
  //点击提交按钮
  send(e) {
    var that = this
    if (!this.data.userMessage || !this.data.latitude) {
      wx.showModal({
        showCancel: false,
        content: '请确认是否输入了活动内容及选择了活动地址',
      })
    } else {
      var date = new Date();
      var updated_time = utils.formatTime(date)
      if (app.globalData.userInfo == null) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
      else {
        that.updateImg();
        wx.showLoading({
          title: '图片上传中...',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        var List = {
          holdDate: this.data.holdDate,
          holdTime: this.data.holdTime,
          placeName: this.data.placeName,
          placeAddress: this.data.placeAddress,
          content: this.data.userMessage,
          latitude: this.data.latitude,
          longitude: this.data.longitude,
          hostName: app.globalData.userInfo.nickName,
          hostAvatar: app.globalData.userInfo.avatarUrl,
          updatedTime: updated_time,
          imgs: urls,
        }
        setTimeout(function () {
          wx.showModal({
            title: '确认提交',
            content: '请确认提交的信息是否准确',
            success: function (res) {
              if (res.confirm) {
                let tableID = '35678'
                let Activity = new wx.BaaS.TableObject(tableID)
                let activity = Activity.create()

                activity.set(List).save().then(res => {
                  that.clear()
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }, err => {
                  console.log('数据提交失败')
                  that.clear()
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                that.clear()
              }
            }
          })
        }, 1500)

      }
    }

  },
  updateImg: function () {
    let that = this
    let MyFile = new wx.BaaS.File()
    for (var i in this.data.files) {
      let fileParams = { filePath: this.data.files[i] }
      let metaData = { categoryID: '5b02d567f32f801c556723ee' }
      MyFile.upload(fileParams, metaData).then(res => {
        let data = res.data
        urls.push(data.path)
      }, err => { })
    }
  }
})