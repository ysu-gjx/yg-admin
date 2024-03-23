<template>
  <div class="user-manage-container">
    <!--  -->
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">
          {{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>

    <!-- 表格区域 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :align="item.align"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :formatter="item.formatter"
        >
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script setup lang="jsx">
import { reactive, ref, computed, onActivated } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { dateFilter } from '@/filters'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

const { t } = useI18n()
// 数据相关
const tableData = ref([])
const pagination = reactive({
  page: 1,
  size: 2,
  total: 0
})

const getTableData = async () => {
  const res = await getUserManageList({
    page: pagination.page,
    size: pagination.size
  })

  tableData.value = res.list.map((item, index) => ({
    ...item,
    index: index + 1
  }))
  pagination.total = res.total
}
// getTableData()
onActivated(getTableData)
watchSwitchLang(getTableData)

const columns = reactive([
  {
    label: '#',
    prop: 'index'
  },
  {
    label: computed(() => t('msg.excel.name')),
    prop: 'username'
  },
  {
    label: computed(() => t('msg.excel.mobile')),
    prop: 'mobile'
  },
  {
    label: computed(() => t('msg.excel.avatar')),
    align: 'center',
    formatter: (row) => {
      return <el-image class="avatar" src={row.avatar} />
    }
  },
  {
    label: computed(() => t('msg.excel.role')),
    formatter: (row) => {
      return (
        <>
          {row.role && row.role.length > 0 ? (
            row.role.map((item) => {
              return (
                <el-tag key={item.id} size="small">
                  {item.title}
                </el-tag>
              )
            })
          ) : (
            <el-tag size="small">{t('msg.excel.defaultRole')}</el-tag>
          )}
        </>
      )
    }
  },
  {
    label: computed(() => t('msg.excel.openTime')),
    prop: 'openTime',
    formatter: (row) => {
      return <>{dateFilter(row.openTime)}</>
    }
  },
  {
    label: computed(() => t('msg.excel.action')),
    fixed: 'right',
    width: '260',
    formatter: (row) => {
      return (
        <>
          <el-button
            type="primary"
            size="small"
            onClick={() => onShowClick(row._id)}
          >
            {t('msg.excel.show')}
          </el-button>
          {/* v-permission="['distributeRole']" */}
          <el-button
            type="info"
            size="small"
            onClick={() => onShowRoleClick(row)}
          >
            {t('msg.excel.showRole')}
          </el-button>
          {/* v-permission="['removeUser']" */}
          <el-button
            type="danger"
            size="small"
            onClick={() => onRemoveClick(row)}
          >
            {t('msg.excel.remove')}
          </el-button>
        </>
      )
    }
  }
])

const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

const onShowClick = () => {}
const onShowRoleClick = () => {}
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    t('msg.excel.dialogTitle1') + row.username + t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getTableData()
  })
}

/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  pagination.size = currentSize
  getTableData()
}
/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  pagination.page = currentPage
  getTableData()
}
</script>
<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
