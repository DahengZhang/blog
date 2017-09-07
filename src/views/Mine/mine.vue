<template>
  <div id="mine">
    <v-picture :picSrc="user.picture?user.picture:''" :errorSrc="'javascript: this.src=\'http://localhost:3000/default-header.png\''" @clickPicture="login()" class="user-picture"></v-picture>
    <div v-if="user.name" class="user-name">{{user.name}}</div>
  </div>
</template>

<script>
  export default {
    name: 'mine',
    props: {
      user: {
        type: Object,
        default: null
      }
    },
    methods: {
      login () {
        if (!sessionStorage.getItem('iCainBlogUserInfo')) {
          this.$router.push('/login')
        } else {
          this.$Popup({title: '提示', content: '退出登录？', confirmButton: '拜拜'}).then(response => {
            this.logout().then(response => {
              this.$store.commit('dropUserInfo')
            })
          }).catch(response => {})
        }
      },
      logout () {
        return new Promise((resolve, reject) => {
          this.$Http.post('http://localhost:3000/api/user/logout').then(response => {
            resolve()
          }).catch(response => {})
        })
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
#mine {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #81E2CE;
  .user-picture {
    width: 40%;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
  }
  .user-name {
    margin-top: 20px;
    font-size: 20px;
    color: #FFFFFF;
  }
}
</style>
