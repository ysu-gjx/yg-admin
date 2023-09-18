import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'
import AppMain from './components/AppMain'

import variables from '@/styles/variables.module.scss'

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
    console.log('variables', variables)
    return () => {
      return (
        <div class="app-wrapper">
          {/* 左侧 menu */}
          <sidebar
            id="guide-sidebar"
            class="sidebar-container"
            style={{ backgroundColor: variables.menuBg }}
          />
          <div class="main-container">
            <div className="fixed-header">
              {/* 顶部导航栏 */}
              <nav-bar />
            </div>
            {/* 内容区 */}
            <app-main />
          </div>
        </div>
      )
    }
  }
})
