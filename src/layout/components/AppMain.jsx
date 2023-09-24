import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'

export default defineComponent({
  props: {},
  components: { ElTooltip },
  setup(props) {
    return () => {
      const slots = {
        content: () => (
          <span>
            multiple lines
            <br />
            second line
          </span>
        )
      }
      return (
        <div class="app-main">
          <el-tooltip placement="top">
            {{
              default: () => <el-button>Top center</el-button>,
              content: () => (
                <span>
                  multiple lines
                  <br />
                  second line
                </span>
              )
            }}
          </el-tooltip>
        </div>
      )
    }
  }
})
