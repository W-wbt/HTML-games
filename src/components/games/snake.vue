<template>
  <div class="bg">
    <div class="statistical">
      <div class="statisticalItem">
        <span>当前方向：</span>
        <span class="statisticalICon">{{direction}}</span>
      </div>
      <div class="statisticalItem">
        <span>按键：</span>
        <span class="statisticalICon">{{keyCode}}</span>
      </div>
      <div class="statisticalItem">
        <span>蛇身长度：</span>
        <span class="statisticalICon">{{snakes.length}}</span>
      </div>
      <div class="statisticalItem">
        <span>当前速度：</span>
        <span class="statisticalICon">{{550 - timing}}</span>
      </div>
      <div class="statisticalItem">
        <span>积分：</span>
        <span class="statisticalICon">{{score}}</span>
      </div>
      <el-button type="primary" class="refresh" @click="refresh">刷新</el-button>
    </div>
    <canvas id="snakeBox" ref="snakeBox" :width="canvas_size.width" :height="canvas_size.height"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'snake',
    data () {
      const cols = Math.floor(window.innerWidth / 10) - 4
      const rows = Math.floor(window.innerHeight / 10) - 10
      return {
        start: false,
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
        timing: 200,
        moving_direction: 1, // 蛇头移动方向，0：向上；1：向右；2：向下；3：向左
        keyCode: 32, // 按键码
      }
    },
    mounted() {
      this.snakeBox = this.$refs.snakeBox.getContext('2d')
      this.snakeInit()
      // 监控按键
      document.onkeydown = (event) => {
        // console.log(event)
        this.onkeydown(event.keyCode)
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      refresh () {
        clearInterval(this.timer)
        this.timing = this.$options.data().timing
        this.start = false
        this.moving_direction = 1
        this.snakeInit()
      },
      // 初始化
      snakeInit () {
        this.snakes = []
        for (let i = 1; i <= this.snakesLength; i++) {
          this.snakes.push({ x: i * this.box_size, y: 1  * this.box_size })
        }
        this.score = 0
        this.produceFood()
        this.drawCanvas()
      },
      // 随机生成食物位置
      produceFood () {
        //  + this.box_size / 2
        this.coordinates = {
          x: Math.floor(Math.random() * (this.table.cols - 1)) * this.box_size + this.box_size / 2,
          y: Math.floor(Math.random() * (this.table.rows - 1)) * this.box_size + this.box_size / 2
        }
      },
      // 绘图
      drawCanvas () {
        // 清除画布动画
        this.snakeBox.clearRect(0, 0, this.canvas_size.width, this.canvas_size.height)
        // 画出横线
        // for( var i = 0; i <= this.table.rows; i++ ) {
        //   this.snakeBox.beginPath()
        //   this.snakeBox.moveTo(0, i * this.box_size)
        //   this.snakeBox.lineTo(this.box_size * this.table.cols, i * this.box_size)
        //   this.snakeBox.strokeStyle = "white"
        //   this.snakeBox.stroke()
        // }
        // 画出竖线
        // for(var i = 0; i <= this.table.cols; i++){
        //     this.snakeBox.beginPath()
        //     this.snakeBox.moveTo(i * this.box_size, 0)
        //     this.snakeBox.lineTo(i * this.box_size, this.box_size * this.table.rows)
        //     this.snakeBox.stroke()
        // }
        
        // 画蛇🐍
        for (let i = 0; i < this.snakes.length; i++) {
          this.snakeBox.beginPath()
          this.snakeBox.fillStyle = 'yellow'
          this.snakeBox.fillRect(this.snakes[i].x, this.snakes[i].y, this.box_size, this.box_size)
          // this.snakeBox.arc(this.snakes[i].x + this.box_size / 2, this.snakes[i].y + this.box_size / 2, this.box_size / 2, 0, 2 * Math.PI)
          // this.snakeBox.moveTo(this.snakes[i].x + this.box_size / 2, this.snakes[i].y + this.box_size / 2)
          this.snakeBox.moveTo(this.snakes[i].x, this.snakes[i].y)
          this.snakeBox.lineTo(this.snakes[i].x + this.box_size, this.snakes[i].y)
          this.snakeBox.lineTo(this.snakes[i].x + this.box_size, this.snakes[i].y + this.box_size)
          this.snakeBox.lineTo(this.snakes[i].x, this.snakes[i].y + this.box_size)
          this.snakeBox.closePath()
          // this.snakeBox.fill()
        }
        // 画食物
        this.snakeBox.beginPath()
        this.snakeBox.fillStyle = 'yellow'
        // this.snakeBox.fillRect(this.coordinates.x, this.coordinates.y, this.box_size, this.box_size)
        // 画圆
        this.snakeBox.arc(this.coordinates.x, this.coordinates.y, this.box_size / 2, 0, 2 * Math.PI)
        this.snakeBox.moveTo(this.coordinates.x, this.coordinates.y)
        this.snakeBox.closePath()
        // this.snakeBox.strokeStyle = "white"
        this.snakeBox.fill()
      },
      // 监测按键
      onkeydown (val) {
        this.keyCode = val
        if (val === 13) {
          this.refresh()
        } else if (!this.start && val !== 32) {
          return
        }
        switch (val) {
          case 32:
            this.start = !this.start
            if (this.start) { this.$message.success('游戏开始了') }
            this.initTimer()
            break
          case 37:
            if (this.moving_direction === 1) {
              this.$message.error('不准后退！')
            } else {
              this.moving_direction = 3
            }
            // else if (this.moving_direction === 3 && this.timing > 50) {
            //   this.timing -= 5
            //   clearInterval(this.timer)
            //   this.initTimer()
            // } 
            break
          case 38:
            if (this.moving_direction === 2) {
              this.$message.error('不准后退！')
            } else {
              this.moving_direction = 0
            }
            // else if (this.moving_direction === 0 && this.timing > 50) {
            //   this.timing -= 5
            //   clearInterval(this.timer)
            //   this.initTimer()
            // } 
            break
          case 39:
            if (this.moving_direction === 3) {
              this.$message.error('不准后退！')
            } else {
              this.moving_direction = 1
            }
            // else if (this.moving_direction === 1 && this.timing > 50) {
            //   this.timing -= 5
            //   clearInterval(this.timer)
            //   this.initTimer()
            // } 
            break
          case 40:
            if (this.moving_direction === 0) {
              this.$message.error('不准后退！')
            } else {
              this.moving_direction = 2
            }
            // else if (this.moving_direction === 2 && this.timing > 50) {
            //   this.timing -= 5
            //   clearInterval(this.timer)
            //   this.initTimer()
            // } 
            break
        }
      },
      // 定时器
      initTimer () {
        if (!this.start) {
          this.$message('游戏已暂停')
          clearInterval(this.timer)
          return
        }
        this.timer = setInterval(() => {
          this.moveRule()
        }, this.timing)
      },
      // 判断移动规则
      moveRule () {
        let snakes = this.snakes
        // let coordinate = this.snakes[this.snakes.length - 1]
        switch (this.moving_direction) {
          case 0:
            // 向上
            this.snakes.push({ x: snakes[snakes.length - 1].x, y: snakes[snakes.length - 1].y - this.box_size })
            break
          case 1:
            // 向右
            this.snakes.push({ x: snakes[snakes.length - 1].x + this.box_size, y: snakes[snakes.length - 1].y })
            break
          case 2:
            // 向下
            this.snakes.push({ x: snakes[snakes.length - 1].x, y: snakes[snakes.length - 1].y + this.box_size })
            break
          case 3:
            // 向左
            this.snakes.push({ x: snakes[snakes.length - 1].x - this.box_size, y: snakes[snakes.length - 1].y })
            break
        }
        this.snakes.shift()
        this.judgeFood()
        this.drawCanvas()
      },
      // 判断是否吃到食物
      judgeFood () {
        if ((this.coordinates.x - this.snakes[this.snakes.length - 1].x) === 5 && (this.coordinates.y - this.snakes[this.snakes.length - 1].y) === 5) {
          this.$message('你的小宝贝儿吃到了一口食物。')
          ++this.score
          this.produceFood()
          // 蛇身长度加一
          this.snakes.unshift({ x: this.box_size * this.table.cols, y: this.box_size * this.table.rows })
          if (this.timing < 50) { return }
          this.timing -= 5
          clearInterval(this.timer)
          this.initTimer()
        }
        // 判断是否死亡
        this.deathRule()
      },
      // 死亡判断
      deathRule () {
        // 撞墙判断
        if (this.snakes[this.snakes.length - 1].x <= 0 || this.snakes[this.snakes.length - 1].x >= this.table.cols * this.box_size) {
          this.$message.error('你的小宝贝儿没了！')
          setTimeout(() => {
            this.$message.error('GAME OVER')
          }, 100)
          clearInterval(this.timer)
        } else if (this.snakes[this.snakes.length - 1].y <= 0 || this.snakes[this.snakes.length - 1].y >= this.table.rows * this.box_size) {
          this.$message.error('你的小宝贝儿没了！')
          setTimeout(() => {
            this.$message.error('GAME OVER')
          }, 100)
          clearInterval(this.timer)
        }
        // 触碰自己判断
        // for (let i = 1; i < this.snakes.length; i++) {
        //   if (this.snakes[0].x === this.snakes[i].x && this.snakes[0].y === this.snakes[i].y) {
        //     clearInterval(this.timer)
        //     this.start = false
        //     this.$message.error('你的小宝贝儿咬到了自己！')
        //     setTimeout(() => {
        //       this.$message.error('GAME OVER')
        //     }, 100)
        //     break
        //   }
        // }
      }
    },
    computed: {
      direction () {
        if (this.moving_direction === 0) {
          return '👆'
        } else if (this.moving_direction === 1) {
          return '👉'
        } else if (this.moving_direction === 2) {
          return '👇'
        } else if (this.moving_direction === 3) {
          return '👈'
        }
      }
    }
  }
</script>

<style scoped>
.bg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
}
.statistical {
  width: 100%;
  height: 40px;
  border: 1px solid orangered;
  border-radius: 4px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.statisticalItem {
  flex-shrink: 0;
  font-size: 20px;
  line-height: 40px;
}
.statisticalICon {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.refresh {
  width: 50px;
  height: 30px;
  padding: 0;
  font-size: 12px;
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
