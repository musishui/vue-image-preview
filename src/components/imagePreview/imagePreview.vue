<template>
  <div ref="imagepreview"
       class="preview-box"
       @mousewheel.prevent="mousewhell"
       @mousedown.prevent="moveStart">
    <img class="imagepreview"
         :style="styles"
         :src="imgList[currIndex]">
    <div class="toolbar">
      <span>{{currIndex+1}}/{{imgList.length}}</span>
      <span>{{loading?'loading...':''}}</span>
      <span class="action-icons">
        <span class="iconfont icon-nishizhenxuanzhuan"
              @click="rotateHandle(-90)"
              title="逆时针旋转"></span>
        <span class="iconfont icon-rotate"
              @click="rotateHandle(90)"
              title="顺时针旋转"></span>
        <span class="iconfont icon-fangda"
              @click="fullScreenHandle()"
              title="全屏"></span>
      </span>
    </div>
    <div class="navbar">
      <div class="leftnav"
           @click="navHandle(-1)">
        <span class="iconfont icon-left"></span>
      </div>
      <div class="rightnav"
           @click="navHandle(1)">
        <span class="iconfont icon-left"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { Promise } from 'q';
export default {
  props: {
    images: {
      type: Array,
      default: () => ([])
    },
    index: {
      type: Number,
      default: 0
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    width: {
      type: [Number, String],
      default: '100%'
    }
  },
  data () {
    return {
      scale: 1,
      rotate: 0,
      offsetX: 0,
      offsetY: 0,
      draged: false,
      dragX: 0,
      dragY: 0,
      currIndex: 0,
      loading: true
    }
  },
  computed: {
    styles () {
      return {
        transform: `scale(${this.scale}) rotate(${this.rotate}deg) `,
        top: `${this.offsetY}px`,
        left: `${this.offsetX}px`
      }
    },
    imgList () {
      return this.images || []
    },
    // currIndex: {
    //   get () { return this.index },
    //   set (val) { this.$emit('update:index', val) }
    // }

  },
  methods: {
    mousewhell ($event) {
      let deltaY = $event.deltaY
      this.scaleHandle(-deltaY / 1000)
    },
    scaleHandle (increment) {
      this.scale += increment
      if (this.scale < 0.1) {
        this.scale = 0.1
      } else if (this.scale > 5) {
        this.scale = 5
      }
    },
    rotateHandle (increment) {
      this.rotate = (this.rotate + increment) % 360
    },
    async navHandle (increment) {
      if (!this.imgList.length) return
      this.reset()
      this.setIndex(this.currIndex + increment)
      let index = this.currIndex
      this.loading = true
      await this.loadImage(this.imgList[index])
      if (this.currIndex === index) {
        this.loading = false
      }
    },
    moveStart ($event) {
      this.draged = true
      this.dragX = $event.clientX
      this.dragY = $event.clientY
    },
    moving ($event) {
      if (this.draged) {
        this.dragHandle($event)
      }
    },
    moveEnd ($event) {
      this.draged = false
    },
    dragHandle ($event) {
      this.offsetX += ($event.clientX - this.dragX)
      this.offsetY += ($event.clientY - this.dragY)
      this.dragX = $event.clientX
      this.dragY = $event.clientY
    },
    fullScreenHandle () {
      if (!document.fullscreen) {
        this.$refs.imagepreview.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    loadImage (url) {
      return new Promise((resolver, reject) => {
        let img = new Image()
        img.src = url
        img.onload = (ev) => {
          resolver(true)
        }
      })

    },
    reset () {
      this.scale = 1
      this.rotate = 0
      this.offsetX = 0
      this.offsetY = 0
    },
    setIndex (index) {
      this.currIndex = (index + this.imgList.length) % this.imgList.length
      this.$emit('update:index', this.currIndex)
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.moving)
    document.addEventListener('mouseup', this.moveEnd)
    this.navHandle(0)
  },
  destroyed () {
    document.removeEventListener('mousemove', this.moving)
    document.removeEventListener('mouseup', this.moveEnd)
  },
  watch: {
    images () {
      this.navHandle(0)
    },
    index () {
      this.currIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/font/iconfont.css";
.preview-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  color: #fff;

  .imagepreview {
    object-fit: contain;
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
  }
  .toolbar {
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .action-icons {
    .iconfont:not(:first-child) {
      margin-left: 5px;
    }
  }
  .leftnav,
  .rightnav {
    $height: 80px;
    position: absolute;
    top: calc(50% - #{$height / 2});
    height: $height;
    background: rgba(0, 0, 0, 0.3);
    line-height: $height;
    .icon-left {
      display: block;
      font-size: 36px;
      padding: 0 0.2em;
    }
  }
  .leftnav {
    left: 0;
  }
  .rightnav {
    right: 0;
    .icon-left {
      transform: rotate(180deg);
    }
  }
}
</style>
