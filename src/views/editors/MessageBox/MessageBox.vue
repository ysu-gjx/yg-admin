<template>
  <div class="message-box">
    <div class="inner">
      <div :class="['header', type]">
        {{ title }}
      </div>
      <p class="content">{{ content }}</p>
      <div class="footer">
        <button :class="[type]" @click="onClose">{{ btnText }}</button>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  content: String,
  type: {
    type: String,
    default: 'primary',
    validator: (val) =>
      ['primary', 'success', 'warning', 'danger'].includes(val)
  },
  btnText: {
    type: String,
    default: 'Close'
  },
  onClose: Function
})
</script>
<style lang="scss" scoped>
.message-box {
  z-index: 9999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);

  .inner {
    width: 400px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    .warning {
      background: orange;
      color: #333;
    }

    .header {
      height: 38px;
      line-height: 38px;
      padding: 0 10px;
    }
    .content {
      padding: 15px;
    }
    .footer {
      padding: 0 15px;
      button {
        outline: none;
        border: none;
        padding: 0 10px;
        height: 32px;
        float: right;
        margin-bottom: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>
