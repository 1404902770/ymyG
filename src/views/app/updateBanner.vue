<template>
  <div>
    <h1>更新轮播图</h1>
    <div class="banner">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="网址" prop="addressurl">
          <el-input v-model="ruleForm.addressurl"></el-input>
        </el-form-item>

        <div class="status">
          <span class="stauscover">状态</span>
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="0">不启用</el-radio>
        </div>

        <el-form-item label="备注" prop="note">
          <el-input v-model="ruleForm.note"></el-input>
        </el-form-item>
        <!-- 文件上传 -->
        <div class="upload-demo">
          <span class="newscover">轮播图</span>
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

        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 名字，图片，网址，状态，备注，描述 -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import http from '../../ajax/http'

export default {
  data() {
    // id: 1
    // name: "测试1"
    // img: "admin/background/bg2.png"
    // desc: "让用电更安全"
    // url: "www.baidu.com"
    // status: 0
    // beizhu: "暂时没有备注"
    return {
      url: '',
      id: '',

      // 轮播图状态
      radio: '',

      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        // 名称
        name: '',
        // 描述
        desc: '',
        // 备注
        note: '',
        // 网址
        addressurl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '请填写描述', trigger: 'blur' }],
        note: [{ required: true, message: '请填写备注', trigger: 'blur' }],
        addressurl: [{ required: true, message: '请填写网址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 文件上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(response) {
      console.log(response)
      // this.form.salerimg = response.data.url
    },

    // 上传轮播图
    uploadbanner() {
      http
        .uploadbanner({
          uid: localStorage.getItem('uid'),
          name: this.ruleForm.name,
          desc: this.ruleForm.desc,
          beizhu: this.ruleForm.note,
          url: this.ruleForm.addressurl,
          status: this.radio,
          img: this.imgurl
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 30) {
            this.$message({
              showClose: true,
              message: '新增成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '新增失败',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 表单提交
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          if (this.ruleForm.addressurl != '') {
            this.uploadbanner()
          } else {
            this.updatebanner()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 上传图片
    changeHandle() {
      const file = this.url
      console.log(file)
      const data = new FormData()
      data.append('img', file)
      Vue.axios
        .post('/bapi/appv1/usdpc2/bannerImgUpload', data, {
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

    // 获取图片
    aaa(e, a) {
      this.url = a[0].raw
      this.changeHandle()
      // console.log(e, a)
    },

    // 获取上传图片地址
    sendimg() {
      // this.changeHandle()
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.banner {
  width: 560px;
}
.el-textarea__inner {
  resize: none;
}
.upload-demo {
  width: 400px;
  margin-left: 51px;
  display: flex;
  margin-bottom: 10px;
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
.newscover {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}

.status {
  width: 400px;
  margin-left: 60px;
  display: flex;
  margin-bottom: 20px;
}
.stauscover {
  font-size: 14px;
  color: #606266;
  margin-right: 12px;
}
</style>
