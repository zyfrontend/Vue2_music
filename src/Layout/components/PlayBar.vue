<template>
  <div class="play-bar">
    <div class="bar">
      <el-slider v-model="timeProgress" :show-tooltip="false" @change="changeProgress"></el-slider>
    </div>
    <div class="content">
      <div class="left">
        <div class="cover" @click="gotoMusicDetail">
          <img :src="currentMusicDetail.al ? currentMusicDetail.al.picUrl : ''" alt="" />
        </div>
        <div class="detail">
          <div>
            <span>{{ currentMusicDetail.name }}</span> -
            {{ currentMusicDetail.ar ? currentMusicDetail.ar[0].name : '' }}
          </div>
        </div>
      </div>

      <div class="center">
        <div class="controls">
          <i class="hov iconfont icon-24gl-repeat2"></i>
          <i @click="switchMusic('prev')" class="hov iconfont icon-shangyishou"></i>
          <div class="play" @click="playlist.length != 0 ? changePlayState() : ''">
            <i v-if="!currentPlaybackState" class="iconfont icon-24gf-playCircle"></i>
            <i v-else class="iconfont icon-24gf-pauseCircle"></i>
          </div>
          <i @click="switchMusic('next')" class="hov iconfont icon-xiayishou"></i>
          <el-tooltip placement="top">
            <div slot="content">111</div>
            <i class="hov iconfont icon-24gl-volumeLow"></i>
          </el-tooltip>
        </div>
      </div>
      <div class="right">
        <div>{{ `${currentDuration}/${currentMusicTotalDuration}` }}</div>
        <div class="list hov"><i class="iconfont icon-24gl-playlistMusic2"></i></div>
      </div>
    </div>
    <audio
      :src="musicUrl"
      autoplay
      ref="audioPlayer"
      @timeupdate="timeupdate"
      @ended="switchMusic('next')"
      @play="changeState(true)"
      @pause="changeState(false)"
    ></audio>
  </div>
</template>
<script>
import { getPlaySong, returnSecond, handleMusicTime } from '@/utils'
import { mapGetters } from 'vuex'
let lastSecond = 0
let durationNum = 0
export default {
  data() {
    return { timeProgress: 0, musicUrl: '', playMode: 'cycle' }
  },
  computed: {
    ...mapGetters([
      'currentMusicTotalDuration',
      'currentDuration',
      'currentMusicIndex',
      'playlist',
      'currentMusicDetail',
      'currentPlaybackState',
    ]),
  },
  methods: {
    timeupdate() {
      // 当前播放时间 进度条
      let time = Math.floor(this.$refs.audioPlayer.currentTime)
      if (time !== lastSecond) {
        lastSecond = time
        this.$store.commit('PlayBar/changeCurrentDuration', handleMusicTime(time))
        durationNum = returnSecond(this.currentMusicTotalDuration)
        // 进度条
        this.timeProgress = Math.floor((time / durationNum) * 100)
      }
    },
    // 歌曲切换
    switchMusic(type) {
      // 获取当前播放音乐的索引值
      let index = this.currentMusicIndex
      switch (type) {
        case 'prev':
          index = this.currentMusicIndex
          // eslint-disable-next-line no-unused-vars,no-case-declarations
          let prevIndex
          if (this.playMode === 'cycle') {
            prevIndex = index - 1 < 0 ? this.playlist.length - 1 : index - 1
          } else if (this.playType == 'random') {
            if (this.playlist.length === 1) {
              nextIndex = index
            } else {
              prevIndex = index
              while (nextIndex === index) {
                prevIndex = Math.floor(Math.random() * this.playlist.length)
              }
            }
          }
          // 更新当前播放歌曲的索引值
          this.$store.commit('PlayBar/changeCurrentMusicIndex', prevIndex)
          // 当前播放歌曲的总时长
          this.$store.commit('PlayBar/changeCurrentMusicTotalDuration', this.playlist[prevIndex].dt)
          // 当前播放歌曲的id
          return this.$store.commit('PlayBar/changeCurrentMusicId', this.playlist[prevIndex].id)
        case 'next':
          index = this.currentMusicIndex
          // eslint-disable-next-line no-unused-vars,no-case-declarations
          let nextIndex
          // 根据播放模式选择下一首
          if (this.playMode === 'cycle') {
            // 循环模式
            nextIndex = index + 1 === this.playlist.length ? 0 : index + 1
          } else if (this.playMode === 'random') {
            // 当前播放列表只有一首歌的情况，下一首还是他本身
            if (this.playlist.length === 1) {
              nextIndex = index
            } else {
              nextIndex = index
              while (nextIndex === index) {
                nextIndex = Math.floor(Math.random() * this.playlist.length)
              }
            }
          }
          // 更新当前播放歌曲的索引值
          this.$store.commit('PlayBar/changeCurrentMusicIndex', nextIndex)
          // 当前播放歌曲的总时长
          this.$store.commit('PlayBar/changeCurrentMusicTotalDuration', this.playlist[nextIndex].dt)
          // 当前播放歌曲的id
          return this.$store.commit('PlayBar/changeCurrentMusicId', this.playlist[nextIndex].id)
      }
    },
    // 拖动进度条
    changeProgress(e) {
      let time = Math.floor((e / 100) * durationNum) + 1
      this.$refs.audioPlayer.currentTime = time
    },

    // audio 控件暂停 播放
    changePlayState() {
      !this.$store.state.PlayBar.currentPlaybackState ? this.playMusic() : this.pauseMusic()
    },

    // 播放状态
    changeState(state) {
      this.$store.commit('PlayBar/changeCurrentPlaybackState', state)
    },

    // audio 播放控制
    playMusic() {
      this.$refs.audioPlayer.play()
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause()
    },

    // 单曲详情跳转
    gotoMusicDetail() {
      this.$router.push({
        path: '/musicdetail',
      })
    },
  },
  watch: {
    '$store.state.PlayBar.currentMusicId': {
      handler: function (val) {
        // 获取播放链接
        this.musicUrl = getPlaySong(val)
        // 获取当前id 音乐的详情
        this.$store.dispatch('PlayBar/getCurrentMusicDetail', val)
        // 根据当前获取到的id去更新索引
        let currentIndex = this.playlist.findIndex(item => item.id === val)
        this.$store.commit('PlayBar/changeCurrentMusicIndex', currentIndex)
        this.$store.commit('PlayBar/changeCurrentMusicTotalDuration', this.playlist[currentIndex].dt)
      },
      deep: true,
      immediate: true,
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
  .iconfont {
    font-size: 30px;
    margin: 0 10px;
  }
  .bar {
    position: absolute;
    top: -10px;
    left: 5px;
    right: 5px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .left {
      display: flex;
      .cover {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
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
          display: inline-block;
          color: white;
          cursor: pointer;
          max-width: 300px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
        }
      }
    }
    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .play {
        width: 100px;
        height: 100%;
        font-size: 200%;
        text-align: center;
        color: #8e44ad;
        .iconfont {
          font-size: 55px;
        }
      }
    }
    .right {
      display: flex;
      div:nth-child(1) {
        margin-right: 10px;
      }
    }
  }
  .list {
  }
}
</style>
