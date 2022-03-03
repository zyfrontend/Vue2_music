<template>
  <div>
    <el-row>
      <el-col :xs="12" :sm="8" :md="8" :xl="6" :lg="6" v-for="item in userMusicLibrary" :key="item.id">
        <CoverBox :imgUrl="item.coverImgUrl" :dataName="item.name" @coverBoxClick="coverClick(item)"></CoverBox>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CoverBox from '@/components/CoverBox'
export default {
  components: {
    CoverBox,
  },
  computed: {
    ...mapGetters(['userInfo', 'userMusicLibrary']),
  },
  created() {
    this.$store.dispatch('MusicLibrary/getUserMusicLibrary', this.userInfo.userId)
  },
  methods: {
    coverClick(item) {
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
