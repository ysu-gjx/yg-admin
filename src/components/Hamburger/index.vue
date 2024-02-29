<script lang="jsx">
import { defineComponent, computed } from 'vue'

import { useCommonStore } from '@/store'

export default defineComponent({
  props: {},
  setup(props) {
    const commonStore = useCommonStore()
    const icon = computed(() => {
      return commonStore.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
    })
    const toggleClick = () => {
      commonStore.triggerSidebarOpened()
    }
    return () => {
      return (
        <div class="hamburger-container" onClick={toggleClick}>
          <svg-icon
            id="guide-hamburger"
            class="hamburger"
            icon={icon.value}
          ></svg-icon>
        </div>
      )
    }
  }
})
</script>
<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
