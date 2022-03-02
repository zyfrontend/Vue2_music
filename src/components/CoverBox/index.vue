<template>
  <div class="cover-box" @click="coverBox">
    <div class="cover">
      <img :src="imgUrl" />
    </div>
    <div class="introduction">{{ dataName }}</div>
  </div>
</template>
<script>
export default {
  props: ['imgUrl', 'dataName'],
  methods: {
    coverBox() {
      this.$emit('coverBoxClick')
    },
  },
}
</script>
<style lang="less" scoped>
.cover-box {
  width: 280px;
  height: 280px;
  cursor: pointer;
  margin: 20px 0;
  img {
    width: 100%;
    transition: all 0.3s;
  }
  .cover {
    border-radius: 10px;
    overflow: hidden;
    &:hover img {
      transform: scale(1.2);
    }
  }
  .introduction {
    margin: 5px 0;
    font-weight: 700;
    font-size: 15px;
    //color: white;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}
</style>
