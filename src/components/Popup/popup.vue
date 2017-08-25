<template>
  <div id="popup">
    <transition name="popup-fade">
      <div v-show="visible" class="popup-wrapper">
        <div class="popup-title display-flex">
          <span class="icon" :class="iConClass"></span><span class="text">{{title}}</span>
        </div>
        <div class="popup-content display-flex flex-center">
          {{content}}
        </div>
        <div class="popup-buttons display-flex">
          <div @click.stop="cancle" class="button cancel-button display-flex flex-center position-raletive">
            {{cancelButton}}
          </div>
          <div @click.stop="confirm" class="button confirm-button display-flex flex-center">
            {{confirmButton}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'pupop',
  props: {
    iConClass: {
      type: String,
      default: 'icon-notification'
    },
    title: {
      type: String,
      default: '警告'
    },
    content: {
      type: String,
      default: '确认操作？'
    },
    cancelButton: {
      type: String,
      default: '取消'
    },
    confirmButton: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    popup () {
      this.promise = new Promise((resolve, reject) => {
        this.$on('ConfirmEvent', () => {
          this.visible = false
          resolve()
        })
        this.$on('CancelEvent', () => {
          this.visible = false
          reject()
        })
      })
      return this.promise
    },
    cancle () {
      this.$emit('CancelEvent')
    },
    confirm () {
      this.$emit('ConfirmEvent')
    },
    dropDom () {
      if (this.$el.parentNode && !this.visible) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  watch: {
    visible () {
      if (!this.visible) {
        setTimeout(() => {
          this.dropDom()
        }, 600)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-wrapper {
    width: 220px;
    background-color: #FFFFFF;
    box-shadow: 0 0 5px 0 #CCCCCC;
    border-radius: 5px;
    .popup-title {
      height: 40px;
      align-items: center;
      font-size: 0;
      .icon {
        font-size: 16px;
        margin-right: 5px;
        margin-left: 15px;
      }
      .text {
        font-size: 16px;
      }
    }
    .popup-content {
      min-height: 50px;
      padding: 10px;
    }
    .popup-buttons {
      height: 45px;
      .button {
        flex: 1;
        &.cancel-button::after {
          position: absolute;
          content: ' ';
          top: 7px;
          right: 0;
          bottom: 7px;
          width: 1px;
          background-color: #F5F5F5;
          transform: scaleY(0.5)
        }
        &:active {
          background-color: #FCFCFC;
        }
      }
    }
  }
}
.popup-fade-enter-active, .popup-fade-leave-active {
  transition: transform .5s, opacity .5s;
}
.popup-fade-enter, .popup-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
