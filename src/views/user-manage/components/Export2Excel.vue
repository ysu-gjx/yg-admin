<template>
  <el-dialog :title="$t('msg.excel.title')" v-model="visible" width="30%">
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { watchSwitchLang } from '@/utils/i18n'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters'

const visible = defineModel({ type: Boolean })

// 处理文件名
const { t } = useI18n()
const exportDefaultName = computed(() => t('msg.excel.defaultName'))
const excelName = ref(exportDefaultName.value)
watchSwitchLang(() => {
  excelName.value = exportDefaultName.value
})

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const res = await getUserManageAllList()
  const excel = await import('@/utils/Export2Excel')

  const data = formatJson(USER_RELATIONS, res.list)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value || exportDefaultName.value
  })
  closed()
}

// 该方法负责将数组转化成二维数组
const formatJson = (headers, list) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return list.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}

// 关闭
const closed = () => {
  loading.value = false
  visible.value = false
}
</script>
<style lang="scss" scoped></style>
