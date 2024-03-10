import { defineComponent, watch, Transition, KeepAlive } from 'vue'
import { ElTooltip } from 'element-plus'
import { useCommonStore } from '@/store'
import { useRoute } from 'vue-router'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { isTags } from '@/utils/tags'

export default defineComponent({
  props: {},
  components: { ElTooltip },
  setup(props) {
    const route = useRoute()
    const commonStore = useCommonStore()

    const getTitle = (route) => {
      let title = ''

      if (isTags(route.path)) {
        if (route.meta) {
          title = generateTitle(route.meta.title)
        } else {
          const tagsArr = route.path.split('/')
          title = tagsArr[tagsArr.length - 1]
        }
      }

      return title
    }
    watch(
      route,
      (to, from) => {
        const { fullPath, meta, name, params, path, query } = to
        commonStore.addTagsView({
          fullPath,
          meta,
          name,
          params,
          path,
          query,
          title: getTitle(to)
        })
        console.log()
      },
      {
        immediate: true
      }
    )

    watchSwitchLang(() => {
      commonStore.tagsViewList.forEach((route, index) => {
        commonStore.changeTagsView({
          index,
          tag: { ...route, title: getTitle(route) }
        })
      })
    })
    return () => {
      return (
        <div class="app-main">
          <router-view>
            {{
              default: (scope) => (
                <Transition name="fade-transform" mode="out-in">
                  <KeepAlive>{scope.Component}</KeepAlive>
                </Transition>
              )
            }}
          </router-view>
        </div>
      )
    }
  }
})
