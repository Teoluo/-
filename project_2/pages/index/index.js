//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userName: 'Teoluo',
    time: '20:18',
    location: '成都',
    count:'0',
    content: 'card body card body card body card body card body  card body 参与参与参与参与参与参与参与参与参与参与参与参与参与参与参与参与参与参与',
    imgList: [
  'https://bpic.588ku.com/original_origin_min_pic/18/01/05/efced62b52b8840df988c0823dc014f7.jpg!r650',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524730028374&di=e3c2cdcea4335ce7133cca3cda449d70&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fae51f3deb48f8c54c8a5db4236292df5e0fe7f6c.jpg',
      '/imgs/message-selected.png',
      '/imgs/map.png',
      '/imgs/index-selected.png',
      '/imgs/process.png',
      '/imgs/search-selected.png',
      '/imgs/trust.png',
      '/imgs/add-selected.png',
    ],
  },
  //事件处理函数
  getUserInfo: function () {
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  getDetail:function (){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  photoTap: function (e) {
    console.log(e);
    var current = e.target.dataset.src;
    console.log(current);
    wx.previewImage({
      current: current,
      urls: this.data.imgList,
    })
  },
  onPullDownRefresh: function () {
    wx.vibrateShort();
    console.log('刷新啦首页');
    //填写要刷新的数据了
    success:{
      wx.stopPullDownRefresh();
    }
    
  }
})
