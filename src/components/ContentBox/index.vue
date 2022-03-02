<template>
  <el-card class="content-box">
    <div slot="header">
      <span>{{ title }}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </el-card>
</template>
<script>
export default {
  props: ['title'],
}
</script>
<style lang="less" scoped>
.content-box {
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
