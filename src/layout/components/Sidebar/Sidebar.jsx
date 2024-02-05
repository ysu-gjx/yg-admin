import { defineComponent } from 'vue'
import { Location } from '@element-plus/icons-vue'

export default defineComponent({
  setup(props, ctx) {
    return () => {
      return (
        <el-menu
          text-color="#fff"
          active-text-color="#ffd04b"
          background-color="#545c64"
          unique-opened={true}
        >
          <el-sub-menu index="1">
            {{
              title: () => [
                <el-icon>
                  <Location />
                </el-icon>,
                <span>Navigator One</span>
              ],
              default: () => [
                <el-menu-item index="1-1">item one</el-menu-item>,
                <el-menu-item index="1-2">item two</el-menu-item>
              ]
            }}
          </el-sub-menu>
          <el-menu-item index="2">
            {{
              title: () => [
                <el-icon>
                  <Location />
                </el-icon>,
                <span>Navigator 2</span>
              ]
            }}
          </el-menu-item>
        </el-menu>
      )
    }
  }
})
