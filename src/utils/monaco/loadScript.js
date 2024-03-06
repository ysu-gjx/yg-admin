const callbacks = {}

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
function loadScript(src, callback) {
  const existingScript = document.getElementById(src)
  const cb = callback || (() => {})
  if (!existingScript) {
    callbacks[src] = []
    const $script = document.createElement('script')
    $script.src = src
    $script.id = src
    $script.async = 1
    // $script.type = 'text/javascript'
    document.body.appendChild($script)
    // eslint-disable-next-line no-use-before-define
    const onEnd =
      'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script)
    onEnd($script)
  }

  callbacks[src].push(cb)

  function stdOnEnd(script) {
    script.onload = () => {
      // eslint-disable-next-line no-multi-assign
      this.onerror = this.onload = null
      callbacks[src].forEach((item) => {
        item(null, script)
      })
      delete callbacks[src]
    }
    script.onerror = () => {
      // eslint-disable-next-line no-multi-assign
      this.onerror = this.onload = null
      cb(new Error(`Failed to load ${src}`), script)
    }
  }

  function ieOnEnd(script) {
    script.onreadystatechange = () => {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      this.onreadystatechange = null
      callbacks[src].forEach((item) => {
        item(null, script)
      })
      delete callbacks[src]
    }
  }
}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue(list, cb) {
  const first = list.shift()
  // eslint-disable-next-line no-unused-expressions
  list.length
    ? loadScript(first, () => loadScriptQueue(list, cb))
    : loadScript(first, cb)
}

export default loadScript
