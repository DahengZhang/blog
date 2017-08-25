<template>
  <div id="music">
    <v-header title="听音乐"></v-header>
    <h1 @click="showToast">Music</h1>
  </div>
</template>

<script>
  export default {
    name: 'music',
    methods: {
      alert () {
        this.Popup({title: '提示', content: '确定发布此篇文章？确定发布此篇文章？确定发布此篇文章？确定发布此篇文章？'}).then(response => {
          console.log(response)
        })
      },
      showToast () {
        this.toast({iConClass: 'icon-spinner10', waiting: true})
        setTimeout(() => {
          this.hideToast()
        }, 5000)
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped></style>
