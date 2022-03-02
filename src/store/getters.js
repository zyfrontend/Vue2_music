const getters = {
  banners: state => state.Discover.banners,
  recommendMusicList: state => state.Discover.recommendMusicList,
  playListDetail: state => state.PlaylistDetail.playListDetail,
  currentMusicIndex: state => state.PlayBar.currentMusicIndex,
  playlist: state => state.PlayBar.playlist,
  currentDuration: state => state.PlayBar.currentDuration,
  currentMusicTotalDuration: state => state.PlayBar.currentMusicTotalDuration,
  currentMusicDetail: state => state.PlayBar.currentMusicDetail,
  currentPlaybackState: state => state.PlayBar.currentPlaybackState,
  currentMusicLyric: state => state.PlayBar.currentMusicLyric,
}
export default getters
