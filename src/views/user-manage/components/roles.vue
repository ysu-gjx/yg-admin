<template>
  <el-dialog :title="$t('msg.excel.roleDialogTitle')" v-model="visible">
    <el-checkbox-group v-model="userRoleIdList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      ></el-checkbox>
    </el-checkbox-group>
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
import { userRoles, updateRole } from '@/api/user-manage'
import roleApi from '@/api/role'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['updateRole'])

const visible = defineModel({ type: Boolean })

// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleApi.roleList()
}
getListData()
watchSwitchLang(getListData)
// 当前用户角色
const userRoleIdList = ref([])
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleIdList.value = res.role.map((item) => item.id)
}
watch(visible, (val) => {
  if (val) {
    getUserRoles()
  }
})
const i18n = useI18n()
const onConfirm = async () => {
  const roles = allRoleList.value.filter((item) =>
    userRoleIdList.value.includes(item.id)
  )

  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 角色更新成功
  emit('updateRole')
  closed()
}

// close
const closed = () => {
  visible.value = false
}

// defineExpose({
//   open
// })
</script>
<style lang="scss" scoped></style>
