<template>
  <div class="bg">
    <canvas id="drawCanvas" ref="drawCanvas" :width="width" :height="height" @mouseover="removePoints"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'drawCanvas',
    data () {
      return {
        width: `${document.documentElement.clientWidth}`,
        height: `${document.documentElement.clientHeight}`,
        ball: []
      }
    },
    mounted() {
      this.ctx = this.$refs.drawCanvas.getContext('2d')
      this.drawPoints()
    },
    methods: {
      drawPoints () {
        let _this = this
        let list = []
        for (let i = 0; i < 1000; i++) {
          list.push({
            x: Math.floor(Math.random() * document.documentElement.clientWidth - 1),
            y: Math.floor(Math.random() * document.documentElement.clientHeight - 1),
            r: Math.floor(Math.random() * 10 / 4)
          })
        }
        this.ball = list
        for (let i = 0; i < list.length; i++) {
          setTimeout(function() {
            _this.drawStar(list[i].x, list[i].y, list[i].r)
          }, 1000)
        }
        // this.ctx.translate(80, 80)
        // this.drawStar(100, 100, 5)
        // let _this = this
        // setTimeout(function () {
        //   _this.drawStar(100, 100, 5)
        // }, 2000)
      },
      drawStar (x, y, r) {
        this.ctx.save()
        // let str = ('FFFFFF' + i.toString(16))
        // let sixteen = str.substring(str.length - 6, str.length)
        // this.ctx.fillStyle = "#" + sixteen
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, Math.PI * 2, true) // 绘制
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.restore()
      },
      removePoints () {
        this.ctx.clearRect(0, 0, this.width, this.height)
        // this.ctx.fillStyle = 'rgba(255,255,255,0.3)'
        // this.ctx.fillRect(0, 0, this.width, this.height)
        let list = this.ball
        let _this = this
        setTimeout(function() {
          for (let j = 0; j < 100; j++) {
            _this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
            setTimeout(function() {
              for (let i = 0; i < list.length; i++) {
                _this.drawStar(list[i].x + j, list[i].y + j, list[i].r)
              }
            }, 10)
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>
.bg {
  /* padding: 10px; */
  background: #FFFFFF;
}
#drawCanvas {
  background: rgba(0, 0, 0, 0.9);
  /* border-radius: 4px; */
  /* border: 1px solid #EEEEEE; */
  /* box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3); */
}
#drawCanvas:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
}
</style>
