//app.js
let Promise = require('./libs/ES2015ponyfill/promise').Promise
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.deviceInfo=this.promise.getDeviceInfo();
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
    promise:{
    getDeviceInfo:function(){//获取设备信息
      let promise=new Promise((resolve,reject)=>{
        wx.getSystemInfo({
          success: function (res) {
            resolve(res)
          },
          fail:function(){
            reject()
          }
        })
      })
      return promise
    }
  },
  getGid:(function(){//全局唯一id
    let id=0
    return function(){
      id++
      return id
    }
  })
})