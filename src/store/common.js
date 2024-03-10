import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export const useCommonStore = defineStore('common', () => {
  //  控制左侧菜单收缩
  const sidebarOpened = ref(true)
  // 语言国际化
  const language = ref(getItem(LANG) || 'zh')
  // tagsView
  const tagsViewList = ref(getItem(TAGS_VIEW) || [])

  // actions
  const triggerSidebarOpened = () => {
    sidebarOpened.value = !sidebarOpened.value
  }
  const setLanguage = (lang) => {
    setItem(LANG, lang)
    language.value = lang
  }

  const addTagsView = (tag) => {
    const isFind = tagsViewList.value.find((item) => item.path === tag.path)
    if (!isFind) {
      tagsViewList.value.push(tag)
      setItem(TAGS_VIEW, tagsViewList.value)
    }
  }

  // 修改一个tag 的title
  const changeTagsView = ({ index, tag }) => {
    tagsViewList.value[index] = tag
    setItem(TAGS_VIEW, tagsViewList.value)
  }
  // 删除tag type: other right index
  const removeTagsView = ({ index, type }) => {
    switch (type) {
      case 'index':
        tagsViewList.value.splice(index, 1)
        break
      case 'right':
        tagsViewList.value.splice(index + 1)
        break
      case 'other':
        tagsViewList.value.splice(index + 1)
        tagsViewList.value.splice(0, index)
        break
      default:
        break
    }
    setItem(TAGS_VIEW, tagsViewList.value)
  }
  return {
    sidebarOpened,
    triggerSidebarOpened,
    language,
    setLanguage,
    tagsViewList,
    addTagsView,
    changeTagsView,
    removeTagsView
  }
})
