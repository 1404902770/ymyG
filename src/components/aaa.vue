<template>
  <div>
    <div ref="editor" id="editor">
      <!-- <p>欢迎使用 wangEditor 富文本编辑器</p> -->
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'

Vue.use(umeditor)

import Vue from 'vue'

export default {
  name: 'UploadFile',
  data() {
    return {}
  },
  methods: {
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
    }
  },

  mounted() {
    this.getSrcurl()
  }
}
</script>

<style scoped>
</style>
