import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElPagination, ElButton } from 'element-plus'
export default defineComponent({
  components: { ElButton },
  setup() {
    const { t } = useI18n()
    return () => {
      return (
        <div>
          <div class="mb-4">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
          </div>
          <ElPagination layout="sizes, prev, pager, next" total={50} />
        </div>
      )
    }
  }
})
