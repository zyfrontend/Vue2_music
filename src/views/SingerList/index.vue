<template>
  <div>
    <el-slider v-model="value1" :show-tooltip="false"></el-slider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 20,
    }
  },
}
</script>
