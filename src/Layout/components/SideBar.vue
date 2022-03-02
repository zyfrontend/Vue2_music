<template>
  <div class="side-bar">
    <div class="title"><i class="iconfont icon-yinle" />ZY音乐</div>
    <div>
      <router-link class="link-item" v-for="item in routes" :key="item.path" :to="item.path">
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ['routes'],
  data() {
    return {
      ActiveColor: '#8e44ad',
    }
  },
  created() {},
  computed: {
    activeMenu() {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
}
</script>

<style lang="less" scoped>
.side-bar {
  width: 100%;
  height: 100%;
  background-color: #171718;
  padding: 0 15px;
  .icon-yinle {
    font-size: 40px;
    margin-right: 10px;
  }
  a {
    text-decoration: none;
    display: block;
  }
  .title {
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    color: white;
    font-weight: 700;
  }
  .link-item {
    width: 100%;
    padding: 10px 10px;
    font-size: 20px;
    margin: 10px 0;
    border-radius: 5px;
    color: white;
    font-weight: 300;
    i {
      margin-right: 15px;
    }
    &:hover {
      background-color: #2e2e2f;
    }
  }
}
</style>
