<template>
  <div class="layout">
    <Menu></Menu>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Menu from './components/Menu'
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
