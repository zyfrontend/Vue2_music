<template>
  <el-container class="layout">
    <!--   侧栏   -->
    <el-aside width="260px">
      <SideBar :routes="routes"></SideBar>
    </el-aside>
    <el-container style="background-color: #1e1e1f">
      <el-header height="100px" class="header-box">
        <div class="back">
          <i @click="$router.go(-1)" class="iconfont icon-24gl-arrowLeft2"></i>
          <i @click="$router.go(1)" class="iconfont icon-24gl-arrowRight2"></i>
        </div>
        <div class="avatar">
          <img @click="LoginShow = true" :src="userInfo.avatarUrl" alt="" v-if="userInfo.avatarUrl" />
          <i @click="LoginShow = true" class="iconfont icon-24gl-userGroup" v-else></i>
        </div>
      </el-header>
      <el-main class="layout-main">
        <transition :name="transitionName">
          <slot></slot>
        </transition>
      </el-main>
      <PlayBar class="fixed-bottom"></PlayBar>
    </el-container>
    <transition :name="transitionName">
      <Login v-show="LoginShow" @closeLogin="closeLogin"></Login>
    </transition>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex'
import SideBar from '@/Layout/components/SideBar'
import PlayBar from './components/PlayBar'
import Login from '@/components/Login'
export default {
  data() {
    return {
      transitionName: '',
      LoginShow: false,
    }
  },
  components: {
    SideBar,
    PlayBar,
    Login,
  },
  methods: {
    closeLogin() {
      this.LoginShow = false
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
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
  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .back {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;

    .iconfont {
      font-size: 35px;
      margin: 0 30px;
      width: 40px;
      color: white;
      height: 40px;
      border-radius: 50%;
      transition: all 0.3s;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #2e2e2f;
      }
    }
  }
  .avatar {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 35px;
    }
    &:hover {
      background-color: #8e44ad;
      color: white;
    }
    img {
      width: 100%;
    }
  }
  .layout-main {
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
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
