<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 60vh"
  />
</template>

<script setup>
import * as monaco from 'monaco-editor'

import { onMounted, ref, toRaw, watch, shallowRef, computed } from 'vue'

/**
 * 给组件指定初始值
 */
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  handleChange: {
    type: Function,
    default: (v) => {
      console.log(v)
    }
  }
})
const emit = defineEmits(['update:modelValue'])
const codeEditorRef = ref()
const codeEditor = shallowRef()

const strCode = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      )
    }
  }
)

const init = () => {
  if (!codeEditorRef.value) {
    return
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: strCode.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    },
    readOnly: false,
    theme: 'vs-dark'
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  })

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    // props.handleChange(toRaw(codeEditor.value).getValue());
    strCode.value = toRaw(codeEditor.value).getValue()
  })
}

onMounted(() => {
  init()
})
</script>

<style scoped></style>
