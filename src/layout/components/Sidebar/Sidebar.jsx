import { defineComponent, computed } from 'vue'
import MenuItem from './MenuItem.vue'
import { useCssVarStore, useCommonStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateMenu } from '@/utils/route'

export default defineComponent({
  props: {},
  setup(props, ctx) {
    const router = useRouter()
    const fRoutes = filterRoutes(router.getRoutes())
    const menu = generateMenu(fRoutes)
    const route = useRoute()
    const cssVarStore = useCssVarStore()
    const commonStore = useCommonStore()
    const activeMenu = computed(() => route.path)
    const renderMenu = (routes) => {
      return routes.map((route) => {
        if (route.children && route.children.length) {
          return (
            <el-sub-menu index={route.path}>
              {{
                title: () => (
                  <MenuItem
                    title={route.meta.title}
                    icon={route.meta.icon}
                    iconName={route.meta.iconName}
                  />
                ),
                default: () => renderMenu(route.children)
              }}
            </el-sub-menu>
          )
        }
        return (
          <el-menu-item index={route.path}>
            {{
              default: () => (
                <MenuItem
                  title={route.meta.title}
                  icon={route.meta.icon}
                  iconName={route.meta.iconName}
                />
              )
            }}
          </el-menu-item>
        )
      })
    }
    return () => {
      return (
        <el-menu
          collapse={!commonStore.sidebarOpened}
          text-color={cssVarStore.cssVar.menuText}
          active-text-color={cssVarStore.cssVar.menuActiveText}
          background-color={cssVarStore.cssVar.menuBg}
          unique-opened={true}
          router
          default-active={activeMenu.value}
        >
          {renderMenu(menu)}
        </el-menu>
      )
    }
  }
})
