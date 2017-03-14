var util = require("../../utils/util.js");
var app = getApp()
Page({
    data: {
        loginBtnTxt: "发送短信",
        loginBtnBgBgColor: "#1AAD19",
        btnLoading: false,
        disabled: false,
        // text:"这是一个页面"
    },
    onLoad: function (id) {

        var id = id
        var that = this
        that.setData({
            d: id,
        })
    },
    formSubmit: function (e) {
        var that = this

        console.log(e);
        var param = e.detail.value;
        console.log(param);
        this.mysubmit(param);
    },
    mysubmit: function (param) {
          var that = this;
        var flag = this.checkUserName(param)
        var id = that.data.d
        console.log(id);
      
        console.log(param);
        if (flag) {
            this.setLoginData1();
            wx.request({
                url: 'https://proc.huatu.com/0zw/daima/duanxin/dx.php',
                method: 'GET',
                data: { id: id, mobile: param },
                // header: {
                //     'Accept': 'application/json'
                // },
                success: function (res) {
                    var c = res.data
                    console.log(c);
                    if (c < 12) {
                        that.setLoginData2();
                        wx.showToast({
                                title: '发送成功,请及时查收!',
                                icon: 'success',
                                duration: 1500,
                                success:function(){
                                    
                                }
                            });
                        setTimeout(function () {
                            
                             wx.navigateBack({
                                delta: 1, // 回退前 delta(默认为1) 页面
                                success: function(res){
                                    // success
                                }
                            })
                            // that.setregistData2();
                            // that.redirectTo(param);
                        }, 2000);
                        // wx.redirectTo({
                        //     url: '../index/index',
                        // })
                       

                    } else {
                        me.setLoginData2();
                        wx.navigateTo({
                            url: '../result/result?diqu=' + diqu + '&gongzuo=' + gongzuo + '&zhengzhi=' + zhengzhi + '&xueli=' + xueli + '&zy=' + zy,
                            success: function (res) {
                            }
                        })
                    }
                }


            })

        }
    },
    checkUserName: function (param) {
        var phone = util.regexConfig().phone;
        var inputUserName = param.mobile
        if (phone.test(inputUserName)) {
            return true;
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请输入正确的手机号码'
            });
            return false;
        }
    },

    setLoginData1: function () {
        this.setData({
            loginBtnTxt: "发送中",
            disabled: !this.data.disabled,
            loginBtnBgBgColor: "#999",
            btnLoading: !this.data.btnLoading
        });
    },
    setLoginData2: function () {
        this.setData({
            loginBtnTxt: "发送短信",
            loginBtnBgBgColor: "#1AAD19",
            disabled: !this.data.disabled,
            btnLoading: !this.data.btnLoading
        });
    },


});
