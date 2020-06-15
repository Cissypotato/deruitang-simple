const app = getApp()

Page({
   data: {
      num: 0,
      index_1: 0,
      countPic: 1,
      
   },
   onLoad: function(options) {
     let com_id=options.com_id
     let address_id=options.address_id
     let user_id = wx.getStorageSync("userId")
     
     if(address_id) {
      this.setData({address_id})
      this.getInitData(user_id,com_id,address_id)
     }else{
      this.getInitData(user_id,com_id)
     }
     
     
     
      this.setData({
         com_id,user_id
      })


   },

   onShow: function() {
      let isReal = wx.getStorageSync("isReal")
      if(isReal) this.setData({isReal})
      
   },
   toCertify(){
      wx.navigateTo({
        url: '../../personal/certify/certify',
      })
   },
   onMyEvent: function (e) {//多图上传组件事件
      console.log(e.detail)// 自定义组件触发事件时提供的detail对象
      this.setData({
          img_path:e.detail.img_path
      })
  }, 
   getInitData(user_id,com_id,address_id){
      console.log(address_id)
      wx.request({
        url: 'https://zxwz.guaishe.com/index/Medicine/Orderlist',
        data: {
         user_id,
         medicine_id:com_id?com_id:2,
         address_id
        },
        success: (result) => {
           if(result.data.data.address){
              this.setData({
                 address:result.data.data.address,
              })
           }
           this.setData({
              medicine:result.data.data.medicine
           })
           console.log(result)
        },
      })
   },
   
   
   toAddress() {
      let com_id = this.data.com_id
      console.log(com_id)
      wx.navigateTo({
         url: '/pages/personal/address/address?user_id=' + wx.getStorageSync("userId") + '&com_id=' + com_id,
      })
   },
   scroll(e) {
      // console.log(e)
   },
   topay() { //预约并支付
      if (this.data.address == null) {
         app.alert("请填写地址")
      }else if (this.data.medicine.classify_id==1 && !this.data.isReal) {
         app.alert("您还没有实名认证")
      }else if (this.data.medicine.classify_id==1 &&!this.data.img_path) {
         app.alert("请上传处方图片")
      }else {
         app.alert("提交需求成功")
         setTimeout(()=>{
            wx.navigateBack({
               delta:2
            })},2000)
         // wx.request({
         //   url: 'https://zxwz.guaishe.com/index/pays/addOrder',
         //   complete: (res) => {},
         //   data: {
         //    user_id:this.data.user_id,
         //      medicine_id:this.data.com_id,
         //      address_id:this.data.address_id?this.data.address_id:this.data.address.id
         //   },
         //   success: (result) => {
         //      console.log(result)
         //   },
         // })
        
         

      }
   },
  
});