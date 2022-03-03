<template>
  <table class="demo-table">
    <tr>
      <th style="width: 40%">歌曲</th>
      <th style="width: 30%">歌手</th>
      <th style="width: 20%">专辑</th>
      <th style="width: 10%">时长</th>
    </tr>
    <tr
      class="tr-tbody"
      :class="currentMusicIndex === index ? 'isActive' : ''"
      v-for="(list, index) in tableData"
      :key="list.id"
      @dblclick="trClick(list)"
    >
      <td style="width: 40%">{{ list.name }}</td>
      <td style="width: 30%">{{ list.ar[0] ? list.ar[0].name : '' }}</td>
      <td style="width: 20%">{{ list.al ? list.al.name : '' }}</td>
      <td style="width: 10%">{{ list.dt }}</td>
    </tr>
    <div v-if="tableData.length <= 10">更多请登录</div>
  </table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['tableData'],
  computed: {
    ...mapGetters(['currentMusicIndex']),
  },
  methods: {
    trClick(list) {
      this.$store.commit('PlayBar/changeCurrentMusicId', list.id)
      this.$store.commit('PlayBar/changeCurrentMusicTotalDuration', list.dt)
      this.$store.commit('PlayBar/changePlayList', this.$props.tableData)
    },
  },
  watch: {
    '$store.state.PlayBar.currentMusicId': {
      handler: function (val) {
        const curr = this.$props.tableData.findIndex(item => item.id === val)
        this.$store.commit('PlayBar/changeCurrentMusicIndex', curr)
      },
      deep: true,
    },
  },
}
</script>
<style lang="less" scoped>
.demo-table {
  width: 100%;
  text-align: left;
  table-layout: fixed;
  .isActive {
    td {
      color: #8e44ad;
    }
  }
  th {
    font-size: 20px;
    color: #666666;
  }
  td {
    padding: 25px 0;
    font-size: 20px;
    color: white;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //用省略号显示
    white-space: nowrap; //不换行
  }
  .tr-tbody {
    padding: 0 20px;
    transition: all 0.4s;
    &:hover {
      background-color: #242425;
    }
  }
}
</style>
