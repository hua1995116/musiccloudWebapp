<template>
  <div id="app">
    <header>
      <musicsearch v-on:musicsearch="showsong" v-on:openmusicsong="showsong"></musicsearch>
      <ul>
        <li class="head-li" @click="move('/')">个性推荐</li>
        <li class="head-li" @click="move('/music')">歌单</li>
        <li class="head-li" @click="move('/station')">主播电台</li>
        <li class="head-li" @click="move('/rank')">排行榜</li>
      </ul>
      <div class="bar" :class="Classmove"></div>
    </header>
    <router-view ref="menu"></router-view>
  </div>
</template>

<script>
import musicsearch from './components/musicsearch/musicsearch';
export default {
  data() {
    return {
      Classmove: 'classmove0',
      show: true
    };
  },
  methods: {
    showsong(item) {
      console.log(11);
      this.$refs.menu.show(item);
    },
    move: function (val) {
      console.log(val);
      if (val === '/') {
        this.Classmove = 'classmove0';
        this.$router.push({ path: val });
      } else if (val === '/music') {
        this.Classmove = 'classmove1';
        this.$router.push({ path: val });
      } else if (val === '/station') {
        this.Classmove = 'classmove2';
        this.$router.push({ path: val });
      } else {
        this.Classmove = 'classmove3';
        this.$router.push({ path: val });
      }
    }
  },
  components: {
    musicsearch
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  header
    ul
      display: flex
      .head-li
        flex:1
        display: inline-block
        box-sizing: border-box
        width: 100px
        height:40px
        font-size: 14px
        text-align: center
        line-height: 40px
        background: #f8f8f9
        color: #333
        &.active
          color:#FF0200
      .head-li:nth-child(4)
        border-right:0
    .bar
      width: 25%
      height: 2px
      background: #FF0200
      transition: all 0.375s
      &.classmove0
        transform: translate3d(0,0,0)
      &.classmove1
        transform: translate3d(100%,0,0)
      &.classmove2
        transform: translate3d(200%,0,0)
      &.classmove3
        transform: translate3d(300%,0,0)

</style>
