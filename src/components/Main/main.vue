<template>
  <div id="main" ref="scrollWrapper">
    <div class="article-list-wrapper">
      <div v-for="item in articleList" class="list-item display-flex position-raletive">
        <div v-if="item.images.length > 0" class="picture">
          <v-picture :picSrc="item.images" @bigPicture="bigPicture"></v-picture>
        </div>
        <div class="discription">
          <div class="user display-flex">
            <img class="pic" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503552797677&di=e10b98ccd44587fef10ec82ce54200c2&imgtype=0&src=http%3A%2F%2Fimages5.icxo.com%2F20093%2F20093172492img200903111601058.jpg" alt="用户头像">
            <div class="other display-flex">
              <div class="name">{{item.author.name}}</div>
              <div class="time">{{item.time | formatTime}}</div>
            </div>
          </div>
          <div class="title">
            {{item.title}}
          </div>
          <div class="more display-flex">
            收藏{{item.collections}}·评论{{item.comment}}·喜欢{{item.like}}
          </div>
        </div>
      </div>
    </div>
    <v-ball class="ball position-fixed"></v-ball>
    <!-- <v-big-picture></v-big-picture> -->
  </div>
</template>

<script>
  import Ball from '../Ball/ball'
  import BigPicture from '@/components/BigPicture/big-picture'
  export default {
    name: 'main',
    data () {
      return {
        articleList: []
      }
    },
    created () {
      this.$http.get('http://192.168.241.15:3000/api/article/find', {params: {pageNumber: 1, pageSize: 10}}).then(response => {
        if (response.data.status !== 1) {
          this.toast({iConClass: 'icon-checkmark', waiting: false, tip: response.data.message})
          return
        }
        this.articleList = response.data.value
        this.$nextTick(() => {
          this._initBScroll()
        })
      }).catch(response => {
        this.toast({iConClass: 'icon-cross', waiting: false, tip: '获取列表失败'})
      })
    },
    mounted () {},
    filters: {
      formatTime (value) {
        const thisDate = new Date(value)
        /* eslint-disable */
        return Moment(thisDate, 'YYYYMMDD').fromNow()
      }
    },
    methods: {
      _initBScroll () {
        /* eslint-disable no-new */
        new this.BScroll(this.$refs.scrollWrapper, {
          click: true
        })
      },
      bigPicture (urls) {
        console.log(urls)
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('setBall', false)
      next()
    },
    components: {
      vBall: Ball,
      vBigPicture: BigPicture
    }
  }
</script>

<style lang="scss" scoped>
  #main {
    height: 100%;
    overflow: hidden;
    .article-list-wrapper {
      .list-item {
        height: 100px;
        padding: 5px;
        &::after {
          position: absolute;
          content: ' ';
          left: 70px;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: #CCCCCC;
          transform: scaleY(0.5)
        }
        &:last-child::after {
          display: none;
        }
        .discription {
          flex: 1;
          height: 100%;
          padding: 0 5px;
          .user {
            width: 100%;
            height: 45px;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
            .pic {
              width: 28px;
              height: 28px;
              border-radius: 50%;
            }
            .other {
              flex: 1;
              padding-right: 15px;
              flex-direction: column;
              .name {
                width: 100%;
                height: 22px;
                line-height: 22px;
                white-space: nowrap;
                overflow: hidden;
                padding-left: 10px;
              }
              .time {
                font-size: 12px;
                color: #CCCCCC;
                text-align: right;
              }
            }
          }
          .title {
            height: 35px;
            overflow: hidden;
          }
          .more {
            font-size: 12px;
            height: 22px;
            line-height: 22px;
            color: #CCCCCC;
          }
        }
        .picture {
          width: 100px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 7px;
          overflow: hidden;
        }
      }
    }
    .ball {
      right: 20px;
      bottom: 50px;
    }
  }
</style>
