<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from '@/Layout'
export default {
  components: { Layout },
  mounted() {
    window.addEventListener('unload', () => {
      console.log('刷新了')
    })
  },
}
</script>
