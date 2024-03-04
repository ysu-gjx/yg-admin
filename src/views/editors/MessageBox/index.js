import { createApp } from 'vue'
import MessageBoxComp from './MessageBox.vue'

const MessageBox = (props, callback) => {
  const container = document.createElement('div')
  const app = createApp(MessageBoxComp, {
    ...props,
    onClose
  })
  open()

  function open() {
    app.mount(container)
    document.body.appendChild(container)
  }

  function onClose() {
    app.unmount()
    container.remove()
    typeof callback === 'function' && callback()
  }
}

export default MessageBox
