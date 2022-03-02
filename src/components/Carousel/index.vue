<template>
  <div class="banner">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="280px" trigger>
        <el-carousel-item class="test" v-for="(item, index) in bannerData" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bannerData: [],
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.banner {
  max-width: 100%;
  display: flex;
  justify-content: center;
  .carousel {
    width: 100%;
  }
  .el-carousel {
    margin: auto;
    width: 1200px;
  }

  .el-carousel__item {
    border-radius: 10px;
  }

  .el-carousel__item img {
    height: 100%;
    width: 100%;
  }
}
</style>
