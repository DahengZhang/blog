<template>
  <div id="main">
    <v-header :title="'文章列表'" :picture="userInfo.picture?userInfo.picture:''" :button="'icon-publish'" @clickPicture="showUserPanel()" @clickButton="publish()"></v-header>
    <v-scroll :data="articleList" class="content-wrapper">
      <div class="list-wrapper">
        <div v-for="item in articleList" @click="read(item._id)" class="list-item display-flex position-raletive">
          <div class="description">
            <div class="author display-flex">
              <v-picture :picSrc="item.author.picture?item.author.picture:''" :errorSrc="'javascript: this.src=\'http://localhost:3000/default-header.png\''" class="header-picture"></v-picture>
              <div class="more-info">
                <div class="name">{{item.author.name}}</div>
                <div class="time">{{item.time | formatTime}}</div>
              </div>
            </div>
            <div class="title" :class="{'explicit-height': item.images.length > 0}">{{item.title}}</div>
            <div class="more display-flex">
              <span class="icon icon-read"></span>{{item.read}}<span class="icon icon-message"></span>{{item.comment}}<span class="icon icon-heart"></span>{{item.like}}
            </div>
          </div>
          <div v-if="item.images.length > 0" class="picture">
            <v-picture :picSrc="item.images" :errorSrc="'javascript: this.src=\'http://localhost:3000/default-picture.png\''" @clickPicture="bigPicture"></v-picture>
          </div>
        </div>
      </div>
    </v-scroll>
    <transition name="mark-fade">
      <div v-show="userPanel" @click="hiddenUserPanel()" class="mark position-fixed full-screen"></div>
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
        this.$Http.get('http://localhost:3000/api/article/find', {params: {pageNumber: pageNumber, pageSize: pageSize}}).then(response => {
          if (response.data.status !== 1) {
            this.$Toast({iConClass: 'icon-success', waiting: false, tip: response.data.message})
            return
          }
          this.articleList = response.data.value
          console.log(JSON.stringify(this.articleList))
        }).catch(response => {
          this.$Toast({iConClass: 'icon-false', waiting: false, tip: '获取列表失败'})
        })
      },
      bigPicture (urls) {
        console.log(urls)
      },
      publish () {
        this.$router.push('/publish')
      },
      showUserPanel () {
        this.userPanel = true
      },
      hiddenUserPanel () {
        this.userPanel = false
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
        background-color: #FFFFFF;
        margin-bottom: 10px;
        .picture {
          padding: 10px;
          width: 120px;
        }
        .description {
          padding: 10px 5px 10px 15px;
          flex: 1;
          .author {
            height: 35px;
            line-height: 35px;
            font-size: 12px;
            align-items: center;
            margin-bottom: 4px;
            .header-picture {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              margin-right: 10px;
            }
            .more-info {
              flex: 1;
              .name {
                height: 20px;
                line-height: 20px;
                color: #4C90F7;
                font-size: 14px;
              }
              .time {
                height: 15px;
                line-height: 15px;
                color: #AFAEAE;
              }
            }
          }
          .title {
            max-height: 40px;
            line-height: 20px;
            font-size: 14px;
            overflow: hidden;
            margin: 14px 0 10px;
            &.explicit-height {
              height: 40px;
            }
          }
          .more {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #999999;
            justify-content: flex-start;
            align-items: center;
            text-indent: 4px;
            .icon {
              margin-right: 3px;
            }
          }
        }
        // &::after {
        //   position: absolute;
        //   content: " ";
        //   right: 0;
        //   left: 10px;
        //   bottom: 0;
        //   height: 1px;
        //   background-color: #CCCCCC;
        //   transform: scaleY(0.5);
        // }
        // &:last-child::after {
        //   display: none;
        // }
        &:last-child {
          margin-bottom: 0;
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
