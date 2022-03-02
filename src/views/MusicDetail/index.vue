<template>
  <div class="music-detail">
    <img class="bac" :src="currentMusicDetail.al.picUrl" alt="" />
    <div class="content">
      <div class="left">
        <div class="cover">
          <img :src="currentMusicDetail.al.picUrl" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="title">{{ currentMusicDetail.name }}</div>
        <div class="songer">{{ `歌手：${currentMusicDetail.ar ? currentMusicDetail.ar[0].name : '匿名'}` }}</div>
        <ul class="lyrics" ref="lrc">
          <li
            v-for="(item, index) in currentMusicLyric"
            :key="item.time"
            :class="index === lyricsIndex ? 'islyrics' : ''"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { returnSecond, scrollTo } from '@/utils'
export default {
  name: 'MusicDetail',
  data() {
    return {
      lyricsIndex: 0,
    }
  },
  computed: {
    ...mapGetters(['currentMusicDetail', 'currentMusicLyric', 'currentDuration']),
  },
  methods: {
    scrollLyrics() {
      if (this.lyricsIndex > 0 && this.lyricsIndex < 3) return
      scrollTo(this.$refs.lrc, (this.lyricsIndex - 3) * 52, 400)
    },
  },
  watch: {
    '$store.state.PlayBar.currentMusicId': {
      handler: function (val) {
        this.$store.dispatch('PlayBar/getCurrentMusicLyric', val)
      },
      deep: true,
      immediate: true,
    },
    '$store.state.PlayBar.currentDuration'(val) {
      let j
      for (let i = 0; i < this.currentMusicLyric.length; i++) {
        j = Math.floor(this.currentMusicLyric[i].time / 1000)
        if (returnSecond(val) < j) {
          this.lyricsIndex = i - 1
          break
        }
      }
      this.scrollLyrics()
    },
  },
}
/*  */
</script>

<style lang="less" scoped>
.music-detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
  }
  .bac {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: scale(1.5);
    filter: blur(20px);
  }
  .content {
    position: absolute;
    z-index: 100;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .cover {
        width: 500px;
        height: 500px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      flex: 1;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .songer {
        margin: 10px 0;
      }
      .title,
      .songer {
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
      .lyrics {
        height: 400px;
        width: 80%;
        overflow-y: scroll;
        text-align: center;
        font-size: 25px;
        &::-webkit-scrollbar {
          display: none;
        }
        .islyrics {
          color: #8e44ad;
          font-size: 40px;
        }
        li {
          overflow: hidden;
          height: 52px;
          line-height: 52px;
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>
