<template>
  <div :id="editorId" class="tab-editor" />
</template>

<script setup>
import { onMounted, watchEffect, onUnmounted, nextTick } from 'vue'
import { ElNotification } from 'element-plus'

import loadMonaco from '@/utils/monaco/loadMonaco.js'
import loadBeautifier from '@/utils/monaco/loadBeautifier.js'

const emit = defineEmits(['input'])
/**
 * props 数据传递
 */
const props = defineProps({
  value: String,
  type: String,
  editorId: String,
  readOnly: Boolean
})

const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

let beautifier
let jsonEditor
let beautifierCode
let monaco
const mode = {
  html: 'html',
  js: 'javascript',
  json: 'json',
  css: 'css'
}
const updateValue = () => {
  try {
    emit('input', jsonEditor.getValue())
  } catch (error) {
    ElNotification({
      title: '错误',
      message: 'JSON格式错误，请检查',
      type: 'error',
      duration: 0
    })
  }
}
const setEditorValue = (strCode) => {
  jsonEditor = monaco.editor.create(document.getElementById(props.editorId), {
    value: strCode,
    theme: 'vs-dark',
    language: props.type ? mode[props.type] : mode.js,
    automaticLayout: true,
    lineNumbersMinChars: 3,
    scrollBeyondLastLine: false,
    formatOnType: true,
    formatOnPaste: true
  })
  // 监听编辑结束事件
  jsonEditor.onDidChangeModelContent(() => {
    updateValue()
  })
}
const updateEditorValue = (strCode) => {
  nextTick(() => {
    jsonEditor && jsonEditor.setValue(strCode)
  })
}
const onOpen = (strCode, type = '') => {
  loadBeautifier((btf) => {
    beautifier = btf

    strCode = type === 'update' ? props.value : strCode

    beautifierCode = beautifier(strCode, beautifierConf.js)
    loadMonaco((val) => {
      monaco = val
      if (type === 'update') {
        updateEditorValue(beautifierCode)
      } else {
        setEditorValue(beautifierCode)
      }
    })
  })
}

onMounted(() => {
  onOpen(props.value)
})

onUnmounted(() => {
  // document.getElementById(props.editorId)?.remove();
})

watchEffect(() => {
  nextTick(() => {
    jsonEditor && jsonEditor.updateOptions({ readOnly: props.readOnly })
  })
})

defineExpose({
  onOpen,
  beautifierConf
})
</script>

<style lang="scss" scoped>
.tab-editor {
  width: 100%;
  height: 320px;
}
</style>
