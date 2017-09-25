<template>
  <div id="deatil">
    <v-header :title="'文章详情'" :back="true" class="comment"></v-header>
    <v-scroll :data="commentList" class="content-wrapper">
      <div class="wrapper">
        <div class="title display-flex flex-center">{{articleInfo.title}}</div>
        <div class="user display-flex">
          <v-picture :picSrc="articleInfo.author ? articleInfo.author.picture : ''" :errorSrc="'javascript: this.src=\'http://dahengzhang.club/default-header.png\''" class="picture"></v-picture>
          <div class="more">
            <div class="name">{{articleInfo.author ? articleInfo.author.name : '未知用户'}}</div>
            <div class="time">{{formatDate(articleInfo.time)}}</div>
          </div>
        </div>
        <div class="content" v-html="toHtml(articleInfo.content)"></div>
        <div v-if="articleInfo.images && articleInfo.images.length > 0" class="images">
          <div v-for="image in articleInfo.images" class="image-item">
            <v-picture :picSrc="image" :errorSrc="'javascript: this.src=\'http://dahengzhang.club/default-picture-big.png\''" class="picture"></v-picture>
          </div>
        </div>
        <!-- <div class="like">点赞</div> -->
        <div class="comment">
          <div v-for="item in commentList" class="comment-item">
            <div class="user display-flex"><v-picture :picSrc="item.author.picture" :errorSrc="'javascript: this.src=\'http://dahengzhang.club/default-header.png\''" class="picture"></v-picture><span class="name">{{item.author.name}}</span><span class="time">{{item.time | formatTime}}</span></div>
            <div class="content">{{item.content}}</div>
          </div>
        </div>
      </div>
    </v-scroll>
    <div class="send-comment display-flex position-raletive">
      <span class="icon icon-pencil position-absolute"></span>
      <input class="elm-input" type="text" :placeholder="'写评论...'" v-model="comment">
      <span @click="send" class="send-button display-flex flex-center" :class="{active: comment !== ''}">发送</span>
      <div v-if="!userInfo._id" @click.stop="login()" class="login-tip position-absolute">
        <span class="login-button display-inline-block">前去登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'deatil',
    data () {
      return {
        articleInfo: {},
        commentList: [],
        comment: ''
      }
    },
    methods: {
      toHtml (value) {
        return value ? JSON.stringify(value).substring(1, JSON.stringify(value).length - 1).replace(/\s/g, '&nbsp;').replace(/\\n/g, '<br />') : ''
      },
      formatDate (value) {
        /* eslint-disable */
        return $Moment(value).format('llll')
      },
      login () {
        this.$router.push('/login')
      },
      send () {
        if (this.comment === '') {
          return
        }
        $Http.post('http://dahengzhang.club/api/article/comment', {articleId: this.$route.query.id, author: this.userInfo, content: this.comment}).then(response => {
          this.commentList = response.data.value
          this.comment = ''
        }).catch(response => {
          console.log('请求失败：' + response)
        })
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    filters: {
      formatTime (value) {
        const thisDate = new Date(value)
        /* eslint-disable */
        return $Moment(thisDate, 'YYYYMMDD').fromNow()
      }
    },
    beforeRouteEnter (to, from, next) {
      let getArticleInfo = new Promise((resolve, reject) => {
        /* eslint-disable */
        $Http.get('http://dahengzhang.club/api/article/findById', {params: {id: to.query.id}}).then(response => {
          resolve(response.data.value)
        }).catch(response => {
          reject(response)
        })
      })
      let getCommentList = new Promise((resolve, reject) => {
        /* eslint-disable */
        $Http.get('http://dahengzhang.club/api/article/comment', {params: {articleId: to.query.id}}).then(response => {
          resolve(response.data.value)
        }).catch(response => {
          reject(response)
        })
      })

      Promise.all([getArticleInfo, getCommentList]).then(response => {
        next(vm => {
          vm.articleInfo = response[0]
          vm.commentList = response[1]
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
#deatil {
  .content-wrapper {
    .wrapper {
      .title {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        line-height: 22px;
        font-size: 17px;
        background-color: #FFFFFF;
      }
      .user {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #FFFFFF;
        .picture {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 25px;
        }
        .more {
          flex: 1;
          .name {
            color: #4C90F7;
            line-height: 24px;
          }
          .time {
            font-size: 12px;
          }
        }
      }
      .content {
        box-sizing: border-box;
        padding: 10px;
        background-color: #FFFFFF;
      }
      .images {
        width: 100%;
        overflow: hidden;
        background-color: #FFFFFF;
        .image-item {
          float: left;
          width: 30%;
          margin-left: 2.5%;
          margin-bottom: 10px;
        }
      }
      .comment {
        background-color: #FFFFFF;
        .comment-item {
          padding: 10px 20px 10px 0;
          .user {
            align-items: center;
            margin: 0;
            .picture {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin: 0 10px 10px 0;
            }
            .name {
              color: #4C90F7;
              margin-top: -25px;
              font-size: 15px;
            }
            .time {
              font-size: 12px;
              color: #C0C0C0;
              margin: -25px 0 0 15px;
            }
          }
          .content {
            box-sizing: border-box;
            padding: 0 0 0 60px;
            margin-top: -15px;
            font-size: 15px;
            line-height: 20px;
          }
        }
      }
    }
  }
  .send-comment {
    height: 50px;
    background-color: #F0F0F0;
    .icon-pencil {
      display: inline-block;
      font-size: 20px;
      margin: 15px 10px 15px 20px;
    }
    .elm-input {
      flex: 1;
      height: 30px;
      margin: 10px 0 10px 10px;
      box-sizing: border-box;
      padding-left: 40px;
      font-size: 15px;
    }
    .send-button {
      height: 30px;
      width: 50px;
      margin: 10px 10px 10px 10px;
      background-color: #CCCCCC;
      color: #F5F5F5;
      border-radius: 5px;
      font-size: 16px;
      user-select: none;
      &.active {
        background-color: #81E2CE;
        color: #FFFFFF;
      }
      &:active {
        background-color: #CCCCCC;
        color: #F5F5F5;
      }
    }
    .login-tip {
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 50px;
      box-sizing: border-box;
      .login-button {
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: rgba(129, 226, 206, .6);
        color: #FFFFFF;
        border-radius: 5px;
        font-size: 15px;
        user-select: none;
        &:active {
          background-color: #CCCCCC;
          color: #F5F5F5;
        }
      }
    }
  }
}
</style>
