<script lang="jsx">
import { defineComponent, getCurrentInstance } from 'vue'
import Sidebar from './Sidebar'
import { useCommonStore } from '@/store'

export default defineComponent({
  data() {
    return {
      logoHeight: 44
    }
  },
  props: {},
  setup(props) {
    const vm = getCurrentInstance()
    const commonStore = useCommonStore()
    return () => {
      return (
        <div>
          <div class="logo-container">
            <el-avatar
              size={vm.data.logoHeight}
              shape="square"
              src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            />
            {commonStore.sidebarOpened ? (
              <h1 class="logo-title">imooc-admin</h1>
            ) : (
              ''
            )}
          </div>
          <el-scrollbar>
            <Sidebar />
          </el-scrollbar>
        </div>
      )
    }
  }
})
</script>
<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
