<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      class="search-icon"
      icon="search"
      @click.stop="onShowClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
const isShow = ref(false)
const search = ref('')
const searchOptions = ref([])
const headerSearchSelectRef = ref(null)

// 我们希望被检索的页面其实就是左侧菜单中的页面
let searchPool = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(fRoutes)
})

let fuse

const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}

initFuse(searchPool.value)

const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

const querySearch = async (query) => {
  if (query.trim() !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
  // issue: https://coding.imooc.com/learn/questiondetail/280523.html
  search.value = ''
}

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

const onSelectChange = async (val) => {
  // await router.push(val.path)
  router.push(val.path)
  // 用个定时器减少 重绘报错 -- el-select
  // setTimeout(() => {
  onClose()
  // }, 400)
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const fRoutes = filterRoutes(router.getRoutes())
    return generateRoutes(fRoutes)
  })

  initFuse(searchPool.value)
})
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
