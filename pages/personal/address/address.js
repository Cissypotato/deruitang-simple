// pages/personal/address/address.js
const app = getApp()
let appUrl = app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    isLogin: false,
    hasAddress:true
  },
   onLoad: function (options) {
       console.log(options)
     let com_id = options.com_id
     console.log(com_id)
     this.setData({
       com_id
     })
  },
  onShow: function (options) {
    
    let user_id=wx.getStorageSync("userId")
    console.log(user_id)
    this.setData({
      user_id,
    })
    wx.request({
      url: "https://zxwz.guaishe.com/index/Address/address_list",
      data: {
          user_id
      },
      success: (res) => {
        console.log(res)
        console.log(res.data.info)
        if (res.data.info === "暂无地址") {
          this.setData({
            hasAddress: false
          })
        } else {
          this.setData({
            hasAddress: true,
            addressList: res.data.info
          })
        }

      },
    })
  },

  toAddAdress(){//新建地址

    wx.navigateTo({
      url: './addAddress/addAddress',
    })

  },
  handleChange(event){
    let id = event.currentTarget.dataset.id
    // let addressList=this.data.addressList
    // for (let i=0;i<addressList.length;i++){
    //     if(id==addressList[i].id){
    //         addressList[i]['default']==2
    //         this.setData({
    //             addressList
    //         })
    //     }
    // }
    // wx.request({
    //     url: appUrl + '/index.php/index/address/select_address',
    //   data: {
    //     "id": id,
    //     user_id: wx.getStorageSync('token')
    //   },
    //   success: (res) => {
    //     if (res.data.state) {

    //           this.onShow()
    //     }
         
    //   },
    // })
    wx.redirectTo({
        url: '/pages/index/order/order?address_id='+id+'&com_id='+this.data.com_id,
    })
  },
  deleteAddress(event){//删除地址
   let id=event.currentTarget.dataset.id
   console.log(id,'id')
   wx.showModal({
    title: '提示',
    content: '您确定删除此地址吗',
    success :(res)=> {
      if (res.confirm) {
        wx.request({
          url: 'https://zxwz.guaishe.com/index/Address/del_address',
          data: {
            address_id:id,
            user_id:wx.getStorageSync("userId"),
          },
          success: (res)=> {
            console.log(res)
            if(res.data.state){
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1000,
                success: (res) =>{
                  this.onShow()
                 },
                
              })
            }
          },
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })

  

  },
  
  editAddress:function(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: './addAddress/addAddress?id='+id,
    })
  },
  
 

//   onShow: function () {
//     this.getAddress()
//   },

  // toLogin() {
  //   wx.navigateTo({
  //     url: '../../../index/login/login'
  //   })
  // }
})