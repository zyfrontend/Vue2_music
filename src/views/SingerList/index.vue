<template>
  <div class="singerlist">
    <div class="top">
      <div class="selector-item">
        <div class="title">语种：</div>
        <CategoryMenu @clickSecondBarItem="areaItem" :menuData="languageSort"></CategoryMenu>
      </div>
      <div class="selector-item">
        <div class="title">分类：</div>
        <CategoryMenu @clickSecondBarItem="typeItem" :menuData="typeSort"></CategoryMenu>
      </div>
      <div class="selector-item">
        <div class="title">筛选：</div>
        <CategoryMenu @clickSecondBarItem="initialItem" :menuData="initialSort"></CategoryMenu>
      </div>
    </div>
    <div class="list">
      <el-row>
        <el-col class="flex" :xs="12" :sm="8" :md="8" :xl="6" :lg="6" v-for="item in singerList" :key="item.id">
          <CoverBox :imgUrl="item.picUrl" :dataName="item.name"></CoverBox>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryMenu from '@/components/CategoryMenu'
import CoverBox from '@/components/CoverBox'
export default {
  data() {
    return {
      languageSort: [
        { area: -1, name: '全部' },
        { area: 7, name: '华语' },
        { area: 96, name: '欧美' },
        { area: 8, name: '日本' },
        { area: 16, name: '韩国' },
        { area: 0, name: '其它' },
      ],
      typeSort: [
        { type: -1, name: '全部' },
        { type: 1, name: '男歌手' },
        { type: 2, name: '女歌手' },
        { type: 3, name: '乐队' },
      ],
      initialSort: [
        { initial: -1, name: '热门' },
        { initial: 'a', name: 'A' },
        { initial: 'b', name: 'B' },
        { initial: 'c', name: 'C' },
        { initial: 'd', name: 'D' },
        { initial: 'e', name: 'E' },
        { initial: 'f', name: 'F' },
        { initial: 'g', name: 'G' },
        { initial: 'h', name: 'H' },
        { initial: 'i', name: 'I' },
        { initial: 'j', name: 'J' },
        { initial: 'k', name: 'K' },
        { initial: 'l', name: 'L' },
        { initial: 'm', name: 'M' },
        { initial: 'n', name: 'N' },
        { initial: 'o', name: 'O' },
        { initial: 'p', name: 'P' },
        { initial: 'q', name: 'Q' },
        { initial: 'r', name: 'R' },
        { initial: 's', name: 'S' },
        { initial: 't', name: 'T' },
        { initial: 'u', name: 'U' },
        { initial: 'v', name: 'V' },
        { initial: 'w', name: 'W' },
        { initial: 'x', name: 'X' },
        { initial: 'y', name: 'Y' },
        { initial: 'z', name: 'Z' },
        { initial: 0, name: '#' },
      ],
    }
  },
  components: {
    CategoryMenu,
    CoverBox,
  },
  created() {
    this.$store.dispatch('SingerList/getSingerList')
  },
  computed: {
    ...mapGetters(['singerList']),
  },
  methods: {
    // 事件处理
    // 地区
    areaItem(index) {
      this.$store.commit('SingerList/changeSingerArea', this.languageSort[index].area)
      // 先清空list 再请求数据
      this.$store.commit('SingerList/changeSingerList', [])
      this.$store.commit('SingerList/changeSingerCurrentPage', 1)
      this.$store.dispatch('SingerList/getSingerList')
    },
    // 分类
    typeItem(index) {
      this.$store.commit('SingerList/changeSingerType', this.typeSort[index].type)
      // 先清空list 再请求数据
      this.$store.commit('SingerList/changeSingerCurrentPage', 1)
      this.$store.commit('SingerList/changeSingerList', [])
      this.$store.dispatch('SingerList/getSingerList')
    },
    // 筛选
    initialItem(index) {
      this.$store.commit('SingerList/changeSingerInitial', this.initialSort[index].initial)
      // 先清空list 再请求数据
      this.$store.commit('SingerList/changeSingerCurrentPage', 1)
      this.$store.commit('SingerList/changeSingerList', [])
      this.$store.dispatch('SingerList/getSingerList')
    },
  },
}
</script>

<style lang="less" scoped>
.singerlist {
  .selector-item {
    display: flex;
  }
  .title {
    font-size: 12px;
    width: 40px;
    line-height: 33px;
  }
}
</style>
