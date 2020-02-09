import {fetch} from '../../utils/fetch'
// pages/login/login.js
Page({
  // 微信授权
  wxLogin(e){
    // console.log(e)
    // 用户未授权----直接返回
    if(e.detail.errMsg === 'getUserInfo:fail auth deny') return
    // 用户授权-----保存需要的用户信息在后面在我的页面进行渲染
    const {avatarUrl,nickName} = e.detail.userInfo
    // 授权后---获取临时微信登录凭证
    wx.login({
      success: async result => {
        // console.log(res)
       /*  wx.showLoading({
          title: '微信登录授权中...',
        }) */
        // 发送请求---封装后的请求
        const res = await fetch({
          url:'user/wxlogin',
          method:'POST',
          tips:'微信登录授权中...',
          data:{
            code: result.code,
            nickname: nickName,
            avatar: avatarUrl
          },
          isLogin:true
        })
        // 请求成功后的操作
        if(res.data.status===0){
           // 2.请求发送成功------保存token至本地----并提示用户登录成功
           wx.setStorageSync('my_token', res.data.token)
           wx.showToast({
             title: res.data.message,
             icon: 'none',
             duration: 1000
           })
           // 3.跳转至首页
           wx.reLaunch({
             url: '/pages/home/home'
           })
        }
        // 1.发送登录接口请求
        /* wx.request({
          url: 'http://localhost:3000/api/user/wxlogin', //仅为示例，并非真实的接口地址
          method:'POST',
          data: {
            code: result.code,
            nickname: nickName,
            avatar: avatarUrl
          },
          success: res => {
            // console.log(res)
            if(res.data.status === 0){
              // 2.请求发送成功------保存token至本地----并提示用户登录成功
              wx.setStorageSync('my_token', res.data.token)
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 1000
              })
              // 3.跳转至首页
              wx.reLaunch({
                url: '/pages/home/home'
              })
            }
          }
        }) */
        // complete--接口调用结束的回调函数（调用成功、失败都会执行）
        complete: () => {
          wx.hideLoading()
        }
      }
    })
  },
  // 跳转到手机登录页面
  goPhoneLogin(){
    wx.navigateTo({
      // 这里的跳转不能写文件后缀名
      url: '/pages/phone-login/phone-login',
    })
  }
})
