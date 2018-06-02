var utils = require('../../utils/util.js');

Page({
  data: {
    aid:'',
    userName: '',
    userAvatar: '',
    userComment:'',
    date:''
  },

  onLoad: function (options) {
    console.log('option:')
    console.log(options)
    this.setData({
      aid: options.aid,
      userName: options.username,
      userAvatar: options.useravatar,
    })
    
  },
  //按提交按钮
  submitComment:function(){
    this.getTime();
    this.updateComment();
  },

  //获取现在的时间
  getTime: function () {
    var date = new Date();
    var fullDay = utils.formatTimeYMD(date)
    var fullTime = utils.formatTimeHM(date)
    var date = fullDay + ' ' + fullTime
    this.setData({
      date:date
    })
  },
  //检测textarea输入内容
  textInput(e) {
    console.log(e.detail.value)
    this.setData({
      userComment: e.detail.value
    })
  },
  //更新数据库
  updateComment: function () {
    let Comment = new wx.BaaS.TableObject(36011)
    let comment = Comment.create()
    var userComment=''
    var list = {
      aid: this.data.aid,
      userName: this.data.userName,
      userAvatar: this.data.userAvatar,
      userComment: this.data.userComment,
      updateTime:this.data.date
    }
    console.log('传输数据')
    console.log(list)
    if (this.data.userComment) {
      comment.set(list).save().then(res => {
        console.log('数据提交成功')
        // 返回一层
        wx.navigateBack({
          delta: 1
        })
      }, err => {
        console.log('数据提交失败')
      })
    }
    else {
      wx.showModal({
        showCancel: false,
        content: '请确认是否输入了活动内容',
      })
    }
  },
})