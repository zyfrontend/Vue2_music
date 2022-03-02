<template>
  <button
    :style="{
      backgroundColor: color,
    }"
    class="music-button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#2e2e2f',
    },
    icon: {
      type: String,
    },
  },
}
</script>

<style lang="less" scoped>
.music-button {
  padding: 10px 30px;
  border-radius: 30px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin: 10px 10px;
}
</style>
