// components/upImg/upImg.js
Component({
    options: {
        styleIsolation: 'isolated'
    },
    /**
     * 组件的属性列表
     */
    properties: {
        count: { //最多选择图片的张数，默认9张
            type: Number,
            value: 9
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        img_path: [],
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseImage(e) { //图片选择
            wx.showModal({
                title: '提示',
                content: '处方图片请确保处方内容，医生姓名清晰可见',
                success: (res)=> {
                  if (res.confirm) {
                    wx.chooseImage({
                        sizeType: ['compressed'],
                        sourceType: ['album', 'camera'],
                        count: this.data.count,
                        success: res => {
                            let t = JSON.parse(JSON.stringify(this.data.img_path))
                            for (let i = 0; i < res.tempFilePaths.length; i++) {
                                t.push(res.tempFilePaths[i]);
                            }
                            this.setData({
                                img_path: t
                            });
                        },
                        complete:res=>{
                            let img_path=this.data.img_path
                            var myEventDetail = { img_path } // detail对象，提供给事件监听函数
                            var myEventOption = {} // 触发事件的选项
                            this.triggerEvent('myevent', myEventDetail, myEventOption)
                        }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
           
        },
        handleImagePreview(e) { //图片浏览
            wx.previewImage({
                current: this.data.img_path[e.target.dataset.idx],
                urls: this.data.img_path
            });
        },
        removeImage(e) { //图片删除
                let i = e.target.dataset.idx;
                let t = JSON.parse(JSON.stringify(this.data.img_path));
                t.splice(i, 1);
                this.setData({
                    img_path: t
                });
                let img_path = this.data.img_path
                var myEventDetail = { img_path } // detail对象，提供给事件监听函数
                var myEventOption = {} // 触发事件的选项
                this.triggerEvent('myevent', myEventDetail, myEventOption)
        },
       
    }
})
