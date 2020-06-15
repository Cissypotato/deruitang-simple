// pages/index/detail/detail.js
const app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        com_id:1,
        imgSrc:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id=options.id
        console.log(id)
        this.setData({
            com_id:id
        })
        wx.showLoading()
        setTimeout(()=>{
            wx.hideLoading()
        },1500)
        this.getInitData(id)
    },

    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    getInitData(id){
        console.log(id)
        wx.request({
          url: 'https://zxwz.guaishe.com/index/Medicine/detailslist?medicine_id='+id,
          success: (result) => {
              console.log(result.data.data.img)
              this.setData({
                  imgSrc:result.data.data.img
              })
          },
        })
    },
    toOrder(){
        let user_id=wx.getStorageSync('userId')
        // let user_id=1
        if(!user_id){
            app.alert("请登录后购买")
            setTimeout(()=>{
                wx.navigateTo({
                    url: '/pages/personal/login/login',
                  })
            },1000)
        }else{
            wx.navigateTo({
                url: '../order/order?com_id='+this.data.com_id,
              })
        }
        
    }
    
})