// components/course-list/course-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courses:Array
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
    previewImage(e){
      wx.previewImage({
        current:e.target.dataset.img,
        // urls地址的字符串数组
        urls: this.data.courses.map(item=>item.icon),
      })
    }
  }
})
