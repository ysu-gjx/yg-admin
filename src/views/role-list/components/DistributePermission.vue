<template>
  <el-dialog :title="$t('msg.excel.roleDialogTitle')" v-model="visible">
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import roleApi from '@/api/role'
import permissionApi from '@/api/permission'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  roleId: {
    type: String,
    required: true
  }
})

const visible = defineModel({ type: Boolean })

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
const treeRef = ref(null)

const allPermission = ref([])
const getPermissionList = async () => {
  const res = await permissionApi.permissionList()
  allPermission.value = res
}
getPermissionList()
watchSwitchLang(getPermissionList)

// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await roleApi.rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(visible, (val) => {
  if (val) {
    getRolePermission()
  }
})
const i18n = useI18n()
const onConfirm = async () => {
  await roleApi.distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

// close
const closed = () => {
  visible.value = false
}
</script>
<style lang="scss" scoped></style>
