<template>
  <div id="deatil">
    <v-header :title="'文章详情'"></v-header>
    <v-scroll :data="articleInfo" class="content-wrapper">
      <div class="wrapper">
        <div class="title">{{articleInfo.title}}</div>
        <div class="user">
          <v-picture :picSrc="articleInfo.author ? articleInfo.author.picture : ''"></v-picture>
          {{articleInfo.author ? articleInfo.author.name : '未知用户'}}
        </div>
        <div class="content" v-html="toHtml(articleInfo.content)"></div>
        <div class="images">
          <img v-for="image in articleInfo.images" class="display-block" :src="'http://192.168.241.15:3000/' + image" alt="文章图片">
        </div>
      </div>
    </v-scroll>
  </div>
</template>

<script>
  export default {
    name: 'deatil',
    data () {
      return {
        articleInfo: {}
      }
    },
    methods: {
      toHtml (value) {
        return value ? JSON.stringify(value).substring(1, JSON.stringify(value).length - 1).replace(/\s/g, '&nbsp;').replace(/\\n/g, '<br />') : ''
      }
    },
    beforeRouteEnter (to, from, next) {
      /* eslint-disable */
      $Http.get('http://192.168.241.15:3000/api/article/findById', {params: {id: to.query.id}}).then(response => {
        next(vm => {
          vm.articleInfo = response.data.value
        })
      }).catch(response => {})
    }
  }
</script>

<style lang="scss" scoped></style>
