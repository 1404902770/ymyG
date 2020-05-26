<template>
  <div>
    <h1>上传App</h1>
    <!-- <input type="file" ref="fileInt" @change="changeHandle" /> -->
    <div id="uploadFile">
      <!-- <h4>上传文件：</h4> -->
      <p class="input-zone">
        <span v-if="filename" class="selectText">{{ filename }}</span>
        <span v-else class="selectText">请选择文件上传</span>

        <input
          type="file"
          name="file"
          value
          placeholder="请选择文件"
          @change="upload"
          multiple="multiple"
        />
      </p>

      <p>上传进度：</p>
      <div class="progress-wrapper">
        <div class="progress-progress" :style="uploadStyle"></div>
        <div class="progress-rate">{{ (uploadRate * 100).toFixed(2) }}%</div>
      </div>
    </div>
  </div>
</template>
<script>
// import elementUi from 'element-ui'
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
      }
    }
  },
  methods: {
    // 进度条和上传方法
    upload: function(e) {
      var vm = this
      var formData = new FormData()
      formData.append('name', 'Alax')
      for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files[i] //取第1个文件
        formData.append('app', file)
        vm.filename = file.name
        console.log(file)
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
              vm.uploadRate = rate
              vm.uploadStyle.width = (rate * 100).toFixed(2) + '%'
              if ((rate * 100).toFixed(2) > 96) {
                vm.uploadStyle.width = '100' + '%'
              }
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
          console.log(res)
          localStorage.setItem('appurl', res.data.url)
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message({
            message: '上传失败',
            type: 'success'
          })
        })
    }
    // changeHandle() {
    //   const file = this.$refs.fileInt.files[0]
    //   console.log(file)
    //   const data = new FormData()
    //   data.append('app', file)
    //   Vue.axios
    //     .post('/bapi/appv1/usdpc2/appBarUpdate', data, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     .then(res => {
    //       console.log(res.data.url)
    //       localStorage.setItem('appurl', res.data.url)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
#uploadFile {
  width: 400px;
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
