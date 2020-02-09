// components/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tips:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToSearch(){
      // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
      wx.navigateTo({
        url: '/pages/search/search',
      })
    }
  }
})
