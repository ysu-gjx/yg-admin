<template>
  <div>
    <UploadExcel :onSuccess="onSuccess" />
  </div>
</template>
<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { userBatchImport } from '@/api/user-manage'
import { USER_RELATIONS, formatDate } from './utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

/**
 * 数据解析成功之后的回调
 */
const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = (data) => {
  const res = []
  data.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
      } else {
        userInfo[USER_RELATIONS[key]] = item[key]
      }
    })
    res.push(userInfo)
  })

  return res
}
</script>
<style lang="scss" scoped></style>
