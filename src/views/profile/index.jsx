import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElPagination } from 'element-plus'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    return () => {
      return (
        <div>
          <div class="">{t('msg.test')}</div>
          <ElPagination layout="sizes, prev, pager, next" total={50} />
        </div>
      )
    }
  }
})
