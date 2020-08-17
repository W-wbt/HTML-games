<template>
  <div class="bg">
    <!-- <div class="top_search_part">
      <div class="search_box">
        <div class="search_item">
          <el-input placeholder="请输入搜索模块名称" v-model="moduleName"></el-input>
        </div>
        <button class="search_btn">搜索</button>
      </div>
    </div> -->
    <div class="content">
      <div class="module" v-for="(item, index) in moduleList" :key="index" :class="item.class" @click="goPage(item.router)">
        <p class="moduleName">{{item.moduleName}}</p>
        <span class="moduleCreater">创作者：@{{item.auther}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        // moduleName: '',
        moduleList: [
          {
            moduleName: '贪吃蛇',
            auther: 'W-wbt',
            class: 'GluttonousSnake',
            router: { path: '/snake' }
          },
        ]
      }
    },
    methods: {
      goPage (router) {
        this.$router.push(router)
      }
    }
  }
</script>

<style scoped>
.bg {
  padding: 20px;
}
.content {
  padding: 20px;
  background: none;
  overflow-y: scroll;
  display: flex;
}
.content::-webkit-scrollbar { width: 0 !important; }
.content{ -ms-overflow-style: none; }
.content { overflow: -moz-scrollbars-none; }
.module {
  margin: 20px;
  flex-shrink: 0;
  flex-grow: 1;
  max-width: calc(25% - 40px);
  max-width: -moz-calc(25% - 40px);
  max-width: -webkit-calc(25% - 40px);
  height: 200px;
  border-radius: 8px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 1px 0 rgb(0, 0, 0);
}
.moduleName {
  font-size: 32px;
  line-height: 50px;
  margin-bottom: 30px;
}
.moduleCreater {
  font-size: 18px;
  line-height: 30px;
}
.module:hover {
  /* transform: scale(1.1); */
  box-shadow: 0 0 6px 0 rgb(0, 0, 0);
  background-size: 100% 90%;
}
.module:hover .moduleName {
  font-size: 36px;
  margin-bottom: 36px;
}
.module:hover .moduleCreater {
  font-size: 22px;
}

.GluttonousSnake {
  background: url(../assets/moduleImg/snakeModule.svg) no-repeat center;
  background-size: 100% 80%;
}
</style>
