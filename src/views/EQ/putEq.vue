<template>
  <div class="equipment">
    <!-- <h1>设备入库</h1> -->
    <div class="back">
      <el-button @click="back" size="small">返回</el-button>
    </div>

    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备入库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="产品版本" prop="code">
        <el-select v-model="ruleForm.code" placeholder="请选择产品代码">
          <template v-for="(item, index) in code">
            <el-option :label="item.name" :value="item.id" :key="index"></el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="是否带漏电" prop="loudian">
        <el-select v-model="ruleForm.loudian" placeholder="请选择活动区域">
          <el-option label="带漏电" value="1"></el-option>
          <el-option label="不带漏电" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设备型号" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择设备型号">
          <template v-for="(item, index) in region">
            <el-option :label="item.name" :value="item.name" :key="index"></el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="规格" prop="guige">
        <el-input v-model="ruleForm.guige"></el-input>
      </el-form-item>

      <el-form-item label="极数" prop="jishu">
        <el-select v-model="ruleForm.jishu" placeholder="请选择极数">
          <template v-for="(item, index) in jishu">
            <el-option :label="item.name" :value="item.name" :key="index"></el-option>
          </template>
        </el-select>
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
      //产品代码
      code: [
        {
          id: 1,
          name: '第一代'
        },
        {
          id: 2,
          name: '第二代'
        }
      ],

      // 设备型号
      region: [
        {
          id: 1,
          name: 'ASDASDASDASD100- 100'
        },
        {
          id: 2,
          name: '区域二'
        }
      ],
      // 极数
      jishu: [
        {
          id: 1,
          name: '1P'
        },
        {
          id: 2,
          name: '2P'
        },
        {
          id: 3,
          name: '3P'
        },
        {
          id: 4,
          name: '4P'
        }
      ],

      ruleForm: {
        code: '',
        // 设备名称
        name: '',
        // 设备类型
        region: '',
        // 规格
        guige: '',
        // 极数
        jishu: '',
        loudian: ''
      },
      rules: {
        // 设备名称规则
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 设备型号
        region: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        // 规格规则
        guige: [{ required: true, message: '请输入设备规格', trigger: 'blur' }],
        // 极数规则
        jishu: [
          { required: true, message: '请输入设备极数', trigger: 'change' }
        ],
        // 账户权限
        code: [
          { required: true, message: '请选择产品代码', trigger: 'change' }
        ],
        // 漏电
        loudian: [
          { required: true, message: '请选择产品代码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 设备入库
    puteq() {
      http
        .puteq({
          code: this.ruleForm.code,
          nid: this.ruleForm.name,
          xinghao: this.ruleForm.region,
          guige: this.ruleForm.guige,
          jishu: this.ruleForm.jishu,
          uid: localStorage.getItem('uid'),
          lou: Number(this.ruleForm.loudian)
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 40) {
            this.$message({
              message: '设备入库成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '设备已入库',
              type: 'warning'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          this.puteq()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 返回按钮
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.equipment {
  width: 560px;
}
.bread {
  margin: 20px 0;
}
</style>
