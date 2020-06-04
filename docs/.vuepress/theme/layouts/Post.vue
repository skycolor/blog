<template>
  <div id="vuepress-theme-blog__post-layout">
    <article
      class="vuepress-blog-theme-content"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <header>
        <h1 class="post-title" itemprop="name headline">
          {{ $frontmatter.title }}
        </h1>
        <PostMeta
          :tags="$frontmatter.tags"
          :author="$frontmatter.author"
          :date="$frontmatter.date"
          :location="$frontmatter.location"
        />
      </header>
      <Content itemprop="articleBody" />
      <footer>
        <Newsletter v-if="$service.email.enabled" />
        <hr />
        <Comment />
      </footer>
    </article>
    <Toc />
    <canvas id="canvas" ></canvas>
  </div>
</template>

<script>
import Toc from '@theme/components/Toc.vue'
import PostMeta from '@theme/components/PostMeta.vue'
import { Comment } from '@vuepress/plugin-blog/lib/client/components'
import Circle from '../utils/strokeCircle.js'
export default {
  data() {
    return {
      timer: null,
      ctx: null,
      circleArr: []
    }
  },
  components: {
    Toc,
    PostMeta,
    Comment,
    Newsletter: () => import('@theme/components/Newsletter.vue'),
  },
  mounted() {
    let _this = this
    this.initCanvas()
    window.addEventListener("mousemove", _this.handleMousemove , false)
  },
  destroyed(){
    let _this = this
    if(this.timer){
      window.cancelAnimationFrame(this.timer)
    }
    window.removeEventListener("mousemove", _this.handleMousemove);
  },
  methods: {
    initCanvas(){
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      let canvas = document.getElementById("canvas");
      this.ctx = canvas.getContext("2d");
      let w = canvas.width = canvas.offsetWidth
      let h = canvas.height = canvas.offsetHeight
      let draw = _ => {
        this.ctx.clearRect(0, 0, w, h)
        for (let i = 0; i < this.circleArr.length; i++) {
          let item = this.circleArr[i]
          item.update()
          if(item.step <= 0 || item.r <= 0){
              for (var j = 0; j < this.circleArr.length; j++) {
                  if (this.circleArr[j] === item) {
                    this.circleArr.splice(j, 1)
                    break
                  }
              }
          } else {
            item.render()
          }
        }
        this.timer = requestAnimationFrame(draw)
      }
      draw()
    },
    handleMousemove(e){
      this.circleArr.push(new Circle(e.clientX, e.clientY, this.ctx)) 
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.vuepress-blog-theme-content
  @extend $wrapper
  font-size 16px
  letter-spacing 0px
  font-family PT Serif, Serif
  color $textColor
  position relative

  @media (min-width: $MQNarrow)
    box-shadow 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.07)

  .post-title
    padding-top 0

@media (max-width: $MQMobile)
  .vuepress-blog-theme-content
    padding-top 0

  .post-title
    margin-top 0

canvas
  position: fixed
  width: 100%
  height: 100%
  top: 0
  left: 0
  pointer-events:none
</style>
