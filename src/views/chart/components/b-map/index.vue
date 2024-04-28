<template>
  <el-card class="container"> map </el-card>
</template>
<script setup></script>
<style lang="scss" scoped>
.container {
  position: relative;
  .title {
    position: absolute;
    top: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #333;
    font-size: 22px;
    font-weight: bold;
    z-index: 9;
  }
  .box {
    height: 462px;
  }
}
</style>
