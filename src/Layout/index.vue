<template>
  <el-container class="layout">
    <!--   侧栏   -->
    <el-aside width="260px">
      <SideBar :routes="routes"></SideBar>
    </el-aside>
    <el-container style="background-color: #1e1e1f">
      <el-header style="height: 78px"> 1111 </el-header>
      <el-main class="layout-main">
        <transition :name="transitionName">
          <slot></slot>
        </transition>
      </el-main>
      <PlayBar class="fixed-bottom"></PlayBar>
    </el-container>
  </el-container>
</template>
<script>
import SideBar from '@/Layout/components/SideBar'
import PlayBar from './components/PlayBar'
export default {
  data() {
    return {
      transitionName: '',
    }
  },
  components: {
    SideBar,
    PlayBar,
  },
  computed: {
    routes() {
      const copyRoutes = [...this.$router.options.routes]
      copyRoutes.shift() // 去除第一位重定向的路由
      const routes = copyRoutes.filter(item => item.show === true)
      return routes
    },
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  min-width: 1600px;
  position: relative;
  .layout-main {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
