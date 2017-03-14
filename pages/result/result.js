// pages/result/result.js
Page({
  data: {
    page:1,
    loadHidden:true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
   
    var that = this;
    var diqu = options.diqu
    var gongzuo = options.gongzuo
    var zhengzhi = options.zhengzhi
    var xueli = options.xueli
    var zy = options.zy
    that.setData({
      diqu:options.diqu,
      gongzuo:options.gongzuo,
      zhengzhi:options.zhengzhi,
      xueli:options.xueli,
      zy:options.zy
    })
    wx.request({
      url: 'https://proc.huatu.com/0zw/test.php',
      method: 'GET',
      data: { diqu: diqu, gongzuo: gongzuo, zhengzhi: zhengzhi, xueli: xueli, zy: zy,page:1 },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        var c = res.data.data
      
        if (c.length < 1) {
          // wx.showModal({
          //   title: '提示',
          //   showCancel: false,
          //   content: '结果为空，换个查询条件试试噢！'
          // });
          // wx.redirectTo({
          //   url: '../index/index',
          // })
        } else { 
          that.setData({
            result: c,
            alow:res.data.sum
          })
          
        }
      }
    })
  },
  nextPage:function(e){
    var that = this;
    that.setData({
      loadHidden:false
    })
    var np;
    var newpage=e.currentTarget.dataset.p
    if(newpage==that.data.alow){
      np=that.data.alow
    }else{
      np=newpage+1
    }
    
    var diqu = that.data.diqu
    var gongzuo = that.data.gongzuo
    var zhengzhi = that.data.zhengzhi
    var xueli = that.data.xueli
    var zy = that.data.zy
    wx.request({
      url: 'https://proc.huatu.com/0zw/test.php',
      data: {
         diqu: diqu, gongzuo: gongzuo, zhengzhi: zhengzhi, xueli: xueli, zy: zy,page:np 
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          result:res.data.data,
          page:np,
          loadHidden:true
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  prePage:function(e){
    var that = this;
    that.setData({
      loadHidden:false
    })
    var np;
    var newpage=e.currentTarget.dataset.p
    if(newpage==1){
      np=1
    }else{
      np=newpage-1
    }
    
    var diqu = that.data.diqu
    var gongzuo = that.data.gongzuo
    var zhengzhi = that.data.zhengzhi
    var xueli = that.data.xueli
    var zy = that.data.zy

    wx.request({
      url: 'https://proc.huatu.com/0zw/test.php',
      data: {
         diqu: diqu, gongzuo: gongzuo, zhengzhi: zhengzhi, xueli: xueli, zy: zy,page:np 
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          result:res.data.data,
          page:np ,
          loadHidden:true
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  RedirectHandle: function (event) {
    //console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + event.currentTarget.dataset.id,

    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})