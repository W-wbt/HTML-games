<template>
  <div class="bg">
    <div class="content" @click="startFlip" @mousemove="mousemove">
      <div class="snakeHead" :style="{ 'top': top + 'px', 'left': left + 'px' }"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'snake',
    data () {
      const cols = Math.floor(window.innerWidth / 10) - 4
      const rows = Math.floor(window.innerHeight / 10) - 4
      return {
        start: false,
        top: -20,
        left: -20,
        table: {
          cols, // 列数
          rows // 行数
        }, // 画布表格
        canvas_size: {
          width: cols * 10, // 画布尺寸
          height: rows * 10, // 画布尺寸
        },
        score: 0, // 积分
        box_size: 10, // 尺寸
        snakesLength: 1, // 蛇身初始化长度
        snakes: [], // 蛇身坐标
        coordinates: {
          x: 0,
          y: 0
        }, // 食物坐标
      }
    },
    mounted() {},
    methods: {
      mousemove (e) {
        if (!this.start) {
          this.top = (e.clientY - 20)
          this.left = (e.clientX - 20)
        }
      },
      startFlip (e) {
        // console.log(e)
        clearInterval(this.startTiming)
        this.start = !this.start
        if (this.start) {
          // this.$message('top:' + (e.clientY - 20) + '，' + 'left:' + (e.clientX - 20))
          this.top = (e.clientY - 20)
          this.left = (e.clientX - 20)
          let width = window.innerWidth - 50
          let height = window.innerHeight - 50
          let vx = 2
          let vy = 2
          let that = this
          this.startTiming = setInterval(function(){
            if (that.left >= width || that.left <= 0) {
              vx = -vx
            }
            if (that.top >= height || that.top <= 0) {
              vy = -vy
            }
            that.top += vy
            that.left += vx
          }, 1)
        } else {
          clearInterval(this.startTiming)
        }
      }
    }
  }
</script>

<style scoped>
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
}
#snakeBox {
  /* border-radius: 10px; */
  background: #000000;
  box-shadow: 0 0 10px 5px #000000;/* inset */
  position: relative;
}
.snakeHead {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: #FFFFFF;
}
</style>
