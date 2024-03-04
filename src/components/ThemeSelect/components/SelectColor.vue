<template>
  <el-dialog :title="$t('msg.universal.title')" v-model="visible" width="22%">
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="mainColor" :predefine="predefineColors" />
    </div>

    <template #footer>
      <div>
        <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
// 默认色值
const mainColor = ref(themeStore.mainColor)

const close = () => {
  visible.value = false
}
const handleConfirm = () => {
  themeStore.setMainColor(mainColor.value)
  close()
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
