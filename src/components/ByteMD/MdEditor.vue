<template>
  <div>
    <Editor
      :value="value"
      :mode="mode"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor } from '@bytemd/vue-next'
// import { ref } from 'vue'
import 'bytemd/dist/index.css'

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]

/**
 * 给组件指定初始值
 */
defineProps({
  value: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'split'
  },
  handleChange: {
    type: Function,
    default: (v) => {
      console.log(v)
    }
  }
})
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
