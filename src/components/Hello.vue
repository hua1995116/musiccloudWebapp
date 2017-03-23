<template>
  <div>
    <div class="hello-wrapper" ref="helloWrapper">
      <div class="hello">
        <div class="swipe-wrapper">
          <swipe class="my-swipe">
            <swipe-item class="slide1">
              <img src="../assets/1.png" alt="">
            </swipe-item>
            <swipe-item class="slide2">
              <img src="../assets/2.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/3.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/4.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/5.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/6.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/7.png" alt="">
            </swipe-item>
            <swipe-item class="slide3">
              <img src="../assets/8.png" alt="">
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
              <img v-lazy="item.src" alt=""/>
              <div class="item-content">
                {{item.desc}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <musicmenu ref="musicmenu"></musicmenu>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe';
  import BScroll from 'better-scroll';
  import Musictitle from './Musictitle/Musictitle.vue';
  import Musicmenu from './Musicmenu/Musicmenu.vue';
  import data from '../../data.json';
  export default {
    name: 'hello',
    data() {
      return {
        music: {},
        info: {
          src: '../../../static/img/aei.png',
          content: '推荐歌单'
        },
        imgUrl: [
          {
            src: '../../static/musiclist/1.jpg',
            desc: '吉他|气疯的日子流撒飘飘心情'
          },
          {
            src: '../../static/musiclist/2.jpg',
            desc: '超炫夜店音乐轰炸全场'
          },
          {
            src: '../../static/musiclist/3.jpg',
            desc: '神级中外歌曲互翻唱'
          },
          {
            src: '../../static/musiclist/4.jpg',
            desc: 'PopDanthology【全系列】'
          },
          {
            src: '../../static/musiclist/5.jpg',
            desc: '无前奏英文歌一秒沦陷'
          },
          {
            src: '../../static/musiclist/6.jpg',
            desc: '话语|那些温暖男生听起来总让人心疼'
          },
          {
            src: '../../static/musiclist/7.jpg',
            desc: '【环球唱片竞选】100首最佳运动BGM'
          },
          {
            src: '../../static/musiclist/8.jpg',
            desc: '精选50首出动神经的吉他弹唱'
          },
          {
            src: '../../static/musiclist/9.jpg',
            desc: '精选男女混声电子给你不一样的听觉盛宴'
          }
        ]
      };
    },
    created() {
      this.$nextTick(() => {
        this._initScroll();
      });
      this.music = data.music;
    },
    methods: {
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
      }
    },
    components: {
      Swipe,
      SwipeItem,
      Musictitle,
      Musicmenu
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl";
  img[lazy=error]
    transition: all 0.5s
    width: 100%
    height: 0
    padding-top: 100%
  img[lazy=loading]
    transition: all 0.5s
    width: 100%
    height: 0
    padding-top: 100%
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
    top:41px
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
