Page({

  data: {
    files: [],
    date:'',
    time:'',
    locationName:'',
    locationAddress:'',
  },
  formSubmit: function (e) {
    console.log(e);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  gotoShow:function(){
    var that=this;
    var pics=this.data.pics;
    wx.chooseImage({
      count:9,
      sizeType:['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var imgsrc=res.tempFilePaths;
        pics=pics.concat(imgsrc);
        that.setData({ 
          pics: imgsrc,
         })
      },
    })
  },
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
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindDateChange: function (e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    });
    console.log(this.data.date);
  },
  bindTimeChange: function (e) {
    console.log(e);
    this.setData({
      time: e.detail.value
    });
    console.log(this.data.time);
  },

  openMap:function (){
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        this.setData({
          locationName:res.name,
          locationAddress:res.address,
        })
      },
    })
  }
})