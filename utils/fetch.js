// 封装请求
// 基地址
const BASEURL = 'http://localhost:3000/api/'
const app = getApp()   //----得到
// console.log(app.globalData)
// 解构赋值传参数-------设置的默认值会被传递的参数覆盖掉
const fetch = ({ url,header={},method='GET',data,tips='拼命加载中...',isLogin=false }) => {
  // 返回一个Promise对象---解决回调地狱
  return new Promise((resolve,reject)=>{
    // promise对象中执行异步操作
    // 非登陆页面才需要携带token
    if(!isLogin){
      // 从内存中读取token
      if(app.globalData.token){
        header.Authorization = app.globalData.token
      }else{
        // 每刷新页面都需要从本地读取---并设置
        app.globalData.token = wx.getStorageSync('my_token')
        header.Authorization = app.globalData.token
      }
    }
    // 请求完成前的提示
    wx.showLoading({
      title: tips,
    })
    // 发送请求-----------小程序官方文档-----成功success失败fail及请求结束后promise的执行的回调函数
    wx.request({
      url: `${BASEURL}${url}`, //仅为示例，并非真实的接口地址
      method,
      data,
      header,
      isLogin,
      success: res => {
        // resolve() 调用then的第一个函数-----成功
        resolve(res)
      },
      fail:error=>{
        // (1)reject() 调用then的第二个函数-----失败
        reject(error)
      },
      complete:()=>{
        // 请求结束执行的函数-------隐藏加载状态
        wx.hideLoading()
      }
    })
  })
}
// 暴露出方法----按需导出
export {
  fetch
}