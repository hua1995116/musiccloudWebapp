<template>
  <div class="music-title clear">
    <div class="list-left">
      <img :src="info.src" alt="">
      <p class="recommend">{{info.content}}</p>
    </div>
    <div class="list-right">
      <p class="more">更多</p>
      <img src="../../../static/img/arrows_right.png" alt="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
    info: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .music-title
    margin-top: 14px
    margin-bottom: 8px
    img
      display: inline-block
      vertical-align:top
    p
      display: inline-block
      vertical-align:top
    .list-left
      margin-left: 2.5%
      float: left
      img
        height: 24px
      .recommend
        font-size:16px
        height :28px
        line-height: 28px
    .list-right
      margin-right: 2.5%
      float: right
      img
        margin-top: 6px
        height:16px
      .more
        display: inline-block
        height :28px
        line-height: 28px
        font-size:14px
        color: #9da79b
</style>
