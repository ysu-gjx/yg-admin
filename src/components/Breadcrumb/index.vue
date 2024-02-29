<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { useCssVarStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const router = useRouter()
const breadcrumbData = ref([])
const cssVarStore = useCssVarStore()

const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter((item) => {
    return item.meta && item.meta.title
  })
}
const onLinkClick = (item) => {
  router.push(item.path)
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)
const linkHoverColor = ref(cssVarStore.cssVar.menuBg)
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
