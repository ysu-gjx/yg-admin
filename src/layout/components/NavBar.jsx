import { defineComponent } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

export default defineComponent({
  props: {},
  setup(props, { slots }) {
    const userStore = useUserStore()
    const { userInfo } = storeToRefs(userStore)

    return () => {
      const dropdownSlots = {
        dropdown: () => (
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <ElDropdownItem> 首页 </ElDropdownItem>
            </router-link>
            <a target="_blank" href="https://coding.imooc.com/class/542.html">
              <ElDropdownItem>课程主页</ElDropdownItem>
            </a>
            <ElDropdownItem divided onClick={userStore.logoutAction}>
              退出登录
            </ElDropdownItem>
          </el-dropdown-menu>
        )
      }
      return (
        <div class="navbar">
          <div className="right-menu">
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
