<template>
  <div class="appbox">
    <!-- <h1>App更新发布</h1> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div id="uploadFile">
        <!-- <h4>上传文件：</h4> -->
        <p class="input-zone">
          <!-- <span v-if="filename" class="selectText">{{ filename }}</span>
          <span v-else class="selectText">请选择文件上传</span>-->
          <a href="javascript:;" class="file">
            <i class="el-icon-upload"></i>
            选择安装包
            <input type="file" @change="upload" />
          </a>
          <!-- <input
            type="file"
            name="file"
            value
            placeholder="请选择文件"
            @change="upload"
            multiple="multiple"
          />-->
        </p>

        <!-- <p>上传进度：</p>
        <div class="progress-wrapper">
          <div class="progress-progress" :style="uploadStyle"></div>
          <div class="progress-rate">{{ (uploadRate * 100).toFixed(2) }}%</div>
        </div>-->
        <el-progress
          type="circle"
          color="teal"
          :percentage="Number(uploadNum)"
          v-show="uploadNum != 0 ? true : false"
        ></el-progress>
      </div>

      <!-- v-show="uploadNum != 0 ? true : false" -->

      <el-form-item label="App版本" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="更新说明" prop="des">
        <el-input type="textarea" v-model="ruleForm.des"></el-input>
      </el-form-item>

      <el-form-item label="合作方" prop="product">
        <el-select v-model="ruleForm.product" placeholder="请选择类型">
          <el-option label="云控" value="1"></el-option>
          <el-option label="联通" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="类型选择" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择类型">
          <el-option label="android" value="1"></el-option>
          <el-option label="ios" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Vue from 'vue'
import http from '../../ajax/http'

export default {
  data() {
    return {
      // 进度条显示文字
      uploadRate: 0,
      // 文件名称
      filename: '',
      // 进度条变化文字
      uploadStyle: {
        width: '0%'
      },
      // app上传地址
      appurl: '',

      // 用户id
      uid: '',
      // 输入信息
      ruleForm: {
        // App版本
        name: '',
        // 用户证件号
        // url: '',
        // 更新说明
        des: '',
        // 类型
        region: '',
        // 产品
        product: ''
      },

      // 输入规则
      rules: {
        // App版本
        name: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
        // App链接地址
        // url: [
        //   { required: true, message: '请输入App链接地址', trigger: 'blur' }
        // ],
        // 用户电话
        des: [{ required: true, message: '请输入更新说明', trigger: 'blur' }],
        // 账户类型
        region: [{ required: true, message: '请选择类型', trigger: 'change' }],
        // 产品
        product: [{ required: true, message: '请选择类型', trigger: 'change' }]
      },
      // 上传进度
      uploadNum: 0
    }
  },
  methods: {
    // 进度条和上传方法
    upload(e) {
      var vm = this
      var formData = new FormData()
      formData.append('name', 'Alax')
      for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files[i] //取第1个文件
        formData.append('app', file)
        vm.filename = file.name
        // console.log(file)
      }

      var config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function(e) {
          // console.log('进度：')
          // console.log(e)

          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到e.total和e.loaded
          if (e.lengthComputable) {
            var rate = (vm.uploadRate = e.loaded / e.total) //已上传的比例
            if (rate < 1) {
              //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
              //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
              //等响应回来时，再将进度设为100%
              // vm.uploadRate = rate

              vm.uploadNum = (rate * 100).toFixed(2)
            }
          }
        }
      }

      Vue.axios
        .post(
          'http://a.yumaoyou.cn:8008/index.php/appv1/usdpc2/appBarUpdate',
          formData,
          config
        )
        .then(res => {
          // console.log(res)
          this.appurl = res.data.url
          vm.uploadNum = 100
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'success'
          })
        })
    },

    // 行业选中后的回调
    handleChange(value) {
      // console.log(value)
    },

    // 提交按钮
    submitForm(formName) {
      // console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          if (this.uploadNum != Number(0)) {
            http
              .appupdate({
                uid: this.uid,
                type: this.ruleForm.region,
                version: this.ruleForm.name,
                url: this.appurl,
                des: this.ruleForm.des,
                hezuo: this.ruleForm.product
              })
              .then(res => {
                if (res.data.code == 14) {
                  this.$message({
                    showClose: true,
                    message: 'App发布成功',
                    type: 'success'
                  })
                  this.$router.go(0)
                } else {
                  this.$message({
                    showClose: true,
                    message: 'App发布失败',
                    type: 'error'
                  })
                }
                // console.log(res)
              })
              .catch(err => {
                console.log(err)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },

  created() {
    this.uid = localStorage.getItem('uid')
  }
}
</script>
<style lang="less">
.file {
  position: relative;
  display: inline-block;
  background: teal;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 10px 12px;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}

.appbox {
  width: 560px;
}
.block {
  margin-bottom: 22px;
  padding-left: 68px;
}
.demonstration {
  font-size: 14px;
  color: #606266;
  margin-left: -10px;
  margin-right: 14px;
}
#uploadFile {
  width: 400px;
  margin: 0 0 20px 100px;
}
.input-zone {
  width: 500px;
  color: blue;
  font-size: 14px;
  position: relative;
}
.input-zone input[type='file'] {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  cursor: pointer;
}
.progress-wrapper {
  position: relative;
  height: 20px;
  border-radius: 5px;
  background-color: lightgrey;
}

// 进度条变化颜色
.progress-wrapper .progress-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  border-radius: 5px;
  background-color: darkturquoise;
  z-index: 1;
}
.progress-wrapper .progress-rate {
  position: relative;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  height: 100%;
  z-index: 2;
}
</style>
