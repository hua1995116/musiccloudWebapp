<template>
  <transition-group name="fade" >
    <div class="musicsong-wrapper" v-show="showFlag" key="musicsong">
      <div class="scroll-warpper">
        <div class="menu-title border-1px">
          <div class="back" @click="hide">
            <img src="../../../static/img/back.png" alt="" width=24 height=24>
          </div>
          <div class="title-name">
            {{song.name}}-
            {{songname}}
          </div>
          <div class="setting" >
            <img src="../../../static/img/list-1.png" alt="" width=24 height=24>
          </div>
        </div>
        <div class="rotate">
          <div class="rotate-img" :class="{'cd-paly':!playing}">
            <img src="../../../static/img/stick_bg.png" alt="" height=140 >
          </div>
          <div class="rotate-mid" :class="{'cd-rotate':!playing}">
            <img :src="albumPic + '?param=500y500'" alt="">
          </div>
        </div>
        <div class="bottom">
          <div class="menu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="progress">
            <progressslider :mwidth="mwidth" @change="setTime"></progressslider>
            <div class="time">
              <span id="cur">{{time.start}}</span>
              <span id="total">{{time.end}}</span>
            </div>
          </div>
          <div class="action">
            <span></span>
            <span @click="pre"></span>
            <span @click="togglePlay" :class="{'isplay':playing,'noplay':!playing}"></span>
            <span @click="next"></span>
            <span @click="showlist"></span>
          </div>
        </div>
      </div>
      <div class="bg">
        <img :src="albumPic + '?param=500y500'" alt="" width="100%" height="100%">
      </div>
      <div class="">
        <audio :src="audiourl" id="audioPlay" @canplay="canPlaySong"
               @timeupdate="updateTime"
        ></audio>
      </div>
      <div class="tip" v-show="tipshow">
        <div class="content">
          歌曲加载错误！
        </div>
        <div class="fun" @click="tipshow = !tipshow">
          确定
        </div>
      </div>
      <div class="list">
        <transition name="fade">
          <div class="list-bg" @click="hidelist"  v-show="listshow"></div>
        </transition >
        <transition name="fold">
          <div class="list-song" v-show="listshow">
            <div class="title" @click="nulllist">清空</div>
            <div ref="songlistWrapper" class="ul-song">
              <ul>
                <li v-for="(item,index) in list" class="li border-1px" @click="playsong(index,item)">
                  <div :class="{'active':item.songname === song.songname}">
                    <span>{{index}}</span>
                    <span>{{item.songname}}</span>
                    <span>{{item.name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition-group>
</template>

<script type="text/ecmascript-6">
  import Progressslider from '../Progressslider/Progressslider.vue';
  import {changeTime} from '../../common/js/changeTime';
  import BScroll from 'better-scroll';
  import api from '../../api';
  export default{
    data() {
      return {
        index: -1,
        listshow: false,
        showFlag: false,
        playing: true,
        tipshow: false,
        mwidth: 0,
        time: {
          start: '00:00',
          end: '00:00'
        },
        song: {},
        audiourl: '',
        albumPic: '../../../static/img/placeholder_disk_play_song.png',
        songname: '暂无歌曲',
        list: []
      };
    },
    created() {
      this.$nextTick(() => {
        this.canPlaySong();
      });
    },
    methods: {
      pre() {
        if (this.index > 0) {
          console.log('pre');
          this.index--;
          this.item = this.list[this.index];
          this.playsong(this.index, this.item);
        }
      },
      next() {
        if (this.index < this.list.length - 1) {
          console.log('next');
          this.index++;
          this.item = this.list[this.index];
          this.playsong(this.index, this.item);
        }
      },
      _initScroll() {
        if (!this.songlistScroll) {
          this.songlistScroll = new BScroll(this.$refs.songlistWrapper, {
            click: true
          });
        } else {
          this.songlistScroll.refresh();
        }
      },
      nulllist() {
        this.list.splice(0, this.list.length);
        this.hide();
      },
      hidelist() {
        this.listshow = false;
      },
      showlist() {
        this.listshow = true;
      },
      show(item) {
//      this.albumPic = item.al.picUrl;
        this.showFlag = true;
        if (item) {
          let index = 0;
          var thisindex = 0;
          for (let i in this.list) {
            if (this.list[i].songname === item.songname) {
              thisindex = i;
              index++;
            }
          }
          if (index === 0) {
            this.list.push(item);
            this.$nextTick(() => {
              this._initScroll();
            });
            this.playsong(this.list.length - 1, item);
          } else {
            this.playsong(thisindex, item);
          }
        }
      },
      playsong(index, item) {
        console.log(index);
        this.hidelist();
        this.index = index;
        this.song = item;
        this.albumPic = item.migUrl;
        this.songname = item.songname;
        this.name = item.name;
        if (item.audiosrc !== undefined) {
          this.audiourl = item.audiosrc;
          this.$nextTick(() => {
            this.canPlaySong();
          });
        } else {
          this.get(item);
          this.canPlaySong();
        }
      },
      canPlaySong() {
        document.getElementById('audioPlay').play();
        this.playing = false;
      },
      get(item) {
        this.$http.get(api.getSong(item.id)).then((res) => {
          console.log('加载成功');
          if (res.data.data[0].url === null) {
            console.log('歌曲加载错误');
          } else {
            this.audiourl = res.data.data[0].url;
            this.canPlaySong();
            this.$nextTick(() => {
              this.canPlaySong();
            });
          }
        }).catch((error) => {
          console.log('加载歌曲信息出错:' + error);
        });
      },
      hide() {
        this.showFlag = false;
      },
      togglePlay() {
        if (this.playing === false) {
          document.getElementById('audioPlay').pause();
          this.playing = true;
        } else {
          document.getElementById('audioPlay').play();
          this.playing = false;
        }
      },
      updateTime() {
        var myaudio = document.getElementById('audioPlay');
        var time = parseInt(myaudio.currentTime);
        var timelength = myaudio.duration;
        if (isNaN(timelength)) {
          this.tipshow = true;
        } else {
          this.tipshow = false;
          this.mwidth = time / timelength * 100;
          this.time.start = changeTime(time);
          this.time.end = changeTime(timelength);
          if (timelength === time) {
            this.togglePlay();
          }
        }
      },
      setTime(value) {
        var myaudio = document.getElementById('audioPlay');
        var timelength = myaudio.duration;
        myaudio.currentTime = timelength * value / 100;
      }
    },
    components: {
      Progressslider
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .musicsong-wrapper
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    min-height: 667px
    z-index:100
    background:#ceacac
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.2s linear
      transform translate3d(0, 0, 0)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      transform translate3d(100%, 0, 0)
    .menu-title
      display :flex
      border-1px(#ddd)
      .back
        flex-basis:40px
        display :inline-block
        img
          margin-top:12px
          margin-left: 12px
      .title-name
        flex :1
        display :inline-block
        height 48px
        line-height:48px
        text-align center
        font-size:18px
        color:#fff
      .setting
        flex-basis:40px
        display :inline-block
        img
          margin-top:12px
    .rotate
      .rotate-img
        position:relative
        width: 94px
        margin:0 auto;
        padding-left:56px
        z-index:2
        img
          transition:all 0.3s
          transform-origin: left top;
          -webkit-transform: rotate(-20deg);
          -moz-transform: rotate(-20deg);
          -ms-transform: rotate(-20deg);
          transform: rotate(-20deg);
        &.cd-paly
          img
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
      .rotate-mid
        position:relative
        width:290px
        height :290px
        margin:-60px auto 0
        background:url(../../../static/img/cd_wrapper.png) no-repeat
        background-size:290px 290px
        background-position:center center
        z-index:1
        img
          display:block
          position:absolute
          width:195px
          height:195px
          left:50%
          top:50%
          margin-top: -97px
          margin-left:-97px
          border-radius:100%
    .bottom
      width:100%
      margin-top:60px
      .menu
        display:flex
        margin-left:30px
        margin-right:30px
        span
          flex:1
          display:inline-block
          height:60px
          background-repeat:no-repeat
          background-position:center center
        span:nth-child(1)
          background-image:url(../../../static/img/collect.png)
          background-size:30px 30px
        span:nth-child(2)
          background-image:url(../../../static/img/down.png)
          background-size:24px 24px
        span:nth-child(3)
          background-image:url(../../../static/img/chat.png)
          background-size:24px 24px
        span:nth-child(4)
          background-image:url(../../../static/img/morew.png)
          background-size:24px 24px
      .progress
        width:60%
        padding-left:12%
        padding-right:12%
        margin:0 auto
        position:relative
        .time
          span
            position: absolute;
            top: 25%;
            font-size:12px
            opacity: .5;
            color: #ffffff
          #cur
            left:0
          #total
            right:0
      .action
        display:flex
        span
          flex:1
          display:inline-block
          height:60px
          background-repeat:no-repeat
          background-position:center center
          &.isplay
            background-image:url(../../../static/img/play.png)
            background-size:60px 60px
          &.noplay
            background-image:url(../../../static/img/pause.png)
            background-size:60px 60px
        span:nth-child(1)
          background-image:url(../../../static/img/seq.png)
          background-size:60px 60px
        span:nth-child(2)
          background-size:34px 34px
          background-image:url(../../../static/img/pre_l.png)
        span:nth-child(4)
          background-image:url(../../../static/img/pre_r.png)
          background-size:34px 34px
        span:nth-child(5)
          background-image:url(../../../static/img/list.png)
          background-size:60px 60px
  .bg
    position absolute
    top: 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(60px)
    img
      min-height:667px
  .tip
    position:absolute
    width:200px
    height 100px
    left:50%
    top:50%
    margin-left: -100px
    margin-top: -50px
    background:#fff
    z-index:10000
    border-radius: 5px
    .content
      border-1px(#ddd)
      color:#333
      height: 70px
      text-align center
      line-height:70px
      font-size:14px
    .fun
      text-align:center
      color:#333
      line-height:30px
      font-size:14px
  .list
    .list-bg
      position:absolute
      left :0
      top:0
      width:100%
      height:100%
      z-index:200
      background:rgba(0,0,0,0.4)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.3s linear
        opacity: 1
      &.fade-enter, &.fade-leave-active
        opacity: 0
    .list-song
      width:100%
      position:fixed
      left:0
      bottom:0
      z-index:201
      background:rgba(255,255,255,0.8)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s linear
        opacity: 1
        transform: translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 100%, 0)
        opacity: 0
      .title
        width:90%
        margin:0 auto
        height:50px
        line-height:50px
      .ul-song
        max-height:300px
        overflow: hidden
        li
          padding-left: 10px
          margin:0 auto
          height:50px
          line-height:50px
          .active
            span
              color: #d33a31
          span
            color: #333
  @-webkit-keyframes rotating{
    0% {
      -webkit-transform:rotate(0deg)
    }
    100% {
      -webkit-transform:rotate(360deg)
    }
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .cd-rotate
    -webkit-animation: rotating 10s  linear .3s infinite
    animation: rotating 10s linear .3s infinite
</style>
