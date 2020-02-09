// pages/phone_login/phone_login.js
// 导入发送请求的promise
import { fetch } from '../../utils/fetch'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '17704051019',
    vcode:'',
    // 定义定时器
    timer:null,
    tips:'获取验证码',
    isCountDown: false,
    count: 10
  },
  // 输入手机号
  inputChange(event){
    // console.log(event.detail)
    // console.log(event.target)----获取触发事件的元素
    // 将取到的值赋值给模型
    this.setData({
      // phone: event.detail.value
      // 验证码与手机号是同一个事件----因此使用属性名表达式来动态设置双向绑定数据
      [event.target.dataset.name]: event.detail.value
    })
  },
  // 获取验证码
  async getVcode(){
    // 如果正在倒计时则直接返回
    if(this.data.isCountDown) return
    // 判断手机号是否合法
     // 正则判断手机号正确与否
     let regx=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
     if(!this.data.phone.match(regx)){
       wx.showToast({
         title: "手机号格式不正确",
         icon: 'none',
         duration: 1000
       }) 
       return
     }
    //  倒计时准备-----倒计时标志以及按钮文本
    this.setData({
      isCountDown: true,
      tips : this.data.count 
    })
    // 设置定时器----仅仅是用来限制再次请求验证码的频率
    this.data.timer = setInterval(()=>{
      // 判断是否需要停止计时器
      if(this.data.count <= 1){
        clearInterval(this.data.timer)
        // 恢复倒计时初始值 
        this.setData({
          isCountDown:false,
          count: 10,
          tips : '获取验证码'
        })
        return
      }
      this.data.count --
      this.setData({
        tips: this.data.count
      })
    },1000)
    // 验证通过后发送请求
    const res = await fetch({
      url: 'user/vcode',
      data: {
        phone: this.data.phone
      },
      tips:'获取验证码中...'
    })
    // console.log(res.data)
    if(res.data.status === 0){
      wx.showToast({
        title: `验证码为${res.data.vcode}`,
        icon: 'none',
        duration: 1500
      })
    }
    /* wx.request({
      url: 'http://localhost:3000/api/user/vcode', //仅为示例，并非真实的接口地址
      data: {
        phone: this.data.phone
      },
      success: res => {
        // console.log(res.data)----获取成功以提示的方式告知用户
        wx.showToast({
          title: `验证码为${res.data.vcode}`,
          icon: 'none',
          duration: 1500
        })
      }, 
      // 接口调用结束后执行的函数
      complete:() => {
        wx.hideLoading()
      }
    })*/
  },
  // 手机号登录
  async phoneLogin(){
    // 手机号与验证码非空判断
    // 正则判断手机号正确与否
    let regx=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    if(!this.data.phone.match(regx)){
      wx.showToast({
        title: "手机号格式不正确",
        icon: 'none',
        duration: 1000
      }) 
      return
    }
    wx.showLoading({
      title: '登录中...',
    })
    // 发送请求
    const res =await fetch({
      url: 'user/login',
      method: 'POST',
      data: {
        phone: this.data.phone,
        vcode: this.data.vcode
      },
      tips:'登录中...'
    })
    // console.log(res.data)
    if(res.data.status===0){
      // 登录成功---提示  保存  跳转
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 1000
      }) 
      wx.setStorageSync('my_token', res.data.token)
      wx.reLaunch({
        url: '/pages/home/home'
      })
    } else {
      wx.showToast({
        title: res.data.message,
        icon: 'none',
        duration: 1000
      }) 
    }
  },
  // 页面被销毁时清空计时器
  onUnload(){
    console.log('--onunload--'),
    clearInterval(this.data.timer)
  }
})