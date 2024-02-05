import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'

export default defineComponent({
  props: {},
  components: { ElTooltip },
  setup(props) {
    return () => {
      return (
        <div class="app-main">
          <router-view></router-view>
        </div>
      )
    }
  }
})
