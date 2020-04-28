<template>
  <div class="userbox">
    <!-- <h1>开通账户</h1> -->
    <div class="back">
      <el-button @click="back" size="small">返回</el-button>
    </div>

    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业用户</el-breadcrumb-item>
        <el-breadcrumb-item>开通账户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="userid">
        <el-input v-model="ruleForm.userid"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="call">
        <el-input v-model.number="ruleForm.call"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="紧急联系人" prop="user">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="紧急电话" prop="alarmcall">
        <el-input v-model.number="ruleForm.alarmcall"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="note">
        <el-input v-model="ruleForm.note"></el-input>
      </el-form-item>

      <!-- 省市区选择 -->
      <div class="region">
        <span class="newscover">选择地区</span>
        <v-distpicker
          :province="temp.address__province"
          :city="temp.address__city"
          :area="temp.address__dist"
          @selected="onSelected"
        ></v-distpicker>
      </div>

      <!-- 行业 -->
      <div class="selectHangye">
        <span class="newscover">选择行业</span>
        <el-select v-model="value1" placeholder="请选择" @change="a1">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.text"
            :value="item.text"
          ></el-option>
        </el-select>

        <el-select
          v-model="value2"
          placeholder="请选择"
          @change="a2"
          :disabled="value1 == '' ? true : false"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.text"
            :value="item.text"
          ></el-option>
        </el-select>

        <el-select
          v-model="value3"
          placeholder="请选择"
          @change="a3"
          :disabled="value2 == '' ? true : false"
        >
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.text"
            :value="item.text"
          ></el-option>
        </el-select>

        <el-select v-model="value4" placeholder="请选择" :disabled="value3 == '' ? true : false">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.text"
            :value="item.text"
          ></el-option>
        </el-select>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import http from '../../ajax/http'
import Vue from 'vue'

export default {
  data() {
    return {
      // 行业信息
      options1: [],
      options2: [],
      options3: [],
      options4: [],

      value1: '',
      value2: '',
      value3: '',
      value4: '',

      // 省市区信息
      temp: {
        address__province: '',
        address__city: '',
        address__dist: ''
      },

      // 输入信息
      ruleForm: {
        // 账户名称
        name: '',
        // 用户证件号
        userid: '',
        // 用户电话
        call: '',
        // 用户地址
        address: '',
        // 联系人
        user: '',
        // 报警电话
        alarmcall: '',
        // 账户类型
        region: '',
        // 账户权限
        type: [],
        // 账户
        resource: '',
        // 备注信息
        note: ''
      },

      // 输入规则
      rules: {
        // 账户名称规则
        name: [
          { required: true, message: '请输入账户名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 用户证件号
        userid: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        // 用户电话
        call: [
          { required: true, message: '请输入用户号码', trigger: 'blur' },
          { type: 'number', message: '电话必须为数字值' }
        ],
        // 用户地址
        address: [
          { required: true, message: '请输入用户地址', trigger: 'blur' }
        ],
        // 联系人
        user: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // 报警电话
        alarmcall: [
          { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
          { type: 'number', message: '电话必须为数字值' }
        ],
        // 账户类型
        region: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ],
        // 账户权限
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个账户权限',
            trigger: 'change'
          }
        ],
        // 账户
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        // 行业分类
        sorts: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        // 备注信息
        note: [{ required: true, message: '请选择分类', trigger: 'blur' }]
      }
    }
  },

  components: { VDistpicker },

  methods: {
    // 返回按钮
    back() {
      this.$router.go(-1)
    },

    // 选择省市区
    onSelected(data) {
      console.log(data)
      this.temp.address__province = data.province.value
      this.temp.address__city = data.city.value
      this.temp.address__dist = data.area.value
    },
    // 选择第一个行业
    a1(aa) {
      // console.log(aa)
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].text == aa) {
          this.options2 = this.options1[i].children
        }
      }
    },
    // 选择第二个行业
    a2(aa) {
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].text == aa) {
          this.options3 = this.options2[i].children
        }
      }
    },
    // 选择第三个行业
    a3(aa) {
      for (let i = 0; i < this.options3.length; i++) {
        if (this.options3[i].text == aa) {
          this.options4 = this.options3[i].children
        }
      }
    },

    // 行业选中后的回调
    handleChange(value) {
      console.log(value)
    },

    province(e) {
      console.log(e)
    },

    // 获取json文件的行业信息
    get() {
      var _this = this
      Vue.axios
        .get('hangye.json')
        .then(function(response) {
          // console.log(response)
          _this.options1 = response.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    // 提交注册企业
    send() {
      http
        .registered({
          uid: localStorage.getItem('uid'),
          name: this.ruleForm.name,
          zjhao: this.ruleForm.userid,
          priv: this.temp.address__province,
          shi: this.temp.address__city,
          xian: this.temp.address__dist,
          xiang: this.ruleForm.address,
          lianxiren: this.ruleForm.user,
          lxtel: this.ruleForm.alarmcall,
          beizhu: this.ruleForm.note,
          dalei: this.value1,
          zhonglei: this.value2,
          xiaolei: this.value4
        })
        .then(res => {
          console.log(res)
          this.$message({
            message: '企业注册成功',
            type: 'success'
          })
          this.$router.push({ path: 'funuser' })
        })
        .catch(err => {
          this.$message.error('企业注册失败')
        })
    },

    // 提交按钮
    submitForm(formName) {
      // console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          if (this.temp == '') {
            this.$message({
              message: '请选择地区',
              type: 'warning'
            })
          } else if (this.value1 == '') {
            this.$message({
              message: '请选择行业',
              type: 'warning'
            })
          } else {
            this.send()
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
    // console.log(this.$route.params)
    // let { date, name, address } = this.$route.params
    // console.log(date, name, address)
  },
  mounted() {
    this.get()
  }
}
</script>
<style lang="less" scoped>
.userbox {
  width: 780px;
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
.region {
  display: flex;
  line-height: 40px;
  margin-bottom: 20px;
  padding-left: 36px;
}
.newscover {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}
.el-select {
  width: 170px;
}
.selectHangye {
  padding-left: 36px;
  margin-bottom: 20px;
}
.bread {
  margin: 20px 0;
}
</style>
