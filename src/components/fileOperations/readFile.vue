<template>
  <div class="bg">
    <div class="top_operation_box">
      <div></div>
      <div class="right_operation_box">
        <el-upload class="uploadBtnBox" action="/" :show-file-list="false" :auto-upload="false" :on-change="uploadChange">
          <el-button class="importBtn" icon="el-icon-upload">导入excel文件</el-button>
        </el-upload>
        <el-button class="exportBtn" @click="exportExcel">导出</el-button>
        <el-button class="exportBtn" @click="filtrate">筛选</el-button>
      </div>
    </div>
    <!-- <el-button class="importBtn" v-if="workList.length !== 0">处理数据</el-button> -->
    <div class="middle_table_box">
      <el-table id="workList" :data="workList" style="width: 100%" stripe size="small" header-cell-class-name="tableHeader" cell-class-name="tableBodyer" height="100%" @selection-change="selectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序号" prop="index" width="50"></el-table-column>
        <el-table-column label="岗位代码" prop="__EMPTY" width="100"></el-table-column>
        <el-table-column label="用人单位及招考岗位">
          <el-table-column label="用人单位序号" prop="__EMPTY_1" width="100"></el-table-column>
          <el-table-column label="用人单位名称" prop="__EMPTY_2" min-width="100"></el-table-column>
          <el-table-column label="岗位类别" prop="__EMPTY_3" width="100"></el-table-column>
          <el-table-column label="岗位名称" prop="__EMPTY_4" width="100"></el-table-column>
          <el-table-column label="从事工作" prop="__EMPTY_5" min-width="100"></el-table-column>
          <el-table-column label="招考数量" prop="__EMPTY_6" width="60"></el-table-column>
          <el-table-column label="入围比例" prop="__EMPTY_7" width="60"></el-table-column>
        </el-table-column>
        <el-table-column label="招考条件">
          <el-table-column label="来源类别" prop="__EMPTY_8" min-width="100"></el-table-column>
          <el-table-column label="学历" prop="__EMPTY_9" min-width="100"></el-table-column>
          <el-table-column label="学位" prop="__EMPTY_10" min-width="100"></el-table-column>
          <el-table-column label="所学专业" prop="__EMPTY_11" min-width="120"></el-table-column>
          <el-table-column label="考试专业科目" prop="__EMPTY_12" width="100"></el-table-column>
          <el-table-column label="专业技术资格">
            <el-table-column label="毕业生" prop="__EMPTY_13" width="100"></el-table-column>
            <el-table-column label="社会人才" prop="__EMPTY_14" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="职业资格">
            <el-table-column label="毕业生" prop="__EMPTY_15" width="100"></el-table-column>
            <el-table-column label="社会人才" prop="__EMPTY_16" width="100"></el-table-column>
          </el-table-column>
          <el-table-column label="其他条件" prop="__EMPTY_17" min-width="150"></el-table-column>
        </el-table-column>
        <el-table-column label="工作地点" prop="__EMPTY_18" width="60"></el-table-column>
        <el-table-column label="咨询电话" prop="__EMPTY_19" min-width="120"></el-table-column>
       </el-table>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'readFile',
    data () {
      return {
        workList: [],
        multipleSelection: []
      }
    },
    methods: {
      uploadChange (file) {
        this.loading = this.$loading({
          lock: true,
          text: 'excle数据处理中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let _this = this
        // console.log(file)
        const types = file.name.split('.')[1]
        const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
        if (!fileType) {
          this.loading.close()
          this.$message('格式错误，请重新选择！')
        } else {
          this.file2Xce(file).then(tabJson => {
            if (tabJson && tabJson.length > 0) {
              // this.xlsxJson = tabJson
              console.log('原始数据长度：', tabJson[0].sheet.slice(4).length)
              _this.dataProcess(tabJson[0].sheet.slice(4))
            } else {
              this.loading.close()
              this.$message('文件内没有内容！')
            }
          })
        }
      },
      file2Xce(file) {
        return new Promise(function(resolve, reject) {
          const reader = new FileReader()
          reader.onload = function(e) {
            const data = e.target.result
            this.wb = XLSX.read(data, {
              type: 'binary'
            })
            const result = []
            this.wb.SheetNames.forEach((sheetName) => {
              result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
              })
            })
            resolve(result)
          }
          reader.readAsBinaryString(file.raw)
          // reader.readAsBinaryString(file) // 传统input方法
        })
      },
      dataProcess (tabJson) {
        let list = []
        let one = []
        let two = []
        for (let i = 0; i < tabJson.length; i++) {
          // if (tabJson[i].__EMPTY_8.includes('社会人才') && tabJson[i].__EMPTY_10.includes('学士') && tabJson[i].__EMPTY_11.includes('本科') && tabJson[i].__EMPTY_11.includes('计算机')) {
          //   list.push(tabJson[i])
          // }
          if (tabJson[i].__EMPTY_8.includes('社会人才') && tabJson[i].__EMPTY_10.includes('学士') && tabJson[i].__EMPTY_11.includes('本科')) {
            if ((tabJson[i].__EMPTY_11.split('本科：')[1].includes('计算机') || tabJson[i].__EMPTY_11.split('本科：')[1].includes('工学')) && !tabJson[i].__EMPTY_17.includes('党员') && !tabJson[i].__EMPTY_17.includes('女性') && !tabJson[i].__EMPTY_17.includes('985') && !tabJson[i].__EMPTY_17.includes('211')) {
              if (tabJson[i].__EMPTY_14.includes('无要求') && tabJson[i].__EMPTY_16.includes('无要求') && !tabJson[i].__EMPTY_17.includes('数据库') && !tabJson[i].__EMPTY_17.includes('军队')) {
                if (!tabJson[i].__EMPTY_17.includes('美术') && !tabJson[i].__EMPTY_17.includes('JAVA') && !tabJson[i].__EMPTY_17.includes('人力资源') && !tabJson[i].__EMPTY_17.includes('论文') && !tabJson[i].__EMPTY_17.includes('省户口')) {
                  if (tabJson[i].__EMPTY_12.includes('数学') && !tabJson[i].__EMPTY_17.includes('医院') && !tabJson[i].__EMPTY_17.includes('多媒体') && !tabJson[i].__EMPTY_17.includes('六级') && !tabJson[i].__EMPTY_17.includes('兵役')) {
                    // if (!tabJson[i].__EMPTY_17.includes('户口')) {
                    //   one.push(tabJson[i])
                    // } else if (tabJson[i].__EMPTY_17.includes('天津')) {专业技术资格
                    //   two.push(tabJson[i])
                    // }
                    if (!tabJson[i].__EMPTY_17.includes('双一流')) {
                      list.push(tabJson[i])
                    }
                  }
                }
              }
            }
          }
        }
        // console.log(one, two)
        // list = one.concat(two)
        let index = 0
        this.workList = list.map(item => {
          item.index = ++index
          return item
        })
        this.loading.close()
        // let province = []
      },
      // 导出
      exportExcel () {
        if (this.workList.length === 0) {
          this.$message('请先导入excel文件！')
          return
        }
        this.loading = this.$loading({
          lock: true,
          text: 'excle数据导出中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let name = new Date().getTime() + '.xlsx'
        /* generate workbook object from table */
        var table = XLSX.utils.table_to_book(document.querySelector('#workList'))
        /* get binary string as output */
        var exportTable = XLSX.write(table, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([exportTable], { type: 'application/octet-stream' }), name)
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, exportTable)
        }
        this.loading.close()
      },
      // 选择岗位
      selectionChange (val) {
        this.multipleSelection = val
      },
      filtrate () {
        if (this.multipleSelection.length === 0) {
          this.$message('请选择岗位！')
        } else {
          this.workList = this.multipleSelection
        }
      }
    }
  }
</script>

<style scoped>
.bg {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.middle_table_box {
  height: calc(100% - 70px);
  height: -moz-calc(100% - 70px);
  height: -webkit-calc(100% - 70px);
}
.uploadBtnBox {
  flex-shrink: 0;
}
.importBtn {
  width: 200px;
  height: 48px;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 2px;
  margin: 0 0 10px;
}
.exportBtn {
  width: 200px;
  height: 48px;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 2px;
  margin: 0 0 10px 20px;
}
</style>
