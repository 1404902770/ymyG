<template>
  <div class="bannerbox">
    <!-- <h1>轮播图列表</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>App设置</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <template>
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="headClass"
        style="width: 100%"
      >
        <el-table-column label="名称" align="center" min-width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="轮播图" align="center" min-width="130">
          <template slot-scope="scope">
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            <img
              class="bannerimg"
              :src="
                'http://b.yumaoyou.cn:8008/admin/background/' + scope.row.img
              "
              alt
            />
          </template>
        </el-table-column>

        <el-table-column label="链接地址" align="center" min-width="150">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.url }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="描述" align="center" min-width="180">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.desc }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" min-width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-text="scope.row.status == 1 ? '启用' : '不启用'"
              active-color="#13ce66"
              :active-value="1"
              inactive-color="#ff4949"
              :inactive-value="0"
              @change="updatechange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center" min-width="160">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.beizhu }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="时间" align="center" min-width="100">
          <template slot-scope="scope">
            <el-tag size="medium">{{
              new Date(scope.row.time * 1000).Format('yy-MM-dd')
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handedit(scope.$index, scope.row)">
              <el-button
                type="text"
                size="mini"
                @click="dialogFormVisible = true"
                >修改</el-button
              >
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handdelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="bindbox">
        <el-dialog :visible.sync="dialogFormVisible" width="35%">
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

              <el-form-item label="备注" prop="beizhu">
                <el-input v-model="ruleForm.beizhu"></el-input>
              </el-form-item>

              <el-form-item label="链接地址" prop="url">
                <el-input v-model="ruleForm.url"></el-input>
              </el-form-item>

              <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>

              <el-form-item class="fun">
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >修改</el-button
                >
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>

            <!-- 名字，图片，网址，状态，备注，描述 -->
          </div>
        </el-dialog>
      </div>

      <div class="add">
        <el-button type="primary" size="small" @click="addbanner">
          <i class="el-icon-plus"></i>新增轮播图
        </el-button>
      </div>

      <div class="addbanner">
        <el-dialog :visible.sync="dialogFormVisible2" width="35%">
          <el-form
            :model="ruleFormadd"
            :rules="rulesadd"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div style="display:flex">
              <el-form-item label="名称" prop="name">
                <el-input v-model="ruleFormadd.name2"></el-input>
              </el-form-item>

              <el-form-item label="网址" prop="addressurl">
                <el-input v-model="ruleFormadd.addressurl2"></el-input>
              </el-form-item>
            </div>

            <!-- <el-form-item label="名称" prop="name">
              <el-input v-model="ruleFormadd.name2"></el-input>
            </el-form-item>

            <el-form-item label="网址" prop="addressurl">
              <el-input v-model="ruleFormadd.addressurl2"></el-input>
            </el-form-item>-->

            <div style="display:flex">
              <div class="status">
                <span class="stauscover">状态</span>
                <el-radio v-model="radio" label="1">启用</el-radio>
                <el-radio v-model="radio" label="0">不启用</el-radio>
              </div>

              <el-form-item label="备注" prop="note">
                <el-input v-model="ruleFormadd.note2"></el-input>
              </el-form-item>
            </div>

            <!-- <div class="status">
              <span class="stauscover">状态</span>
              <el-radio v-model="radio" label="1">启用</el-radio>
              <el-radio v-model="radio" label="0">不启用</el-radio>
            </div>

            <el-form-item label="备注" prop="note">
              <el-input v-model="ruleFormadd.note2"></el-input>
            </el-form-item>-->
            <!-- 文件上传 -->
            <div class="upload-demo">
              <span class="newscover">轮播图</span>
              <el-upload
                action
                :auto-upload="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="aaa"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>

            <el-form-item label="描述" prop="desc">
              <el-input type="textarea" v-model="ruleFormadd.desc2"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitFormadd('ruleForm')"
                >立即创建</el-button
              >
              <el-button @click="resetFormadd('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </template>
  </div>
</template>
<script>
import http from '../../ajax/http'
import Vue from 'vue'

export default {
  data() {
    return {
      url: '',
      id: '',
      // 轮播图状态
      radio: '',
      ruleFormadd: {
        // 名称
        name2: '',
        // 描述
        desc2: '',
        // 备注
        note2: '',
        // 网址
        addressurl2: ''
      },
      rulesadd: {
        name2: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        desc2: [{ required: true, message: '请填写描述', trigger: 'blur' }],
        note2: [{ required: true, message: '请填写备注', trigger: 'blur' }],
        addressurl2: [
          { required: true, message: '请填写网址', trigger: 'blur' }
        ]
      },

      dialogTableVisible2: false,
      dialogFormVisible2: false,

      // 状态
      value1: true,

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        lou: '',
        jishu: '',
        xinghao: ''
      },
      formLabelWidth: '72px',

      loudian1: '0',
      jisuh1: '0',
      xinghao: '0',

      // 表单数据
      tableData: [],

      dialogImageUrl: '',
      dialogVisible: false,
      // 修改轮播图数据
      imgurl: '',
      url: '',
      id: '',
      ruleForm: {
        // 名称
        name: '',
        // 描述
        desc: '',
        // 备注
        beizhu: '',
        url: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写描述', trigger: 'blur' }],
        beizhu: [{ required: true, message: '请填写备注', trigger: 'blur' }],
        url: [{ required: true, message: '请填写地址', trigger: 'blur' }]
      },

      // 修改轮播图列表
      list: [],
      // 轮播图列表
      bannerlist: []
    }
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 上传轮播图
    uploadbanner() {
      http
        .uploadbanner({
          uid: localStorage.getItem('uid'),
          name: this.ruleFormadd.name2,
          desc: this.ruleFormadd.desc2,
          beizhu: this.ruleFormadd.note2,
          url: this.ruleFormadd.addressurl2,
          status: this.radio,
          img: this.imgurl
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 30) {
            this.$message({
              showClose: true,
              message: '新增成功',
              type: 'success'
            })
            this.dialogFormVisible2 = false
            this.getbannerlist()
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
    submitFormadd(formName) {
      // console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          this.uploadbanner()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetFormadd(formName) {
      // this.$refs[formName].resetFields()
      this.dialogFormVisible2 = false
    },

    // 编辑按钮
    handedit(index, row) {
      // this.list.push(row)

      // console.log(row)
      this.ruleForm = row
      // this.dialogImageUrl = 'http://b.yumaoyou.cn:8008/' + this.ruleForm.img
      // this.dialogVisible = true
      // console.log(this.dialogImageUrl)
    },
    // 删除按钮
    handdelete(index, row) {
      if (row.status == 1) {
        this.$message({
          message: '请先禁用轮播图',
          type: 'warning'
        })
      } else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            http
              .deletebanner({ uid: localStorage.getItem('uid'), id: row.id })
              .then(res => {
                // console.log(res)
                if (res.data.code == 28) {
                  this.getbannerlist()
                  this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    showClose: true,
                    message: '删除失败',
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }

      console.log(index, row)
    },

    // 获取轮播图列表
    getbannerlist() {
      http
        .getbannerlist()
        .then(res => {
          // console.log(res)
          // if (res.data.statue == 0) {
          //   this.value1 = false
          // } else {
          //   this.value1 = true
          // }
          this.tableData = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit(index, row) {
      // console.log(index, row)
      // this.list = this.tableData[index]
      // console.log(this.list)
    },
    // 切换启用状态
    updatechange(row) {
      // console.log(row)
      http
        .isbanner({
          uid: localStorage.getItem('uid'),
          id: row.id,
          sta: row.status
        })
        .then(res => {
          // console.log(res)
          // if (res.data.code == 26) {
          //   this.$message({
          //     showClose: true,
          //     message: '启用成功',
          //     type: 'success'
          //   })
          // } else {
          //   this.$message({
          //     showClose: true,
          //     message: '启用失败',
          //     type: 'error'
          //   })
          // }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 文件上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handleSuccess(response) {
      // console.log(response)
      // this.form.salerimg = response.data.url
    },
    // 获取图片
    aaa(e, a) {
      // console.log(e, a)
      this.url = a[0].raw
      this.changeHandle()
    },
    // sendimg() {
    //   this.changeHandle()
    // },
    // 上传图片
    changeHandle() {
      const file = this.url
      // console.log(file)
      const data = new FormData()
      data.append('img', file)
      Vue.axios
        .post('/bapi/appv1/usdpc2/bannerImgUpload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          // console.log(res)
          this.imgurl = res.data.url
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 修改轮播图
    updatebanner() {
      http
        .updatebanner({
          uid: localStorage.getItem('uid'),
          id: this.ruleForm.id,
          name: this.ruleForm.name,
          desc: this.ruleForm.desc,
          beizhu: this.ruleForm.beizhu,
          url: this.ruleForm.url
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 24) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getbannerlist()
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error'
          })
        })
    },
    // 表单提交
    submitForm(formName) {
      // console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!')
          this.updatebanner()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },

    // 点击新增
    addbanner() {
      this.dialogFormVisible2 = true
    }
  },
  mounted() {
    this.getbannerlist()
  }
}
</script>
<style lang="less" scoped>
.bread {
  margin: 0 0 20px 0;
}

.bannerbox {
  margin-top: 25px;
}
.el-tag {
  border: none;
  padding: 0;
  background-color: transparent;
  color: #333;
}
.bannerimg {
  width: 50px;
  height: 30px;
}

.el-dialog {
  // display: flex;
  margin-top: 10vh !important;
}

.el-form-item__content {
  margin-left: 58px !important;
}

.cell:last-child .el-button:first-child {
  padding: 0 0 !important;
  width: 56px;
  height: 28px;
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

// 新增轮播图
.add {
  position: absolute;
  right: 90px;
  top: 87px;
}

.status {
  width: 243px;
  margin-left: 60px;
  display: flex;
  margin-bottom: 20px;
}
.stauscover {
  font-size: 14px;
  color: #606266;
  margin-right: 12px;
}

.fun {
  // margin-left: 280px;
  text-align: end;
}
</style>
