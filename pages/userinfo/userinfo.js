var app=getApp();
Page({

  data: {
    partners:[]
  },
  onLoad: function (options) {
    console.log(options)
    this.queryPartnerByAid(options.aid)
    
  },
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
  onPullDownRefresh:function(){
    console.log(this.data.partners)
  }
})