import { defineComponent } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import { useI18n } from 'vue-i18n'
import ThemePicker from '@/components/ThemeSelect'
import Screenfull from '@/components/Screenfull'

export default defineComponent({
  props: {},
  setup(props, { slots }) {
    const userStore = useUserStore()
    const { userInfo } = storeToRefs(userStore)
    const { t } = useI18n()

    return () => {
      const dropdownSlots = {
        dropdown: () => (
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <ElDropdownItem> {t('msg.navBar.home')} </ElDropdownItem>
            </router-link>
            <a target="_blank" href="https://coding.imooc.com/class/542.html">
              <ElDropdownItem>{t('msg.navBar.course')}</ElDropdownItem>
            </a>
            <ElDropdownItem divided onClick={userStore.logoutAction}>
              {t('msg.navBar.logout')}
            </ElDropdownItem>
          </el-dropdown-menu>
        )
      }
      return (
        <div class="navbar">
          <Hamburger class="hamburger-container" />
          <Breadcrumb class="breadcrumb-container" />
          <div className="right-menu">
            <Screenfull class="right-menu-item hover-effect" />
            <ThemePicker class="right-menu-item hover-effect" />
            <LangSelect class="right-menu-item hover-effect" />
            {/* 头像 */}
            <el-dropdown
              class="avatar-container"
              trigger="click"
              v-slots={dropdownSlots}
            >
              <div className="avatar-wrapper">
                <el-avatar
                  shape="square"
                  size={40}
                  src={userInfo.value.avatar}
                ></el-avatar>
                <svg-icon icon="setting"></svg-icon>
              </div>
            </el-dropdown>
          </div>
        </div>
      )
    }
  }
})
