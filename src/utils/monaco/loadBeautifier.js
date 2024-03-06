import { ElLoading } from 'element-plus'
import loadScript from './loadScript'
import config from './pluginsConfig'

let beautifierObj

export default function loadBeautifier(cb) {
  const beautifierUrl = config.beautifierUrl
  if (beautifierObj) {
    cb(beautifierObj)
    return
  }

  const loading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '格式化资源加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.5)'
  })

  loadScript(beautifierUrl, () => {
    loading.close()
    // eslint-disable-next-line no-undef
    // beautifierObj = beautifier
    beautifierObj = window.js_beautify
    cb(beautifierObj)
  })
}
