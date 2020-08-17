<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: #EEF0F5;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
  /* color: #333333; */
}
html, body {width: 100%;height: 100%;}
a {outline: none;text-decoration: none;cursor: pointer;}
input {outline: none;border: 0;}
input::-moz-placeholder {color: #9B9B9B;}
input::-ms-input-placeholder {color: #9B9B9B;}
input::-webkit-input-placeholder {color: #9B9B9B;}
ul {padding: 0;}
ul li {list-style: none;list-style-type:none;}
button {outline: none;border: 0;}
.bg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.top_search_part {
  flex-shrink: 0;
  height: 72px;
  padding: 0 32px 0 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  margin-bottom: 12px;
}
.search_box {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.search_item {
  margin-left: 40px;
  display: flex;
  align-items: center;
}
.search_item:first-child {
  margin-left: 0;
}
.search_title {
  flex-shrink: 0;
  font-size: 16px;
  color: #333333;
  /* margin-right: 10px; */
}
/*  */
.goBackBox {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}
.goBackIcon {
  width: 21px;
  height: 21px;
  margin-right: 16px;
}
.goBackTitle {
  font-size: 18px;
  color: #333333;
  line-height: 27px;
}
/*  */
.el-input {
  /* border: 1px solid #979797; */
  border-radius: 4px;
}
.search_btn {
  flex-shrink: 0;
  height: 40px;
  margin-left: 40px;
  padding: 0 33px;
  background: #0066FF;
  border-radius: 4px;
  font-size: 16px;
  line-height: 40px;
  color: #FFFFFF;
  cursor: pointer;
}

.add_btn {
  flex-shrink: 0;
  height: 40px;
  border: 1px solid #0066FF;
  border-radius: 4px;
  padding: 0 23px 0 21px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #0066FF;
  cursor: pointer;
}
.add_icon {
  flex-shrink: 0;
  width: 15.1px;
  height: 15.1px;
  margin-right: 4px;
}

.content {
  /* height: calc(100% - 84px); */
  flex-grow: 1;
  /* display: flex;
  flex-direction: column;
  align-items: stretch; */
  background: #FFFFFF;
  box-shadow: 0 0 4px 0 rgba(203,203,203,0.50);
  border-radius: 2px;
  position: relative;
}
.tableBox {
  position: absolute;
  top: 0;
  width: 100%;
  height: calc(100% - 40px);
  /* overflow-y: scroll; */
  border: 2px solid #FFFFFF;
}
/* .tableBox::-webkit-scrollbar { width: 0 !important; }
.tableBox{ -ms-overflow-style: none; }
.tableBox { overflow: -moz-scrollbars-none; } */
.tablePage {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #E4E4E4;
}

/* 表格样式 */
.tableHeader {
  background: #EEF0F5 !important;
  font-size: 16px;
  color: #333333;
}
.tableBodyer {
  font-size: 16px;
  color: #333333;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(238,240,245,0.60) !important;
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: 1px solid #FFFFFF !important;
}
.tableBox .operate_btn_box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tableBox .operation_btn {
  width: 20px;
  height: 20px;
  margin-right: 20px;
  background-size: 100% 100%;
}
.tableBox .operation_btn:last-child {
  margin-right: 0;
}
.tableBox .updateBtn {
  background: url(./assets/editIcon.svg) no-repeat center;
}
.tableBox .delBtn {
  background: url(./assets/delIcon.svg) no-repeat center;
}
.tableBox .cancelBtn {
  background: url(./assets/cancellationIcon.svg) no-repeat center;
}
.operation_a_blue {
  font-size: 14px;
  color: #0066FF;
}

/* 弹窗样式 */
.el-dialog__header {
  background: #0066FF;
}
.el-dialog__title, .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff !important;
}
.dialog_box {
  width: 100%;
  padding: 0 30px 20px 10px;
}
.dialog_row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog_item {
  min-width: 50%;
  flex-shrink: 0;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0 20px;
}
.dialog_item_title {
  flex-shrink: 0;
  min-width: 120px;
  padding: 0 10px;
  font-size: 18px;
  color: #333333;
  text-align: right;
}
.dialog_item_input {
  /* flex-shrink: 0; */
  /* width: 250px !important; */
}
.dialog_item_input .el-input__inner {
  text-align: left;
}
.dialog_item_input_text {
  margin-left: 10px;
  font-size: 18px;
  color: #333333;
}
/* 弹窗样式 */
/* 标签页 */
.tabsBox {
  width: 100%;
  height: 43px;
  margin-bottom: 12px;
  display: flex;
  align-items: flex-end;
  padding-left: 56px;
}
.tabsBox .el-tabs__header {
  margin: 0;
}
.tabsBox .el-tabs__nav-wrap::after {
  background-color: #EEF0F5;
}
.tabsBox .el-tabs__item {
  font-size: 18px;
  padding: 0 67.5px;
}
.tabsBox .el-tabs__item.is-active {
  color: #0048FF;
}
.tabsBox .el-tabs__active-bar {
  background-color: #0048FF;
  border-radius: 2px;
}
/* 标签页 */
</style>
