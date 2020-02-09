// pages/my/my.js
import {fetch} from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]
  },
  onShow: function () {
    this.getUserInfo()
  },
  async getUserInfo(){
    const res=await fetch({
      url:'my/info'
    })
    this.setData({
      userInfo:res.data.message
    })
  },
  // 清除缓存-------wx.clearStorageSync----清除成功后跳转到登录页面
  clearCache(){
    wx.showToast({
      title: '缓存清理中...', //提示的内容,
      icon: 'loading', //图标,
      duration: 2000, //延迟时间,
      mask: true, //显示透明蒙层，防止触摸穿透,
      success: res => {
        setTimeout(() => {
          wx.showToast({
            title: '清理缓存成功', //提示的内容,
            icon: 'success', //图标,
            duration: 1000, //延迟时间,
            mask: true //显示透明蒙层，防止触摸穿透
          });
        }, 2000)
      }
    })
  },
  
  // 联系客服
  contact(){
    wx.makePhoneCall({
      phoneNumber: '400-618-9090'
    })
  }

})