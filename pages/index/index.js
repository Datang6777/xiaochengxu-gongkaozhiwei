var app = getApp()

Page({
    data: {
        loginBtnTxt: "查询职位",
        loginBtnBgBgColor: "#1AAD19",
        btnLoading: false,
        disabled: false,
        // text:"这是一个页面"
        imgUrls: [
            '../image/header.jpg',
            '../image/header2.jpg',
            '../image/header3.jpg',
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        movies: [],
        hidden: false,
        diqu: ['请选择', '国家', '北京', '河北', '山西', '上海', '重庆', '天津', '内蒙古', '河南', '辽宁', '吉林', '黑龙江', '陕西', '宁夏', '贵州', '四川', '青海', '广西', '海南', '云南', '湖北', '湖南', '安徽', '江苏', '浙江', '福建', '江西', '山东', '甘肃', '广东', '新疆', '西藏'],
        gongzuo: ['请选择','五年及以上', '四年', '三年', '二年', '一年'],
        zhengzhi: ['请选择','中共党员', '共青团员', '群众'],
        xueli: ['请选择','研究生', '本科', '专科'],
        objectArray: [
            {
                id: 0,
                name: '请选择'
            },
            {
                id: 1,
                name: '国家'
            },

            {
                id: 2,
                name: '河北'
            },
            {
                id: 3,
                name: '山西'
            },
            {
                id: 4,
                name: '上海'
            },
            {
                id: 5,
                name: '重庆'
            },
            {
                id: 6,
                name: '天津'
            },
            {
                id: 7,
                name: '内蒙古'
            },
            {
                id: 8,
                name: '河南'
            },
            {
                id: 9,
                name: '北京'
            },
            {
                id: 10,
                name: '吉林'
            },
            {
                id: 11,
                name: '黑龙江'
            },
            {
                id: 12,
                name: '陕西'
            },
            {
                id: 13,
                name: '宁夏'
            },
            {
                id: 14,
                name: '四川',
            },
            {
                id: 15,
                name: '青海',
            },
            {
                id: 16,
                name: '广西',
            },
            {
                id: 17,
                name: '海南',
            },
            {
                id: 18,
                name: '云南',
            },
            {
                id: 19,
                name: '湖北',
            },
            {
                id: 20,
                name: '湖南',
            },
            {
                id: 21,
                name: '安徽',
            },
            {
                id: 22,
                name: '江苏',
            },
            {
                id: 23,
                name: '浙江',
            },
            {
                id: 24,
                name: '福建',
            },
            {
                id: 25,
                name: '江西',
            },
            {
                id: 26,
                name: '山东',
            },
            {
                id: 27,
                name: '甘肃',
            },
            {
                id: 28,
                name: '广东',
            },
            {
                id: 29,
                name: '新疆',
            },
            {
                id: 30,
                name: '西藏',
            },
            {
                id: 31,
                name: '辽宁'
            },
        ],
        objectArray: [
           {
                id: 0,
                name: '请选择'
            },
            {
                id: 1,
                name: '五年及以上'
            },
            {
                id: 2,
                name: '四年'
            },
            {
                id: 3,
                name: '三年'
            },
            {
                id: 4,
                name: '二年'
            },
            {
                id: 5,
                name: '一年'
            }
        ],

        objectArray: [
            {
                id: 0,
                name: '请选择'
            },
            {
                id: 1,
                name: '中共党员'
            },
            {
                id: 2,
                name: '共青团员'
            },
            {
                id: 3,
                name: '群众'
            }
        ],
        objectArray: [
            {
                id: 0,
                name: '请选择'
            },
            {
                id: 1,
                name: '研究生'
            },
            {
                id: 2,
                name: '本科'
            },
            {
                id: 3,
                name: '专科'
            }
        ],
        index: 0,
        index2: 0,
        index3: 0,
        index4: 0,

    },
    bindPickerChange1: function (e) {
      
        this.setData({
            index: e.detail.value
        })
    },
    bindPickerChange2: function (e) {

        this.setData({
            index2: e.detail.value
        })
    },
    bindPickerChange3: function (e) {
     
        this.setData({
            index3: e.detail.value
        })
    },
    bindPickerChange4: function (e) {
        this.setData({
            index4: e.detail.value
        })
    },
    formSubmit: function (e) {
        this.setLoginData1();
    
        // input 框的值
        var a = e.detail.value
        // 省份名称
        var diqu = this.data.diqu[a.diqu];
       
        //工作经历
        var gongzuo = this.data.gongzuo[a.gongzuo];
       
        //政治面貌
        var zhengzhi = this.data.zhengzhi[a.zhengzhi];
      
        //学历
        var xueli = this.data.xueli[a.xueli];
      
        // 专业
        var zy = a.zy
        var me = this;
        wx.request({
            url: 'https://proc.huatu.com/0zw/test.php',
            method: 'GET',
            data: { diqu: diqu, gongzuo: gongzuo, zhengzhi: zhengzhi, xueli: xueli, zy: zy },
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                var c = res.data.data

                if (c.length < 1) {
                    me.setLoginData2();
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '结果为空，换个查询条件试试噢！'
                    });
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
    },
    setLoginData1: function () {
        this.setData({
            loginBtnTxt: "查询中",
            disabled: !this.data.disabled,
            loginBtnBgBgColor: "#999",
            btnLoading: !this.data.btnLoading
        });
    },
    setLoginData2: function () {
        this.setData({
            loginBtnTxt: "查询职位",
            loginBtnBgBgColor: "#1AAD19",
            disabled: !this.data.disabled,
            btnLoading: !this.data.btnLoading
        });
    },
    onLoad: function () {
        var that = this

    },


});
