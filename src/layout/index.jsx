import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'
import AppMain from './components/AppMain'
import { useCommonStore, useCssVarStore } from '@/store'
import TagsView from '@/components/TagsView'

import './index.scss'

export default defineComponent({
  name: 'Layout',
  components: {
    Sidebar,
    NavBar,
    AppMain
  },
  props: {},
  setup(props) {
    const commonStore = useCommonStore()
    const cssVarStore = useCssVarStore()

    return () => {
      return (
        <div
          class="app-wrapper"
          className={commonStore.sidebarOpened ? 'openSidebar' : 'hideSidebar'}
        >
          {/* 左侧 menu */}
          <sidebar
            id="guide-sidebar"
            class="sidebar-container"
            style={{ backgroundColor: cssVarStore.cssVar.menuBg }}
          />
          <div class="main-container">
            <div className="fixed-header">
              {/* 顶部导航栏 */}
              <nav-bar />
              <TagsView id="guide-tags" />
            </div>
            {/* 内容区 */}
            <app-main />
          </div>
        </div>
      )
    }
  }
})
