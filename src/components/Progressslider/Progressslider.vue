<template>
  <div class="progressslider-wrapper" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
       @touchcancel="handleTouchEnd">
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
      },
      disabled: false
    };
  },
  watch: {
    mwidth(val) {
      this.mymwidth = val;
      this.wStyle.width = val + '%';
      this.lStyle.left = val + '%';
    }
  },
  methods: {
    handleTouchStart(e) {
      if (this.disabled) return;
      this.setValue(e.touches[0]);
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchup', this.handleTouchEnd);
      document.addEventListener('touchend', this.handleTouchEnd);
      document.addEventListener('touchcancel', this.handleTouchEnd);

      e.preventDefault();
    },
    handleTouchEnd(e) {
      if (this.disabled) return;
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchup', this.handleTouchEnd);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('touchcancel', this.handleTouchEnd);
    },
    handleTouchMove (e) {
      this.setValue(e.touches[0]);
    },
    setValue(e) {
      let value = (e.clientX - this.$el.getBoundingClientRect().left) / this.$el.offsetWidth * 100;
      value = parseFloat(value.toFixed(5));
      console.log(value);
      if (value > 100) {
        value = 100;
      } else if (value < 0) {
        value = 0;
      }
      this.mymwidth = value;
      this.$emit('change', value);
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
