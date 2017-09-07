import Vue from 'vue'
import Popup from './popup'

const PopupConstructor = Vue.extend(Popup)

let instance = new PopupConstructor({
  el: document.createElement('div')
})

let popup = (options) => {
  if (options && typeof options === 'object') {
    instance.iConClass = options.iConClass || 'icon-warning'
    instance.title = options.title || '警告'
    instance.content = options.content || '确认操作？'
    instance.cancelButton = options.cancelButton || '取消'
    instance.confirmButton = options.confirmButton || '确定'
  }
  document.body.appendChild(instance.$el)
  instance.visible = true
  return instance.popup()
}

export default popup
