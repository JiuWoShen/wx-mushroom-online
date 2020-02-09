// pages/study/study.js
import { fetch } from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.progressListData()
  },
  async progressListData(){
    const res= await fetch({
      url:'study/progress'
    })
    this.setData({
      progressList:res.data.message
    })
  }
})