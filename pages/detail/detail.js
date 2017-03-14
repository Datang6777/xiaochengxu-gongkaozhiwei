var app = getApp()
import chartWrap from './chartWrap'
import getConfig from './getConfig'
Page({
    onShareAppMessage: function () {
        return {
            title: '我中意的公考职位详情',
            path: '/pages/detail/detail?id=+id',
        }
    },
    data: {

    },
    onLoad: function (e) {
        let pageThis=this
        var id = e.id
        var me = this;
        wx.request({
            url: 'https://proc.huatu.com/0zw/detail.php?id=' + id,
            method: 'GET',
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                var d = res.data
             
                
                me.setData({
                    d: d,
                    bmmc:res.data[0].label,
                    zwmc:res.data[0].zwmj,
                    
                })

               if(res.data[0].msfs==null){
                    me.setData({
                        msfs0:'--'
                    })
               }else{
                   me.setData({
                        msfs0:res.data[0].msfs
                    })
               }
                wx.request({
                    url: 'https://proc.huatu.com/0zw/canvas.php',
                    data: {
                        bmmc:me.data.bmmc,
                        zwmc:me.data.zwmc
                        //bmmc:'北京出入境边防检查总站',
                        //zwmc:'检查队科员'
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function(res){
                        me.setData({
                            year:res.data.year,
                            msfs:res.data.msfs
                        })

                        
        app.deviceInfo.then(function(deviceInfo){
          
            
            let labels=pageThis.data.year
            let data=pageThis.data.msfs
            let width=Math.floor(deviceInfo.windowWidth-(deviceInfo.windowWidth/750)*10*2)//canvas宽度
            let height=Math.floor(width/1.6)//这个项目canvas的width/height为1.6
            let canvasId='myCanvas'
            let canvasConfig={
                width:width,
                height:height,
                id:canvasId
            }
            let config=getConfig(canvasConfig,labels,data)
            chartWrap.bind(pageThis)(config)

        })
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
            }
        })
        
        

    },
    send: function (e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../send/send?id=' + id,
        })
    },
    qita: function () {

        wx.navigateBack({
            delta: 1
        })
    },
  onShow: function () {
        
    }
});
