import { defineComponent, computed } from 'vue'
import MenuItem from './MenuItem.vue'
import { useCssVarStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  setup(props, ctx) {
    const route = useRoute()
    const cssVarStore = useCssVarStore()
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
          text-color={cssVarStore.cssVar.menuText}
          active-text-color={cssVarStore.cssVar.menuActiveText}
          background-color={cssVarStore.cssVar.menuBg}
          unique-opened={true}
          router
          default-active={activeMenu.value}
        >
          {renderMenu(props.menu)}
        </el-menu>
      )
    }
  }
})
