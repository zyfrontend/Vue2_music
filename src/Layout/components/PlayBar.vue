<template>
  <div class="play-bar">
    <div class="bar">
      <el-slider v-model="timeProgress" :show-tooltip="false"></el-slider>
    </div>
    <div class="content">
      <div class="left">
        <div class="cover">
          <img src="https://zyfullstack-images.oss-cn-shanghai.aliyuncs.com/img/202201101407139.png" alt="" />
        </div>
        <div class="detail">
          <div><span>来迟</span> - 戴羽彤</div>
        </div>
      </div>

      <div class="center">
        <div class="controls">
          <i class="el-icon-error"></i>
          <i class="el-icon-error"></i>
          <div class="play"><i class="el-icon-error"></i></div>
          <i class="el-icon-error"></i>
          <i class="el-icon-error"></i>
        </div>
      </div>
      <div class="right">
        <div>{{ `${currentDuration}/${currentMusicTotalDuration}` }}</div>
        <div>=</div>
      </div>
    </div>
    <audio :src="musicUrl" autoplay ref="audioPlayer" @timeupdate="timeupdate"></audio>
  </div>
</template>
<script>
import { getPlaySong, returnSecond } from '@/utils'
import { mapGetters } from 'vuex'
let lastSecond = 0
let durationNum = 0
export default {
  data() {
    return { timeProgress: 10, musicUrl: '' }
  },
  computed: {
    ...mapGetters(['currentMusicTotalDuration', 'currentDuration']),
  },
  methods: {
    timeupdate() {
      // 当前播放时间
      let time = Math.floor(this.$refs.audioPlayer.currentTime)
      if (time !== lastSecond) {
        lastSecond = time
        console.log(time)
        // this.$store.commit('PlayBar/changeCurrentDuration', time)
        durationNum = returnSecond(this.currentMusicTotalDuration)
        this.timeProgress = Math.floor((time / durationNum) * 100)
      }
      // 进度条位置
    },
  },
  watch: {
    '$store.state.PlayBar.currentMusicId': {
      handler: function (val) {
        // 获取播放链接
        this.musicUrl = getPlaySong(val)
        // 获取当前id 音乐的详情
        this.$store.dispatch('PlayBar/getCurrentMusicDetail', val)
      },
      deep: true,
    },
  },
}
</script>
<style lang="less" scoped>
.play-bar {
  width: 100%;
  height: 130px;
  background-color: #171718;
  box-sizing: border-box;
  padding: 20px 0;
  position: relative;
  .bar {
    position: absolute;
    top: -10px;
    left: 5px;
    right: 5px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      .cover {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100px;
          height: 100px;
          transition: all 0.3s;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
      .detail {
        display: flex;
        align-items: center;
        margin: 0 10px;
        font-size: 22px;
        span {
          color: white;
        }
      }
    }
    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      .play {
        width: 100px;
        height: 100%;
        font-size: 200%;
        text-align: center;
        color: #8e44ad;
      }
    }
    .right {
      display: flex;
      div:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
}
</style>
