<template>
  <div>
    <!-- <h1>完整demo</h1> -->
    <!-- <script type="text/plain" id="myEditor" style="width:1000px;height:240px;">
  <p>这里我可以写一些输入提示</p>
    </script>-->
    <div ref="editor" id="editor">
      <!-- <p>欢迎使用 wangEditor 富文本编辑器</p> -->
    </div>
  </div>
</template>

<script>
import umeditor from 'vue-umeditor'
import E from 'wangeditor'

// import '../../public/umeditor-master/themes/default/_css/umeditor.css'
// import '../../public/umeditor-master/third-party/jquery.min'
// import '../../public/umeditor-master/third-party/template.min'
// import '../../public/umeditor-master/umeditor.config'
// import '../../public/umeditor-master/_examples/editor_api'
// import '../../public/umeditor-master/lang/zh-cn/zh-cn'

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
    // var um = UM.getEditor('myEditor')
    // new umeditor('myEditor')
  }
}
</script>

<style scoped>
h1 {
  font-family: '微软雅黑';
  font-weight: normal;
}
.btn {
  display: inline-block;
  *display: inline;
  padding: 4px 12px;
  margin-bottom: 0;
  *margin-left: 0.3em;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  text-align: center;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  vertical-align: middle;
  cursor: pointer;
  background-color: #f5f5f5;
  *background-color: #e6e6e6;
  background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#ffffff),
    to(#e6e6e6)
  );
  background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
  background-repeat: repeat-x;
  border: 1px solid #cccccc;
  *border: 0;
  border-color: #e6e6e6 #e6e6e6 #bfbfbf;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  border-bottom-color: #b3b3b3;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
  *zoom: 1;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn:hover,
.btn:focus,
.btn:active,
.btn.active,
.btn.disabled,
.btn[disabled] {
  color: #333333;
  background-color: #e6e6e6;
  *background-color: #d9d9d9;
}

.btn:active,
.btn.active {
  background-color: #cccccc \9;
}

.btn:first-child {
  *margin-left: 0;
}

.btn:hover,
.btn:focus {
  color: #333333;
  text-decoration: none;
  background-position: 0 -15px;
  -webkit-transition: background-position 0.1s linear;
  -moz-transition: background-position 0.1s linear;
  -o-transition: background-position 0.1s linear;
  transition: background-position 0.1s linear;
}

.btn:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}

.btn.active,
.btn:active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
    0 1px 2px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
    0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn.disabled,
.btn[disabled] {
  cursor: default;
  background-image: none;
  opacity: 0.65;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
