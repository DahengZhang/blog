<template>
  <div id="music">
    <v-header title="图片滚动"></v-header>
    <div class="content-wrapper">
      <div class="slider-wrapper" ref="wrapper">
        <div class="images-group" ref="group">
          <div v-for="item in images" class="image-item">
            <img class="image" :src="item.url" :alt="item.name">
          </div>
        </div>
        <div class="dots">
          <span v-for="(item, index) in dots" class="dot" :class="{active: currentPageIndex === index }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'music',
    data () {
      return {
        loop: true,
        dots: [],
        currentPageIndex: 0,
        images: [{
          name: '第一张轮播图',
          url: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000004Jhekj3x3wH0.jpg?max_age=2592000&max_age=2592000'
        }, {
          name: '第二张轮播图',
          url: 'https://y.gtimg.cn/music/photo_new/T003R720x288M0000042jjgK0cgdBL.jpg?max_age=2592000&max_age=2592000'
        }, {
          name: '第三张轮播图',
          url: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg?max_age=2592000&max_age=2592000'
        }, {
          name: '第四张轮播图',
          url: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000002Y4lCe4O35JJ.jpg?max_age=2592000&max_age=2592000'
        }, {
          name: '第五张轮播图',
          url: 'https://y.gtimg.cn/music/photo_new/T003R720x288M000003F5rvY1pwFRs.jpg?max_age=2592000&max_age=2592000'
        }]
      }
    },
    mounted () {
      setTimeout(() => {
        this.setSloderWidth()
        this.initDots()
        this.initSlider()
      }, 20)
    },
    methods: {
      _hasClass (el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(el.className)
      },
      _addClass (el, className) {
        if (this._hasClass(el, className)) {
          return
        }
        let newClass = el.className.split(' ')
        newClass.push(className)
        el.className = newClass.join(' ')
      },
      setSloderWidth () {
        this.children = this.$refs.group.children

        let width = 0
        let wrapperWidth = this.$refs.wrapper.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          this._addClass(child, 'image-item')

          child.style.width = wrapperWidth + 'px'
          width += wrapperWidth
        }

        if (this.loop) {
          width += 2 * wrapperWidth
        }
        this.$refs.group.style.width = width + 'px'
      },
      initDots () {
        this.dots = new Array(this.children.length)
      },
      initSlider () {
        this.slider = new this.$BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })

        this.slider.on('scrollEnd', this.onScrollEnd)
      },
      onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
.slider-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .images-group {
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    .image-item {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      .image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border: 1px solid rgba(0, 0, 0, 0.5);;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      &.active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.5);
      };
    }
  }
}
</style>
