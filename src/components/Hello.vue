<template>
  <div style="width: 100%;height: 100%;">
    <div class="hello-wrapper" ref="helloWrapper">
      <div class="hello">
        <div class="swipe-wrapper">
          <swipe class="my-swipe">
            <swipe-item class="slide1">
              <img src="http://ozt4jt8av.bkt.clouddn.com/1.png" alt="">
            </swipe-item>
            <swipe-item class="slide2">
              <img src="http://ozt4jt8av.bkt.clouddn.com/2.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="http://ozt4jt8av.bkt.clouddn.com/3.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="http://ozt4jt8av.bkt.clouddn.com/4.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="http://ozt4jt8av.bkt.clouddn.com/5.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="http://ozt4jt8av.bkt.clouddn.com/6.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="http://ozt4jt8av.bkt.clouddn.com/7.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="http://ozt4jt8av.bkt.clouddn.com/8.png" alt="">
            </swipe-item>
          </swipe>
        </div>
        <div class="cards border-1px">
          <div class="card-li">
            <div class="circle">
            </div>
            <p>私人FM</p>
          </div>
          <div class="card-li">
            <div class="circle">
              <span>20</span>
            </div>
            <p>每日歌曲推荐</p>
          </div>
          <div class="card-li">
            <div class="circle">
            </div>
            <p>云音乐热歌榜</p>
          </div>
        </div>
        <!--<div class="height">-->
        <!---->
        <!--</div>-->
        <div class="music-list">
          <musictitle :info="info" ></musictitle>
          <ul class="list-ul">
            <li v-for="item in music" @click="openmenuTotal(item)">
              <img v-lazy="item.coverImgUrl" alt=""/>
              <div class="item-content">
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <musicmenu ref="musicmenu" v-on:openmusicsong="show"></musicmenu>
    <Musicsong ref="musicsong"></Musicsong>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import BScroll from 'better-scroll';
  import Musictitle from './Musictitle/Musictitle.vue';
  import Musicmenu from './Musicmenu/Musicmenu.vue';
  import Musicsong from './Musicsong/Musicsong.vue';
//  import data from '../../data.json';
  import api from '../api';
  export default {
    name: 'hello',
    data() {
      return {
        music: {},
        info: {
          src: '../../../static/img/aei.png',
          content: '推荐歌单'
        }
      };
    },
    created() {
      this.get();
//      this.music = data.music;
    },
    methods: {
      get() {
        this.$http.get(api.getPlayListByWhere('全部', 'hot', 0, true, 9)).then((res) => {
          this.music = res.data.playlists;
          this.$nextTick(() => {
            this._initScroll();
          });
        });
      },
      _initScroll() {
        if (!this.helloScroll) {
          this.helloScroll = new BScroll(this.$refs.helloWrapper, {
            click: true
          });
        } else {
          this.helloScroll.refresh();
        }
      },
      openmenuTotal: function (item) {
        this.$refs.musicmenu.show();
        this.$refs.musicmenu.setmusiclist(item);
      },
      show: function (item) {
        this.$refs.musicsong.show(item);
      }
    },
    components: {
      Swipe,
      SwipeItem,
      Musictitle,
      Musicmenu,
      Musicsong
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl";
  img[lazy=error]
    transition: all 0.5s
    width: 100%
  img[lazy=loading]
    transition: all 0.5s
    width: 100%
  img[lazy=loaded]
    transition: all 0.5s
    width: 100%
    animation: fade 0.5s
  @keyframes fade
    0%
      opacity: 0
    100%
      opacity: 1
  .hello-wrapper
    width: 100%
    position: absolute
    top:87px
    bottom:0
    overflow: hidden
    background:#fff
    .my-swipe
      height: 139px
      color: #fff
      font-size: 30px
      text-align: center
      img
        width: 100%
    .cards
      border-1px(#ddd)
      .card-li
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-top: 10px
        margin-bottom: 10px
        .circle
          position: relative;
          width: 58%
          margin: 0 auto
          height: 0
          padding-top: 58%
          border-radius: 50%
          border: 1px solid #d33a31
          span
            position: absolute
            left: 50%
            top:50%
            margin-left: -15px
            margin-top: -15px
            width: 30px
            height: 30px
            line-height: 30px
            text-align: center
            font-size: 20px
            color: #d33a31
        p
          color: #333
          font-size: 10px
          text-align: center
          margin-top: 5px
      .card-li:nth-child(1)
        .circle
          background: url(../assets/FM.png) no-repeat
          background-size:50px 50px
          background-position: center
      .card-li:nth-child(3)
        .circle
          background: url(../assets/ph.png) no-repeat
          background-size:50px 50px
          background-position: center



    .music-list
      .list-ul li
        /*float: left;*/
        min-height: 154px
        display: inline-block
        width: 30%
        margin-left: 2.5%
        margin-bottom: 2.5%
        box-sizing: border-box
        vertical-align: top
        img
          width: 100%
        .item-content
          height: 38px
          word-wrap:break-word
          overflow: hidden
          display: -webkit-box
          text-overflow:ellipsis
          -webkit-line-clamp:2
          -webkit-box-orient: vertical
          font-size: 12px
          color:#333
          line-height: 1.5
          letter-spacing: 1px
</style>
