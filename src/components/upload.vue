<template>
  <div>
    <div id="summernote"></div>
    <button @click="get">获取</button>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN'
import 'summernote/dist/summernote.css'

import $ from 'jquery'
import Vue from 'vue'

export default {
  data() {
    return {
      richContent: ''
    }
  },
  methods: {
    get() {
      console.log($('#summernote').summernote('code'))
    },
    //编辑器新增的ajax上传图片函数
    sendFile(files, editor, $editable) {
      // var size = files[0].size

      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      // console.log(file)
      const data = new FormData()
      data.append('img', files[0])
      Vue.axios
        .post('/capi/appv1/usdpc2/zcTextImg', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res)
          // insert(res.data.url)
          $('.summernote').summernote('insertImage', res.data.url)
          // $('#summernote').summernote('code', '你赋值的内容...') //赋值
        })
        .catch(err => {
          console.log(err)
        })

      // var formData = new FormData()
      // formData.append('file', files[0])
      // $.ajax({
      //   data: formData,
      //   type: 'POST',
      //   url: 'http://a.yumaoyou.cn:8008/static/zcimg', // 图片上传出来的url，返回的是图片上传后的路径，http格式
      //   cache: false,
      //   contentType: false,
      //   processData: false,
      //   dataType: 'json',
      //   success: function(data) {
      //     //data是返回的hash,key之类的值，key是定义的文件名
      //     console.log(data)
      //     $('.summernote').summernote('insertImage', data.fileName)
      //   },
      //   error: function() {
      //     alert('上传失败')
      //   }
      // })
    }
  },
  mounted() {
    let _this = this
    $(document).ready(function() {
      // $('#summernote').summernote()
      $('#summernote').summernote({
        lang: 'zh-CN',

        callbacks: {
          onImageUpload: function(files, editor, $editable) {
            _this.sendFile(files)
          }
        }
      })
    })
  }
}
</script>

<style></style>
