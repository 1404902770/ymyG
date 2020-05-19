<template>
  <!-- 登录 -->
  <div class="login">
    <div class="z1">
      <div class="l"></div>
      <div class="r">
        <h1>云控管理系统</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="accountNumber">
            <img class="lb" src="../../public/static/images/lb_3.png" alt />
            <el-input v-model="ruleForm.accountNumber" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <img class="lb" src="../../public/static/images/lb_1.png" alt />
            <el-input type="password" v-model="ruleForm.Password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <img class="lb" src="../../public/static/images/lb_2.png" alt />
            <el-input
              v-model="ruleForm.verificationCode"
              placeholder="请输入验证码"
              style="width: 60%;float: left;"
            ></el-input>
            <el-tooltip class="item" effect="light" content="点击更新" placement="bottom">
              <p class="yzm" @click="ghyzm" v-loading="loading">
                <span>{{ num1 }}</span>
                <span>{{ fh }}</span>
                <span>{{ num2 }}</span>
                <span>=</span>
                <span>?</span>
              </p>
            </el-tooltip>
          </el-form-item>
          <el-form-item style="margin-bottom:0;">
            <el-button type="primary" class="dl" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <!-- <el-form-item class="AdministratorsTeacher">
            <el-button type="text" @click="AdministratorsTeacher(1)" v-if="at == 1">管理员登录</el-button>
            <el-button type="text" @click="AdministratorsTeacher(2)" v-else-if="at ==2">老师登录</el-button>
          </el-form-item>-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../ajax/http'
import $ from 'jquery'
// import Qs from 'qs'
import ElementUI from 'element-ui'
import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    return {
      // 账号密码验证码
      ruleForm: {
        accountNumber: 'admin',
        Password: '123456',
        verificationCode: ''
      },
      // 表单格式判定
      rules: {
        accountNumber: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        Password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false, // loading
      num1: '', // 第一个数
      num2: '', // 第二个数
      fh: '', // 验证码符号  +  -  *  /
      yzms: '' // 正确的验证码
    }
  },
  // 事件集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let _this = this
        if (valid) {
          if (_this.ruleForm.verificationCode) {
            if (Number(_this.ruleForm.verificationCode) != _this.yzms) {
              _this.ruleForm.verificationCode = ''
              _this.ghyzm()
              _this.$message.warning('验证码有误,请重新填写')
              return false
            } else {
              ElementUI.Loading.service({
                fullscreen: true,
                background: 'rgba(0,0,0,.4)'
              })
              // let instance = this.$axios.create()
              http
                .userLogin(
                  // Qs.stringify({
                  //   username: 'admin',
                  //   password: md5('admin')
                  // })
                  {
                    username: _this.ruleForm.accountNumber,
                    password: md5(_this.ruleForm.Password)
                  }
                )
                // instance({
                //   headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                //   },
                //   method: 'post',
                //   url: '/api/appv1/usdpc1/userLogin',
                //   data: Qs.stringify({
                //     username: _this.ruleForm.accountNumber,
                //     password: md5(_this.ruleForm.Password)
                //   })
                // })
                .then(res => {
                  // console.log(res)
                  // console.log
                  if (res.data.code == 4) {
                    setTimeout(function() {
                      // localStorage.setItem('token', '测试token')
                      localStorage.setItem('uid', res.data.data.uid) // 用户id：用户的唯一标识
                      // localStorage.setItem('type', res.data.data.type) // 1、企业用户；2、个人用户；3、定制用户
                      localStorage.setItem('username', res.data.data.username) // 用户名
                      localStorage.setItem('lei', res.data.data.lei) // 昵称
                      localStorage.setItem('himg', res.data.data.himg) // 户头像
                      ElementUI.Loading.service({}).close()
                      _this.$router.push('/funuser')
                      // _this.$router.push('/funuser')
                    }, 1000)
                  } else if (res.data.code == 5) {
                    ElementUI.Loading.service({}).close()
                    _this.$message.warning('密码错误')
                    _this.ghyzm()
                  } else if (res.data.code == 3) {
                    ElementUI.Loading.service({}).close()
                    _this.$message.warning('用户名未知')
                    _this.ghyzm()
                  } else if (res.data.code == 2) {
                    ElementUI.Loading.service({}).close()
                    _this.$message.warning('用户名输入错误')
                    _this.ghyzm()
                  } else {
                    ElementUI.Loading.service({}).close()
                    _this.$message.warning(res.data.message)
                    _this.ghyzm()
                  }
                })
            }
          } else {
            _this.$message.warning('请填写验证码')
            return false
          }
        }
      })
    },
    // // 管理员 - 老师
    // AdministratorsTeacher(type) {
    //   if (type == 1) {
    //     this.at = 2;
    //     this.$message.success("已选择管理员登录");
    //   } else {
    //     this.at = 1;
    //     this.$message.success("已选择老师登录");
    //   }
    // },
    // 更新验证码
    ghyzm() {
      let _this = this
      _this.ruleForm.verificationCode = ''
      let num1 = Math.ceil(Math.random() * 10)
      let num2 = Math.ceil(Math.random() * 10)
      let num3 = Math.ceil(Math.random() * 3)
      _this.num1 = num1
      _this.num2 = num2
      if (num3 == 1) {
        _this.fh = '+'
        _this.yzms = num1 + num2
      } else if (num3 == 2) {
        _this.fh = '-'
        if (num1 < num2) {
          _this.yzms = num2 - num1
          _this.num1 = num2
          _this.num2 = num1
        } else {
          _this.yzms = num1 - num2
        }
      } else if (num3 == 3) {
        _this.fh = '*'
        _this.yzms = num1 * num2
      } else {
        _this.fh = '+'
        _this.yzms = num1 + num2
      }
      _this.loading = true
      setTimeout(function() {
        _this.loading = false
      }, 1000)
    }
  },
  mounted() {
    this.ghyzm()
    let _this = this

    // 键盘点击回车登录
    $('body').keydown(function() {
      if (event.keyCode == '13') {
        if (_this.ruleForm.verificationCode) {
          if (Number(_this.ruleForm.verificationCode) != _this.yzms) {
            _this.ruleForm.verificationCode = ''
            _this.ghyzm()
            _this.$message.warning('验证码有误,请重新填写')
            return false
          } else {
            ElementUI.Loading.service({
              fullscreen: true,
              background: 'rgba(0,0,0,.4)'
            })
            // let instance = this.$axios.create()
            http
              .userLogin(
                // Qs.stringify({
                //   username: 'admin',
                //   password: md5('admin')
                // })
                {
                  username: _this.ruleForm.accountNumber,
                  password: md5(_this.ruleForm.Password)
                }
              )
              // instance({
              //   headers: {
              //     'Content-Type': 'application/x-www-form-urlencoded'
              //   },
              //   method: 'post',
              //   url: '/api/appv1/usdpc1/userLogin',
              //   data: Qs.stringify({
              //     username: _this.ruleForm.accountNumber,
              //     password: md5(_this.ruleForm.Password)
              //   })
              // })
              .then(res => {
                // console.log(res)
                // console.log
                if (res.data.code == 4) {
                  setTimeout(function() {
                    // localStorage.setItem('token', '测试token')
                    localStorage.setItem('uid', res.data.data.uid) // 用户id：用户的唯一标识
                    // localStorage.setItem('type', res.data.data.type) // 1、企业用户；2、个人用户；3、定制用户
                    localStorage.setItem('username', res.data.data.username) // 用户名
                    localStorage.setItem('lei', res.data.data.lei) // 昵称
                    localStorage.setItem('himg', res.data.data.himg) // 户头像
                    ElementUI.Loading.service({}).close()
                    _this.$router.push('/funuser')
                    // _this.$router.push('/funuser')
                  }, 1000)
                } else if (res.data.code == 5) {
                  ElementUI.Loading.service({}).close()
                  _this.$message.warning('密码错误')
                  _this.ghyzm()
                } else if (res.data.code == 3) {
                  ElementUI.Loading.service({}).close()
                  _this.$message.warning('用户名未知')
                  _this.ghyzm()
                } else if (res.data.code == 2) {
                  ElementUI.Loading.service({}).close()
                  _this.$message.warning('用户名输入错误')
                  _this.ghyzm()
                } else {
                  ElementUI.Loading.service({}).close()
                  _this.$message.warning(res.data.message)
                  _this.ghyzm()
                }
              })
          }
        } else {
          _this.$message.warning('请填写验证码')
          return false
        }
      }
    })
  },
  // 初始化数据
  created() {}
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url(../../public/static/images/login_1.png) center no-repeat
    no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .z1 {
    width: 800px;
    height: 330px;
    background: #fff;
    margin: auto;
    margin-top: 15%;
    border-radius: 10px;
    .l {
      width: 50%;
      height: 100%;
      float: left;
      background: url(../../public/static/images/login_2.png) center no-repeat
        no-repeat;
      background-size: 100% 100%;
    }
    .r {
      overflow: hidden;
      h1 {
        color: #2978fe;
        font-size: 16px;
        font-weight: 600;
        margin-top: 20px;
        text-align: center;
      }
      .demo-ruleForm {
        .lb {
          display: block;
          width: 20%;
          position: absolute;
          width: 30px;
          height: 30px;
          z-index: 1;
          margin: 5px 0 0 5px;
        }
        .dl {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0;
        }
        .AdministratorsTeacher {
          text-align: right;
        }
        .yzm {
          width: 35%;
          float: right;
          line-height: 40px;
          color: #e6a23c;
          letter-spacing: 6px;
          border-radius: 4px;
          background: url(../../public/static/images/yzm.jpg) center no-repeat
            no-repeat;
          background-size: 100% 100%;
          font-size: 14px;
          cursor: pointer;
          text-align: center;
          margin: 0;
        }
      }
    }
  }
}
.el-form {
  display: block;
  width: 80%;
  margin: auto;
  padding-top: 20px;
}
.el-input {
  height: 40px !important;
  line-height: 40px !important;
}
.login /deep/ .el-form-item__content {
  line-height: 0 !important;
}
.el-form-item {
  margin-bottom: 18px;
}
.login /deep/ .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
  padding-left: 40px;
}
</style>
