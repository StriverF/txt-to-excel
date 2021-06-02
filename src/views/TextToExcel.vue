<template>
  <div class="home">
    <h2>选择你要转换的txt文件</h2>
    <a-upload-dragger
    name="file"
    accept="text/plain"
    :before-upload="beforeUpload"
    :remove="handleRemove"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :multiple="true"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
  <a-button type="primary" class="export-table-btn" @click="exportTable" :loading="loading">导出表格</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Upload, Icon } from 'ant-design-vue'
// import { unique } from '../utils/array'
import xlsx from 'xlsx'

export default {
  name: 'TextToExcel',
  components: {
    [Upload.name]: Upload,
    [Upload.Dragger.name]: Upload.Dragger,
    [Icon.name]: Icon
  },
  data () {
    return {
      fileList: [],
      loading: false
    }
  },
  methods: {
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleChange (info) {
      const status = info.file.status
      console.log('handleChange', status)
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    exportTable () {
      const tableHeader = {
        name: { title: '姓名', reg: /姓名：(\S*)\r/ },
        gender: { title: '性别', reg: /性别：(\S*)\r/ },
        age: { title: '年龄', reg: /年龄：(\S*)\r/ },
        phone: { title: '电话', reg: /(手机1：(\S*)\r)|(电话：(\S*)\r)|(手机2：(\S*)\r)/ },
        weight: { title: '体重', reg: /\n体重(\S*)\r/ },
        adn: { title: '住院号', reg: /住院号：(\S*)\r/ },
        nation: { title: '民族', reg: /民族：(\S*)\r/ },
        nativePlace: { title: '籍贯', reg: /籍贯：(\S*)\r/ },
        marriageStatus: { title: '婚姻状况', reg: /(婚姻状况： (\S*)\r)|(婚姻状况：(\S*)\r)/ },
        inHospitalDate: { title: '住院日期', reg: /住院日期：(\S*)\r/ },
        pulse: { title: '脉搏', reg: /\n脉搏(\S*)\r/ },
        stature: { title: '身高', reg: / 身高(\S*)\r/ },
        bp1: { title: '血压分子', reg: /\r\n右侧上肢血压([0-9]{1,4})/ },
        bp2: { title: '血压分母', reg: /([0-9]{1,4}mmHg)\r/ },
        mainArt: { title: '主术', reg: /主 诉： (\S*)\r/ },
        // operationName: { title: '手术名称', reg: /r/ },
        // operationDate: { title: '手术时间', reg: /r/ },
        // operationPhysician: { title: '手术医师', reg: /r/ },
        // operationResult: { title: '手术结果', reg: /r/ },
        discharged: { title: '出院时间', reg: /出院时间:(\S*)\r|出院时间：(\S*)\r/ }
      }
      console.log(tableHeader)
      this.getTextArray().then(textArray => {
        const xlsxArray = []
        textArray.forEach((text, index) => {
          const item = {}
          for (const key in tableHeader) {
            if (Object.hasOwnProperty.call(tableHeader, key)) {
              const element = tableHeader[key]
              // console.log(element.title, regExecRes)
              let matchRes = text.match(element.reg)
              if (matchRes) {
                matchRes = matchRes.filter(item => item && item.indexOf('\r') < 0)
                item[element.title] = matchRes[0]
              } else {
                item[element.title] = ''
              }
              console.log(element.title, element.vaule, 'hahah')
            }
          }
          xlsxArray.push(item)
        })
        console.log('json 结果', xlsxArray)
        const ws = xlsx.utils.json_to_sheet(xlsxArray)
        const wb = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(wb, ws, '患者信息')
        xlsx.writeFile(wb, '导出患者信息表格.xlsx')
      })
    },
    getTextArray () {
      const fileList = this.fileList
      const readerTxt = this.readerTxt
      return new Promise(function (resolve, reject) {
        try {
          const textArray = []
          fileList.forEach(async (file, index) => {
            const result = await readerTxt(file)
            textArray.push(result)
            if (index === (fileList.length - 1)) {
              resolve(textArray)
            }
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    readerTxt (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader()
        reader.onload = function () {
          if (reader.result) {
          // 显示文件内容
            // console.log(reader.result)
            resolve(reader.result)
          }
        }
        reader.onerror = function (e) {
          reject(reader.error)
          reader.abort()
        }
        reader.readAsText(file, 'gb2312')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.export-table-btn {
  margin-top: 10px;
}
</style>
