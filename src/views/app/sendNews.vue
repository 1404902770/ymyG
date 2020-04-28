<template>
  <div>
    <h1>发布新闻</h1>
    <div class="news">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="upload-demo">
          <span class="newscover">新闻封面</span>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="aaa"
            :on-success="sendimg"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>

        <el-form-item label="新闻标题" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="发布者" prop="senduser">
          <el-input v-model="ruleForm.senduser"></el-input>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>-->
      </el-form>

      <!-- 名字，图片，网址，状态，备注，描述 -->
    </div>
    <div ref="editor" id="editor">
      <!-- <p>欢迎使用 wangEditor 富文本编辑器</p> -->
    </div>
    <el-button @click="onSubmit">发布新闻</el-button>
  </div>
</template>
<script>
import E from 'wangeditor'
import http from '../../ajax/http'
import Vue from 'vue'

export default {
  name: 'FuncFormsEdit',
  data() {
    return {
      // 图片地址
      dialogImageUrl: '',
      dialogVisible: false,
      pic: '',

      imgurl: '',

      uid: '',
      editor: '',
      // 富文本内容
      content: '',
      ruleForm: {
        // 名称
        name: '',
        // 发布者
        senduser: ''
        // 封面标题
        // pictext: ''
      },
      rules: {
        name: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        senduser: [
          { required: true, message: '请输入发布者', trigger: 'change' }
        ]
        // pictext: [
        //   { required: true, message: '请输入封面标题', trigger: 'change' }
        // ]
      }
    }
  },
  methods: {
    // 富文本编辑器
    getSrcurl() {
      this.setEditor(1, 2)
    },
    setEditor(srcurl, pushfunc) {
      // 初始化编辑器
      this.editor = new E(this.$refs.editor)
      // this.editor.customConfig.uploadImgServer = srcurl;
      this.editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgMaxLength = 1
      this.editor.customConfig.withCredentials = true
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.customConfig.uploadImgHooks = {
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // result 必须是一个 JSON 格式字符串！！！否则报错
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          insertImg(result.msg)
          pushfunc(result.dto)
          console.log(result.dto, result.msg)
        }
      }
      this.editor.customConfig.onchange = html => {
        this.content = html
      }
      this.editor.create()
    },

    // 提交按钮
    onSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // alert('submit!')
          // console.log(this.ruleForm, this.content)
          http
            .sendnews({
              uid: 1,
              title: this.ruleForm.name,
              txt: this.content,
              img: this.imgurl,
              fabu: this.ruleForm.senduser
            })
            .then(res => {
              console.log(res)
              this.$message({
                message: '发布成功',
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '发布失败',
                type: 'success'
              })
            })
          // this.changeHandle()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 上传图片
    changeHandle() {
      const file = this.url
      console.log(file)
      const data = new FormData()
      data.append('img', file)

      Vue.axios
        .post('/bapi/appv1/usdpc2/zcfabuImg', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res)
          this.imgurl = res.data.url
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 删除图片触发
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 获取图片
    aaa(e, a) {
      this.url = a[0].raw
      // console.log(e, a)
    },

    // 获取上传图片地址
    sendimg() {
      this.changeHandle()
    }
  },
  created() {
    this.uid = localStorage.getItem('uid')
  },
  mounted() {
    this.getSrcurl()
  }
}
</script>
<style lang="less">
// 上传图片
.upload-demo {
  width: 400px;
  margin-left: 37px;
  display: flex;
  margin-bottom: 10px;
}

// 新闻封面文字
.newscover {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}
.el-message-box__wrapper {
  z-index: 10001 !important;
}

.update-item {
  width: 90px;
  height: 120px;
  margin: 0 auto;
  background-color: #fff;
  background-size: 67px 64px;
  background-position: center center;
  background-repeat: no-repeat;
}
input.file-update {
  width: 90px;
  height: 120px;
  background-color: transparent;
  border: 1px dashed #ededed;
  text-indent: -9999px;
  opacity: 0;
}
</style>
