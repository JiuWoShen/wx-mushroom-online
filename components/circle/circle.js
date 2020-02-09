// components/circle/circle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasId:Number,
    width:{
      type:Number,
      // 小程序的默认值是value
      value:100
    },
    lineWidth:{
      type:Number,
      value:5
    },
    height:{
      type:Number,
      // 小程序的默认值是value
      value:100
    },
    // canvas线宽
    // canvas参数
    backgroundColor:{
      type:String,
      value:'#f3f3f3'
    },
    // 进度圆前景色
    foreColor:{
      type:String,
      value:"#B4D66E"
    },
    progress:{
      type:Number,
      value:0
    }
  },
  ready(){
    this.drawStudyProgress()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    drawStudyProgress(){
      // 1.先拿到canvas画布上下文，第一个参数canvas画布的完整ID
      // 如果在组件中，必须使用第二个参数this,否则拿不到画布上下文
      const canvasCtx = wx.createCanvasContext('backgroudCanvas' + this.data.canvasId, this)
      canvasCtx.strokeStyle = this.data.backgroundColor
      // 开启路径
      canvasCtx.beginPath()
      // 线宽
      canvasCtx.lineWidth = this.data.lineWidth
      // 2.绘制背景的圆
      // 开始画圆---6个参数
      canvasCtx.arc(this.data.width/2, this.data.height/2, this.data.width/2 - this.data.lineWidth, 0, 2 * Math.PI, false)
      // 绘制
      canvasCtx.stroke()
      
      // 绘制进度圆
      // 1.开启新的路径
      canvasCtx.beginPath()
      // 2.绘制颜色
      if(this.data.progress<=30){
        this.data.foreColor = "#f00"
      }else if(this.data.progress>30 && this.data.progress<60){
        this.data.foreColor = "#FF783B"
      }else{
        this.data.foreColor = "#B4D66E"
      }
      canvasCtx.strokeStyle = this.data.foreColor
      // 3.绘制进度--------0在三点钟方向-----因此减去0.5个π才是常规起始位置
      // 终止角度
      const endangel = (this.data.progress/100) * 2 * Math.PI - 0.5 * Math.PI
      canvasCtx.arc(this.data.width/2, this.data.height/2, this.data.width/2 - this.data.lineWidth, -0.5*Math.PI,endangel, false)
      // 线条端点处样式
      canvasCtx.setLineCap("round")
      // 绘制
      canvasCtx.stroke()

      // 绘制文字 canvasCtx.fillText()
      canvasCtx.beginPath()
      // 设置字体的颜色
      canvasCtx.fillStyle = this.data.foreColor
      const font_size = 12
      canvasCtx.font = font_size + 'px Helvetica'
      if(this.data.progress >=99){
        canvasCtx.fillText(parseInt(this.data.progress)+'%',this.data.width/2 - 15,this.data.height/2 + 5)
      }else{
        canvasCtx.fillText(parseInt(this.data.progress)+'%',this.data.width/2 - 10,this.data.height/2 + 5)
      }
      
      // ！！！！！小程序中开始绘制必须添加draw方法
      canvasCtx.draw()
    }
  }
})
