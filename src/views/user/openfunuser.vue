<template>
  <div class="openuser">
    <div class="back">
      <el-button @click="back" size="small">返回</el-button>
    </div>

    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业用户</el-breadcrumb-item>
        <el-breadcrumb-item>开通账号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="qiye">
        <span class="newscover">企业</span>
        <el-select v-model="value" filterable placeholder="请选择企业">
          <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import http from '../../ajax/http'

export default {
  data() {
    return {
      // 企业列表
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      // 列表绑定value
      value: '',

      ruleForm: {
        nickname: '',
        phone: '',
        username: ''
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 返回按钮
    back() {
      this.$router.go(-1)
    },

    // 获取全部企业
    getallcompany() {
      http
        .getallcompany()
        .then(res => {
          console.log(res)
          this.options = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          if (this.value == '') {
            this.$message({
              showClose: true,
              message: '请选择企业',
              type: 'warning'
            })
          } else {
            http
              .openfunuser({
                nick: this.ruleForm.nickname,
                username: this.ruleForm.username,
                phone: this.ruleForm.phone,
                gid: this.value
              })
              .then(res => {
                console.log(res)
                this.$message({
                  message: '开通账户成功',
                  type: 'success'
                })
                this.$router.push({ path: '/zhanghaolist' })
              })
              .catch(err => {
                console.log(err)
                this.$message.error('开通账户失败')
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
  mounted() {
    this.getallcompany()
  }
}
</script>
<style lang="less" scoped>
.openuser {
  width: 560px;
}

.qiye {
  display: flex;
  margin-bottom: 22px;
  padding-left: 64px;
  line-height: 40px;
}
.newscover {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}
.bread {
  margin: 20px 0;
}
</style>
