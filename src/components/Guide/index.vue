<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="doStart" />
    </el-tooltip>
  </div>
</template>
<script setup>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { steps } from './steps'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()
let driverObj
const initDriver = () => {
  driverObj = driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    doneBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    showButtons: ['next', 'previous', 'close'],
    onPopoverRender: (popover) => {
      popover.closeButton.style.display = ''
    }
  })
}
onMounted(() => {
  initDriver()
})
watchSwitchLang(() => {
  initDriver()
})

const doStart = () => {
  if (driverObj.isActive()) return
  driverObj.setSteps(steps(i18n))
  driverObj.drive()
}
</script>
<style lang="scss" scoped></style>
