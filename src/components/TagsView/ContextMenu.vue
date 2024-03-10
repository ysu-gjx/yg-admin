<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ t('msg.tagsView.refresh') }}
    </li>
    <li @click="onCloseRightClick">
      {{ t('msg.tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      {{ t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/store'

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const commonStore = useCommonStore()
const { t } = useI18n()
const router = useRouter()

const onRefreshClick = () => {
  router.go(0)
}
const onCloseRightClick = () => {
  commonStore.removeTagsView({
    index: props.index,
    type: 'right'
  })
}
const onCloseOtherClick = () => {
  commonStore.removeTagsView({
    index: props.index,
    type: 'other'
  })
}
</script>
<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
