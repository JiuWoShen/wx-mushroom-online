// pages/search/search.js
import {fetch} from '../../utils/fetch'
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    courses:[]
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  // 点击取消按钮清空搜索框并搜索全部课程
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    },()=>{
      this.getLastValue()
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 获取最终要进行搜索的值
  async getLastValue() {
    console.log(this.data.inputVal)
    // 根据输入关键字进行搜索
    const res = await fetch({
      url:'course/search',
      data:{
        name:this.data.inputVal
      }
    })
    // console.log(res.data)
    this.setData({
      courses:res.data.message
    })
  }
})