<template>
  <div @click="onToggle">
    <svg-icon
      id="guide-full"
      class="hamburger"
      :icon="isScreenfull ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

const isScreenfull = ref(false)
const onToggle = () => {
  screenfull.toggle()
}
const change = () => {
  isScreenfull.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', change)
})
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<style lang="scss" scoped></style>
