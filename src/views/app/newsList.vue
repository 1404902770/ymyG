<template>
  <div class="newslist">
    <!-- <h1>新闻列表</h1> -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>App设置</el-breadcrumb-item>
        <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="add">
        <el-button type="primary" size="small" @click="addnews">
          <i class="el-icon-plus"></i>发布新闻
        </el-button>
      </div>
    </div>

    <div class="mymain">
      <template>
        <el-table :data="tableData" stripe :header-cell-style="headClass" style="width: 100%">
          <el-table-column label="日期" align="center" min-width="100">
            <template slot-scope="scope">
              <span
                style="margin-left: 10px"
              >{{ new Date(scope.row.time * 1000).Format('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>

          <el-table-column label="封面" align="center" min-width="100">
            <template slot-scope="scope">
              <img
                class="bannerimg"
                :src="
                  'http://a.yumaoyou.cn:8008/static/fengmian/' + scope.row.img
                "
                alt
              />
            </template>
          </el-table-column>

          <el-table-column label="标题" align="center" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布者" align="center" min-width="100">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.fabu }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="edit(scope.$index, scope.row)">修改</el-button> -->
              <i class="el-icon-edit xiugai" @click="edit(scope.$index, scope.row)"></i>
              <i class="el-icon-picture-outline xiugai" @click="updatepic(scope.row)"></i>
              <i class="el-icon-delete xiugai" @click="deletenews(scope.$index, scope.row)"></i>
              <!-- <el-button size="mini" type="danger" @click="deletenews(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>

        <!-- 新增新闻弹框 -->
        <div class="updatenews">
          <el-dialog :visible.sync="dialogFormVisible2" @close="closed">
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
                    action
                    ref="upload"
                    :auto-upload="false"
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
              </el-form>

              <!-- 名字，图片，网址，状态，备注，描述 -->
            </div>

            <div style="width: 100%; height: 470px;">
              <script id="editor" type="text/plain" style="width: 100%; height: 300px;"></script>
            </div>
            <!-- <div ref="editor" id="editor" class="editor">
              <p>欢迎使用 wangEditor 富文本编辑器</p>
            </div>-->
            <div class="subbtn">
              <el-button type="primary" @click="onSubmit1">发布新闻</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 修改新闻弹框 -->
        <div class="updatenews">
          <el-dialog :visible.sync="dialogFormVisible" @close="closed1">
            <div class="news">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="新闻标题" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="发布者" prop="senduser">
                  <el-input v-model="ruleForm.senduser"></el-input>
                </el-form-item>
              </el-form>

              <!-- 名字，图片，网址，状态，备注，描述 -->
            </div>

            <div style="width: 100%; height: 470px;">
              <script id="editor1" type="text/plain" style="width: 100%; height: 300px;"></script>
            </div>

            <div class="subbtn">
              <el-button type="primary" @click="onSubmit">修改新闻</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 修该新闻封面弹框 -->
        <div class="updatenewspic">
          <el-dialog :visible.sync="dialogFormVisible3" width="26%" @close="closeupdatepic">
            <div class="news">
              <div class="upload-demo">
                <span class="newscover">新闻封面</span>
                <el-upload
                  action
                  :limit="1"
                  ref="upload"
                  :auto-upload="false"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-exceed="beyond"
                  :on-change="aaa"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
              </div>
            </div>

            <div style="text-align:end">
              <el-button type="primary" @click="onSubmit2">修改封面</el-button>
            </div>
          </el-dialog>
        </div>
      </template>
    </div>

    <!-- 分页 -->
    <div class="page">
      <div style="line-height:32px;">
        <span>共 {{ total }} 条</span>
      </div>

      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="Number(total)"
          @current-change="tab"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
// import E from 'wangeditor'
import http from '../../ajax/http'
import Vue from 'vue'

export default {
  data() {
    return {
      editor: null,

      defaultMsg: '初始文字',

      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },

      // 新闻ID
      zid: '',
      imgurl: '',
      url: '',
      // 图片地址
      dialogImageUrl: '',
      dialogVisible: false,
      // 新增新闻
      dialogTableVisible2: false,
      dialogFormVisible2: false,

      // 修改新闻封面
      dialogTableVisible3: false,
      dialogFormVisible3: false,

      // 修改新闻的ID
      id: '',

      tag: true,

      // 修改弹框
      ruleForm: {
        name: '',
        senduser: ''
      },
      rules: {
        name: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        senduser: [{ required: true, message: '请输入发布者', trigger: 'blur' }]
      },
      editor: '',
      editor1: '',
      // 新增富文本内容
      content: '',
      // 修改富文本内容
      content1: '',

      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,

      // 表单数据
      tableData: [],

      // 总条数
      total: '',
      // 每页条数
      pageSize: 10,
      // 当前页
      page: 0,
      as: ''
    }
  },
  methods: {
    // 关闭发布新闻
    closed(row) {
      // this.$router.go(0)
      this.ruleForm.name = ''
      this.ruleForm.senduser = ''

      this.$refs.upload.clearFiles()

      var ue = UE.getEditor('editor')
      ue.ready(function() {
        //设置编辑器的内容
        ue.setContent('')
      })
    },

    // 关闭修改新闻
    closed1(row) {
      var ue1 = UE.getEditor('editor1')
      ue1.ready(function() {
        //设置编辑器的内容
        try {
          ue1.setContent(row)
        } catch (error) {
          // console.log(error)
          return error
        }
      })
    },

    // 关闭修改封面
    closeupdatepic() {
      this.$refs.upload.clearFiles()
    },

    // 富文本
    // getSrcurl() {
    //   this.setEditor(1, 2)
    // },
    // setEditor(srcurl, pushfunc) {
    //   // 初始化编辑器
    //   this.editor = new E(this.$refs.editor)
    //   // this.editor.config.uploadImgUrl = '/capi/zc'
    //   // this.editor.customConfig.uploadImgServer =
    //   //   'http://a.yumaoyou.cn:8008/static/zcimg'
    //   // this.editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    //   this.editor.customConfig.uploadFileName = 'file'
    //   this.editor.customConfig.uploadImgMaxLength = 1
    //   this.editor.customConfig.withCredentials = true
    //   this.editor.customConfig.pasteFilterStyle = false
    //   // this.editor.customConfig.uploadImgHooks = {
    //   //   // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    //   //   // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    //   //   customInsert: function(insertImg, result, editor) {
    //   //     // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //   //     // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
    //   //     // result 必须是一个 JSON 格式字符串！！！否则报错
    //   //     // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //   //     insertImg(result.msg)
    //   //     pushfunc(result.dto)
    //   //     // console.log(result.dto, result.msg)
    //   //   }
    //   // }
    //   this.editor.customConfig.customUploadImg = function(files, insert) {
    //     // files 是 input 中选中的文件列表
    //     // insert 是获取图片 url 后，插入到编辑器的方法
    //     // console.log(file)
    //     const data = new FormData()
    //     data.append('img', files[0])
    //     Vue.axios
    //       .post('/capi/appv1/usdpc2/zcTextImg', data, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       })
    //       .then(res => {
    //         console.log(res)
    //         insert(res.data.url)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //     // 上传代码返回结果之后，将图片插入到编辑器中
    //     // console.log(files)
    //     // insert(imgUrl)
    //   }

    //   this.editor.customConfig.onchange = html => {
    //     this.content = html
    //   }
    //   var MenuConstructors = {}
    //   function look() {}
    //   MenuConstructors.look = look

    //   this.editor.create()
    // },

    // 表头样式设置
    headClass() {
      return 'background:#fafafa;height:60px'
    },

    // 上传超出最大限制
    beyond(files, fileList) {
      // console.log(files, fileList)
    },

    // 上传图片
    changeHandle() {
      const file = this.url
      // console.log(file)
      const data = new FormData()
      data.append('img', file)

      Vue.axios
        .post('/aapi/appv1/usdpc2/zcfabuImg', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 12) {
            this.$message({
              message: '图片上传成功',
              type: 'success'
            })
          }

          this.imgurl = res.data.url
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 删除图片触发
    handleRemove(file, fileList) {
      // console.log(file, fileList)
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
      this.changeHandle()
    },

    // 获取上传图片地址
    sendimg() {},

    // 新增新闻接口方法
    addnewsfun() {
      // this.getUEContent()
      // var reg = /\s*[^=\s+]+\s*=\s*([^=>]+)?(?=(\s+|>))/g
      // console.log(this.content.replace(/margin/g, "", ''))

      var regex1 = new RegExp(
        '(i?)(<img)(?!(.*?style=[\'"](.*)[\'"])[^>]+>)',
        'gmi'
      )
      //给不含style="" 或 style='' 的img标签加上style=""
      let htmlstr = this.content.replace(regex1, '$2 width="100%"$3')

      http
        .sendnews({
          uid: localStorage.getItem('uid'),
          title: this.ruleForm.name,
          txt: htmlstr,
          img: this.imgurl,
          fabu: this.ruleForm.senduser
        })
        .then(res => {
          // console.log(res)
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.dialogFormVisible2 = false
          this.getnewslist()
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '发布失败',
            type: 'success'
          })
        })
    },

    // 点击新增
    addnews() {
      this.ruleForm.name = ''
      this.ruleForm.senduser = ''

      this.dialogFormVisible2 = true
      let _this = this
      // $('.editor').empty()
      setTimeout(() => {
        // _this.getSrcurl()
        _this.editor = window.UE.getEditor('editor', this.config)
        _this.editor.addListener('ready', () => {
          _this.editor.setContent('')
        })
      }, 0)
    },

    // 修改新闻接口方法
    updatenews() {
      // this.content1 = this.editor1.getContent()

      // console.log(this.content1.replace(/<img [^>]*width=""*>/gi, '100%'))

      // 正则给图片添加宽100%
      var regex1 = new RegExp(
        '(i?)(<img)(?!(.*?style=[\'"](.*)[\'"])[^>]+>)',
        'gmi'
      )
      //给不含style="" 或 style='' 的img标签加上style=""
      let htmlstr = this.content1.replace(regex1, '$2 width="100%"$3')
      // console.log(htmlstr)

      http
        .updatenews({
          uid: localStorage.getItem('uid'),
          title: this.ruleForm.name,
          txt: htmlstr,
          zid: this.id,
          fabu: this.ruleForm.senduser
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 10) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getnewslist()
          } else {
            this.$message.error('更新失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 修改按钮
    edit(index, row) {
      this.dialogFormVisible = true

      this.id = row.id
      this.ruleForm.name = row.title
      this.ruleForm.senduser = row.fabu
      this.content = row.txt

      let _this = this

      var timer = setTimeout(() => {
        _this.editor1 = window.UE.getEditor('editor1', _this.config)
        _this.editor1.addListener('ready', () => {
          _this.editor1.setContent(row.txt)
        })
        this.closed1(row.txt)
      }, 0)
    },

    // 获取新增富文本内容
    getUEContent() {
      this.content = this.editor.getContent()
    },
    // 获取修改富文本内容
    getUEContent1() {
      this.content1 = this.editor1.getContent()
    },

    // 修改新闻封面
    updatepic(row) {
      // console.log(row)
      this.zid = row.id
      this.dialogFormVisible3 = true
    },

    // 提交修改封面
    onSubmit2() {
      const file = this.url
      // console.log(file)
      const data = new FormData()
      data.append('img', file)
      data.append('zid', this.zid)

      Vue.axios
        .post('/aapi/appv1/usdpc2/updateZcfabuImg', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 12) {
            this.$message({
              message: '图片上传成功',
              type: 'success'
            })
          }
          this.dialogFormVisible3 = false
          this.getnewslist()
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 提交新增
    onSubmit1() {
      // console.log()
      // this.editor.txt.html(this.content)
      // var reg = /<\/?.+?\/?>/g
      // console.log(this.content.replace(reg, ''))

      this.$refs['ruleForm'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // console.log(this.content)
          this.getUEContent()
          this.addnewsfun()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 提交修改
    onSubmit() {
      this.$refs['ruleForm'].validate(valid => {
        //   表单验证成功则提交数据
        if (valid) {
          // console.log(this.content)
          this.getUEContent1()
          this.updatenews()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 删除新闻
    // 删除新闻按钮
    deletenews(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let _this = this
          http
            .deletenew({ uid: localStorage.getItem('uid'), zid: row.id })
            .then(res => {
              // console.log(res)
              if (res.data.code == 16) {
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
                _this.getnewslist()
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
            showClose: true,
            type: 'info',
            message: '已取消删除'
          })
        })
      // console.log(index, row)
    },

    // 获取新闻列表
    getnewslist() {
      http
        .getnewslist({ page: this.page })
        .then(res => {
          // console.log(res)
          this.tableData = res.data.data
          this.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页改变
    tab(page) {
      this.page = page - 1
      this.getnewslist()
    }
  },

  mounted() {
    this.getnewslist()
    $(function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block)
      })
    })
  },
  destroyed() {
    try {
      this.editor.destroy()
      this.editor1.destroy()
    } catch (error) {
      // console.log(error)
    }
  }
}
</script>
<style lang="less" scoped>
.subbtn {
  text-align: right;
}

.el-breadcrumb {
  line-height: 32px;
}
.bread {
  margin: 12px 35px;
  display: flex;
  justify-content: space-between;
}

// .newslist {
//   margin-top: 20px;
// }

.bannerimg {
  width: 50px;
  height: 30px;
}

.xiugai {
  padding: 5px;
  margin: 0px 5px;
  cursor: pointer;
}
.xiugai:hover {
  color: teal;
}

// 新增新闻
// .add {
//   position: absolute;
//   right: 90px;
//   top: 87px;
// }
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

.el-tag {
  border: none;
  padding: 0;
  background-color: transparent;
  color: #333;
}
.el-tag {
  display: contents;
}

.mymain {
  height: 48rem;
}
.page {
  // width: 40rem;
  // position: relative;
  // bottom: 0px;
  // left: 50%;
  // transform: translate(-50%, 0px);
  margin: 0 0 0 39.5rem;
  display: flex;
  span {
    font-size: 14px;
    color: #666;
  }
}

.el-table /deep/ td {
  padding: 7px 0 !important;
  font-size: 12px;
}

.updatenews {
  .el-dialog__wrapper /deep/ .el-dialog {
    margin-top: 6vh !important;
    z-index: 1000 !important;
  }
  .el-dialog__wrapper {
    z-index: 1000 !important;
  }
}

.el-dialog__wrapper /deep/ .el-dialog__header {
  padding: 2px !important;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>
