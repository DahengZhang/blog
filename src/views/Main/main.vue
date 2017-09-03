<template>
  <div id="main">
    <v-header :title="'文章列表'" :back="false" :header="true" :user="userInfo.picture" :showSendBtn="true" :btnClass="'icon-rocket'" @controlEvent="publish" @clickPicture="controlUserPanel"></v-header>
    <v-scroll :data="articleList" class="content-wrapper">
      <div class="list-wrapper">
        <div v-for="item in articleList" @click="read(item._id)" class="list-item display-flex position-raletive">
          <div class="description">
            <div class="author display-flex">
              <v-picture :picSrc="item.author.picture?item.author.picture:''" class="header-picture"></v-picture>
              {{item.author.name}}
            </div>
            <div class="time">{{item.time | formatTime}}</div>
            <div class="title" :class="{'explicit-height': item.images.length > 0}">{{item.title}}</div>
            <div class="more">
              收藏{{item.collections}}·评论{{item.comment}}·喜欢{{item.like}}
            </div>
          </div>
          <div v-if="item.images.length > 0" class="picture">
            <v-picture :picSrc="item.images" @clickPicture="bigPicture"></v-picture>
          </div>
        </div>
      </div>
    </v-scroll>
    <transition name="mark-fade">
      <div v-show="userPanel" @click="controlUserPanel" class="mark position-fixed full-screen"></div>
    </transition>
    <transition name="mine-fade">
      <v-mine v-show="userPanel" :user="userInfo" class="mine position-fixed"></v-mine>
    </transition>
  </div>
</template>

<script>
  import Mine from '@/views/Mine/mine'
  export default {
    name: 'main',
    data () {
      return {
        articleList: [],
        userPanel: false
      }
    },
    created () {
      this.getArticleList(1, 10)
    },
    mounted () {},
    filters: {
      formatTime (value) {
        const thisDate = new Date(value)
        /* eslint-disable */
        return $Moment(thisDate, 'YYYYMMDD').fromNow()
      }
    },
    methods: {
      getArticleList (pageNumber, pageSize) {
        this.$Http.get('http://192.168.241.15:3000/api/article/find', {params: {pageNumber: pageNumber, pageSize: pageSize}}).then(response => {
          if (response.data.status !== 1) {
            this.$Toast({iConClass: 'icon-checkmark', waiting: false, tip: response.data.message})
            return
          }
          this.articleList = response.data.value
          console.log(JSON.stringify(this.articleList))
        }).catch(response => {
          this.$Toast({iConClass: 'icon-cross', waiting: false, tip: '获取列表失败'})
        })
      },
      bigPicture (urls) {
        console.log(urls)
      },
      publish () {
        this.$router.push('/publish')
      },
      controlUserPanel () {
        this.userPanel = !this.userPanel
      },
      read (id) {
        this.$router.push({path: '/detail', query: {id: id}})
      }
    },
    beforeRouteLeave (to, from, next) {
      this.userPanel= false
      next()
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    components: {
      vMine: Mine
    }
  }
</script>

<style lang="scss" scoped>
#main {
  .content-wrapper {
    .list-wrapper {
      .list-item {
        .picture {
          padding: 5px;
          width: 100px;
        }
        .description {
          padding: 5px 5px 5px 10px;
          flex: 1;
          .author {
            height: 22px;
            line-height: 28px;
            font-size: 12px;
            align-items: center;
            .header-picture {
              width: 20px;
              height: 20px;
              border: 1px solid #CCCCCC;
              border-radius: 50%;
              margin-right: 10px;
            }
          }
          .time {
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            color: #999999;
          }
          .title {
            max-height: 40px;
            line-height: 20px;
            font-size: 14px;
            overflow: hidden;
            &.explicit-height {
              height: 40px;
            }
          }
          .more {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            text-align: right;
            color: #999999;
          }
        }
        &::after {
          position: absolute;
          content: " ";
          right: 0;
          left: 10px;
          bottom: 0;
          height: 1px;
          background-color: #CCCCCC;
          transform: scaleY(0.5);
        }
        &:last-child::after {
          display: none;
        }
      }
    }
  }
  .mark {
    background-color: rgba(0, 0, 0, .5);
  }
  .mine {
    top: 0;
    left: 0;
    bottom: 0;
    width: 70%;
  }
}

.mark-fade-enter-active, .mark-fade-leave-active {
  transition: opacity .5s;
}
.mark-fade-enter, .mark-fade-leave-to {
  opacity: 0;
}
.mine-fade-enter-active, .mine-fade-leave-active {
  transition: transform .5s;
}
.mine-fade-enter, .mine-fade-leave-to {
  transform: translateX(-100%);
}
</style>
