<template>
  <div id="publish">
    <v-header title="发布文章" :showSendBtn="true" :btnClass="'icon-rocket'" @controlEvent="publish"></v-header>
    <div class="content-wrapper">
      <input class="title" type="text" v-model="title" placeholder="文章标题">
      <textarea class="content" v-model="content" placeholder="分享你刚刚撰写的故事..."></textarea>
      <div class="pictures">
        <div v-for="(image, index) in images" @click.stop="controlSheet(1, index)" class="pictures-wrapper-one display-inline-block">
          <div class="pictures-wrapper-two">
            <div class="pictures-wrapper-three position-raletive">
              <img class="picture position-absolute" :src="image" alt="上传图片">
            </div>
          </div>
        </div>
        <div v-show="uploadButton" class="pictures-wrapper-one display-inline-block">
          <div class="pictures-wrapper-two">
            <div class="pictures-wrapper-three display-flex flex-center input position-raletive">
              <span class="icon icon-cloud-upload"></span>
              <input class="input position-absolute" @change="selectFileChange" type="file" accept="image/png, image/jpeg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="mark-fade">
      <div v-show="showSheet" @click.stop="controlSheet(0)" class="mark position-fixed full-screen"></div>
    </transition>
    <transition name="sheet-fade">
      <div v-show="showSheet" class="action-sheet position-fixed">
        <ul class="sheet-wrapper">
          <li @click.stop="deletPicture()" class="sheet-item position-raletive">删除</li>
          <li @click.stop="controlSheet(0)" class="sheet-item">取消</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'publish',
    data () {
      return {
        images: [],
        showSheet: false,
        willDelPic: null,
        title: '',
        content: '',
        uploadButton: true
      }
    },
    created () {},
    components: {},
    watch: {
      images () {
        if (this.images.length >= 6) {
          this.uploadButton = false
        } else {
          this.uploadButton = true
        }
      }
    },
    methods: {
      selectFileChange (e) {
        const files = e.target.files || e.dataTransfer.files
        if (this.images.length >= 6) {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '最多上传6张图片'})
          return false
        }
        this.getImages(files)
      },
      getImages (files) {
        if (files.length <= 0) {
          return false
        }
        if (typeof FileReader === 'undefined') {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '您的浏览器无法上传'})
          return false
        }
        if (files[0].size > 1048576) {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '图片大于1M'})
          return false
        }
        const _this = this
        const reader = new FileReader()
        for (let i = 0; i < files.length; i++) {
          reader.readAsDataURL(files[i])
          reader.onload = function (e) {
            _this.images.push(e.target.result)
          }
        }
      },
      controlSheet (target, picIndex) {
        if (target) {
          this.showSheet = true
          this.willDelPic = picIndex
        } else {
          this.showSheet = false
          this.willDelPic = null
        }
      },
      deletPicture () {
        this.images.splice(this.willDelPic, 1)
        this.showSheet = false
      },
      uploadImages (files) {
        this.$Toast({iConClass: 'icon-spinner10', waiting: true, tip: '少女祈祷中...'})
        return new Promise((resolve, reject) => {
          this.$Http.post('http://192.168.241.15:3000/api/upload', {images: files}).then(response => {
            if (response.data.status === 0) {
              reject(response)
            }
            resolve(response.data)
          }).catch(response => {
            reject(response)
          })
        })
      },
      publishArticle (title, content, images) {
        console.log(3)
        return new Promise((resolve, reject) => {
          this.$Http.post('http://192.168.241.15:3000/api/article/save', {title: title, content: content, images: images}).then(response => {
            if (response.data.status === 0) {
              reject(response)
            }
            resolve(response.data)
          }).catch(response => {
            reject(response)
          })
        })
      },
      publish () {
        if (this.title === '') {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '请填写标题'})
          return
        }
        if (this.content === '') {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '请填写内容'})
          return
        }
        this.$Popup({title: '提示', content: '确定发布此篇文章？', confirmButton: '发布'}).then(response => {
          this.uploadImages(this.images).then(response => {
            console.log(0)
            return this.publishArticle(this.title, this.content, response.imagesUrl)
          }).then(response => {
            console.log(1)
            this.$HideToast()
            this.$Toast({iConClass: 'icon-checkmark', waiting: false, tip: '发布成功'})
            this.$router.back()
          }).catch(response => {
            console.log('2' + JSON.stringify(response))
            this.$Toast({iConClass: 'icon-cross', waiting: false, tip: response.data ? response.data.message : '发布失败'})
          })
        }).catch(response => {})
      }
    },
    beforeRouteEnter (to, from, next) {
      if (sessionStorage.getItem('iCainBlogUserInfo')) {
        next()
      } else {
        next('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>
#publish {
  .content-wrapper {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .title {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 15px;
    }
    .content {
      width: 100%;
      height: 200px;
      resize: none;
      border: 0;
      font-size: 12px;
      padding: 0;
      &:-webket-placeholder {
        color: #F5F5F5;
      }
    }
    .pictures {
      .pictures-wrapper-one {
        width: 32%;
        border: 0;
        margin-top: 2px;
        margin-left: 3px;
        .pictures-wrapper-two {
          width: 100%;
          padding-top: 100%;
          position: relative;
          .pictures-wrapper-three {
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            overflow: hidden;
            &.input {
              border: 1px solid #F5F5F5;
            }
            .picture {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .icon {
              font-size: 50px;
              color: #CCCCCC;
            }
            .input {
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              opacity: 0;
            }
          }
        }
      }
    }
  }
  .mark {
    background-color: rgba(0, 0, 0, .5);
  }
  .action-sheet {
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF;
    .sheet-wrapper {
      .sheet-item {
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        &:nth-child(1) {
          color: #FF0000;
        }
        &:nth-child(1)::after {
          position: absolute;
          content: " ";
          left: 10px;
          right: 10px;
          bottom: 0;
          height: 1px;
          background-color: #CCCCCC;
        }
        &:active {
          background-color: #CCCCCC;
        }
      }
    }
  }
}
.mark-fade-enter-active, .mark-fade-leave-active {
  transition: opacity .5s;
}
.mark-fade-enter, .mark-fade-leave-to {
  opacity: 0;
}
.sheet-fade-enter-active, .sheet-fade-leave-active {
  transition: transform .5s;
}
.sheet-fade-enter, .sheet-fade-leave-to {
  transform: translateY(100%);
}
</style>
