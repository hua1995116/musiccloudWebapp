<template>
  <div class="progressslider-wrapper">
    <div class="progressslider-track"></div>
    <div class="progressslider-fill" :style="wStyle"></div>
    <div class="progressslider-thumb" :style="lStyle"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
    mwidth: {
      type: Number
    }
  },
  data() {
    return {
      mymwidth: this.mwidth,
      wStyle: {
        width: '0%'
      },
      lStyle: {
        left: '0%'
      }
    };
  },
  watch: {
    mwidth(val) {
      this.mymwidth = val;
      this.wStyle.width = val + '%';
      this.lStyle.left = val + '%';
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.progressslider-wrapper
  width: 100%
  position: relative
  height: 24px
  margin-bottom: 16px
  display: flex
  cursor: default
  outline: none
  .progressslider-track
    width:100%
    position: absolute
    height: 2px
    left: 0
    top: 50%
    margin-top: -1px
    background-color: #bdbdbd
  .progressslider-fill
    position: absolute
    height: 2px
    left: 0
    top: 50%
    margin-top: -1px
    background-color: #ce3d3e
  .progressslider-thumb
    position: absolute
    top: 50%
    width: 12px
    height: 12px
    background-color: #ce3d3e
    color: #ce3d3e
    border-radius: 50%
    -webkit-transform: translate(-50%,-50%)
    transform: translate(-50%,-50%)
    -webkit-transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1)
    transition: background .45s cubic-bezier(.23,1,.32,1),border-color .45s cubic-bezier(.23,1,.32,1),width .45s cubic-bezier(.23,1,.32,1),height .45s cubic-bezier(.23,1,.32,1)
    cursor: pointer
</style>
