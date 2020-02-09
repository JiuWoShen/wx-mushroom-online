// 按需导入
import { fetch } from "../../utils/fetch"

// pages/home/home.js
Page({
  data: {
    // 轮播图数据
    swipers:[],
    // 课程数据
    courses:[],
    // 热门视频
    vidios:[]
  },
  // 页面加载时请求的数据
  onLoad: function (options) {
    // 页面一加载就获取首页轮播图数据
    this.getSwipersData()
    this.getCoueseData()
    this.getVidiosData()
  },
  // 获取轮播图数据方法
  getSwipersData() {
    // wx.request({
    //   url: 'http://localhost:3000/api/home/swipers',
    //   // 除了登录验证其他请求一律需要携带token认证
    //   header: {
    //     // 同步可以直接拿到结果
    //     Authorization: wx.getStorageSync('my_token')
    //   },
    //   success: res => {
    //     console.log(res.data)
    //   }
    // })
    fetch({
      url:'home/swipers'
    }).then(res=>{
      // console.log(res.data),
      this.setData({
        swipers:res.data.message
      })
    })
  },
  // 获取课程数据
  async getCoueseData(){
    // wx.request({
    //   url: 'http://localhost:3000/api/home/course',header: {
    //     // 同步可以直接拿到结果
    //     Authorization: wx.getStorageSync('my_token')
    //   },
    //   success:res=>{
    //     console.log(res.data)
    //   }
    // })
    const res=await fetch({
      url:'home/course'
    })
    // console.log(res.data)
    this.setData({
      courses:res.data.message
    })
  },
  async getVidiosData(){
    const res= await fetch({
      url:'home/video'
    })
    this.setData({
      vidios:res.data.message
    })
  },
  // 跳转至课程页面----tab栏页面
  goToCourse(){
    wx.switchTab({
      url: '/pages/course/course',
    })
  }

})