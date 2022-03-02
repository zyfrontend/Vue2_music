<template>
  <div>
    <Carousel :bannerData="banners"></Carousel>
    <ContentBox title="推荐歌单">
      <el-row>
        <el-col class="test" :xl="6" v-for="item in recommendMusicList" :key="item.id">
          <CoverBox @coverBoxClick="coverClick(item)" :imgUrl="item.picUrl" :dataName="item.name"></CoverBox>
        </el-col>
      </el-row>
    </ContentBox>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Carousel from '@/components/Carousel'
import ContentBox from '@/components/ContentBox'
import CoverBox from '@/components/CoverBox'
export default {
  name: 'Discover',
  components: {
    Carousel,
    ContentBox,
    CoverBox,
  },
  computed: {
    ...mapGetters(['banners', 'recommendMusicList']),
  },
  created() {
    this.$store.dispatch('Discover/getDiscoverBannerBannerAction')
    this.$store.dispatch('Discover/getRecommendMusicListAction')
  },
  methods: {
    coverClick(item) {
      // 歌单详情跳转
      // this.$router.push({ path: `/playlistdetail/${item.id}` })
      this.$router.push({
        name: 'PlaylistDetail',
        params: {
          id: item.id,
        },
      })
    },
  },
}
</script>

<style>
.test {
  display: flex;
  justify-content: center;
}
</style>
