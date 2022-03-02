<template>
  <div class="play-list-detail">
    <div class="detail">
      <div class="cover">
        <img :src="playListDetail.coverImgUrl" alt="" />
      </div>
      <div class="right">
        <h4 class="title">{{ playListDetail.name }}</h4>
        <div class="author-box">
          <div class="avatar">
            <img :src="playListDetail.creator ? playListDetail.creator.avatarUrl : ''" alt="" />
          </div>
          <span class="author">{{ playListDetail.creator ? playListDetail.creator.nickname : '' }}</span>
          <div class="tag">
            <span v-for="tags in playListDetail.tags" :key="tags">#{{ tags }}</span>
          </div>
        </div>
        <div class="description">
          {{ playListDetail.description }}
        </div>
        <div>
          <MusicButton color="#8e44ad" @click.native="playAll"> <i class="el-icon-star-off"></i> 播放全部 </MusicButton>
          <MusicButton> <i class="el-icon-star-off"></i> 收藏 </MusicButton>
          <MusicButton> --- </MusicButton>
        </div>
      </div>
    </div>
    <el-tabs class="tabs" v-model="activeName">
      <el-tab-pane :label="`歌曲${playListDetail.trackCount}`" name="song">
        <Table :tableData="playList"></Table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="commont">
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicButton from '@/components/MusicButton'
import Table from '@/components/Table'
export default {
  data() {
    return {
      activeName: 'song',
    }
  },
  components: {
    MusicButton,
    Table,
  },
  created() {
    this.$store.dispatch('PlaylistDetail/getPlayListDetailAction', this.$route.params.id)
  },
  computed: {
    ...mapGetters(['playListDetail', 'playlist']),
    playList() {
      return this.playListDetail.tracks
    },
  },
  methods: {
    playAll() {
      this.$message({
        message: '添加成功',
        type: 'success',
      })
      this.$store.commit('PlayBar/changePlayList', this.playList)
      this.$store.commit('PlayBar/changeCurrentMusicIndex', 0)
      this.$store.commit('PlayBar/changeCurrentMusicId', this.playList[0].id)
      this.$store.commit('PlayBar/changeCurrentMusicTotalDuration', this.playList[0].dt)
    },
  },
}
</script>

<style lang="less" scoped>
.play-list-detail {
  padding: 0 20px;
  .detail {
    display: flex;
  }
  .tabs {
    margin-top: 20px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .cover {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 20px;
  }
  .author {
    color: white;
    font-size: 15px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .right {
    flex: 1;
    .title {
      color: white;
    }
    .author-box {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .author {
        margin: 0 20px;
        cursor: pointer;
      }
      .tag {
        display: flex;
        align-items: center;
        span {
          cursor: pointer;
          margin: 0 10px;
          font-size: 15px;
        }
      }
    }
    .description {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
