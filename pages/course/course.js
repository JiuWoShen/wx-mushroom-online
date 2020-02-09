// pages/course/course.js
import {fetch} from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseList()
  },
  async getCourseList(){
    const res = await fetch({
      url:'course/list'
    })
    this.setData({
      courseList:res.data.message
    })
  }
})