import Vue from 'vue'
import Toast from './toast'

const ToastConstructor = Vue.extend(Toast)

let instance = new ToastConstructor({
  el: document.createElement('div')
})

ToastConstructor.prototype.close = function () {
  this.visible = false
  setTimeout(() => {
    if (this.$el.parentNode && !this.visible) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }, 600)
}

let ShowToast = (options) => {
  if (options && typeof options === 'object') {
    instance.iConClass = options.iConClass || 'icon-notification'
    instance.tip = options.tip || '警告'
    if (!options.waiting || options.waiting === false) {
      instance.waiting = false
      setTimeout(() => {
        instance.close()
      }, 1500)
    } else {
      instance.waiting = true
    }
  } else {
    instance.waiting = false
    setTimeout(() => {
      instance.close()
    }, 1500)
  }
  document.body.appendChild(instance.$el)
  instance.visible = true
}

let HideToast = (options) => {
  if (instance.visible) {
    instance.close()
  }
}

export {ShowToast, HideToast}
