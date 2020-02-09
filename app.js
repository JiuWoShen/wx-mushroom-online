//app.js
// 甄姬调试线上地址http://183.237.67.218:3003/api/
App({
  onLaunch: function () {
    // 判断用户是否登录
    var token = wx.getStorageSync('my_token')
    if(token){
      wx.reLaunch({
        url: '/pages/home/home'
      })
    }else{
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  globalData: {
    token: null
  }
})