<template>
  <div id="base-list-layout">
    <div class="ui-posts" itemscope itemtype="http://schema.org/Blog">
      <article
        v-for="page in pages"
        :key="page.key"
        class="ui-post"
        itemprop="blogPost"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <meta itemprop="mainEntityOfPage" :content="page.path" />

        <header class="ui-post-title" itemprop="name headline">
          <NavLink :link="page.path">{{ page.title }}</NavLink>
        </header>

        <p class="ui-post-summary" itemprop="description">
          {{ page.frontmatter.summary || page.summary }}
          <!-- <Content :page-key="page.key" slot-key="intro"/>-->
        </p>

        <footer>
          <div
            v-if="page.frontmatter.author"
            class="ui-post-meta ui-post-author"
            itemprop="publisher author"
            itemtype="http://schema.org/Person"
            itemscope
          >
            <NavigationIcon />
            <span itemprop="name">{{ page.frontmatter.author }}</span>
            <span v-if="page.frontmatter.location" itemprop="address">
              &nbsp; in {{ page.frontmatter.location }}
            </span>
          </div>

          <div v-if="page.frontmatter.date" class="ui-post-meta ui-post-date">
            <ClockIcon />
            <time
              pubdate
              itemprop="datePublished"
              :datetime="page.frontmatter.date"
            >
              {{ resolvePostDate(page.frontmatter.date) }}
            </time>
          </div>

          <div
            v-if="page.frontmatter.tags"
            class="ui-post-meta ui-post-tag"
            itemprop="keywords"
          >
            <TagIcon />
            <router-link
              v-for="tag in resolvePostTags(page.frontmatter.tags)"
              :key="tag"
              :to="'/tag/' + tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </footer>
      </article>
    </div>

    <component
      :is="paginationComponent"
      v-if="$pagination.length > 1 && paginationComponent"
    ></component>
    <canvas id="canvas" ></canvas>
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from 'vue'
import dayjs from 'dayjs'
import { NavigationIcon, ClockIcon, TagIcon } from 'vue-feather-icons'
import {
  Pagination,
  SimplePagination,
} from '@vuepress/plugin-blog/lib/client/components'
import Circle from '../utils/circle.js'


export default {
  components: { NavigationIcon, ClockIcon, TagIcon },
  data() {
    return {
      paginationComponent: null,
      timer: null
    }
  },
  computed: {
    pages() {
      return this.$pagination.pages
    },
  },
  created() {
    this.paginationComponent = this.getPaginationComponent()
  },
  mounted() {
    console.log('---mounted-');
    
    this.initCanvas()
  },
  destroyed(){
    console.log('---destroyed-');
    if(this.timer){
      window.cancelAnimationFrame(this.timer)
    }
  },
  methods: {
    // 初始化canvas
    initCanvas(){
      //更新页面用requestAnimationFrame替代setTimeout
      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let circleNum
      let w = 0
      let h = 0
      let r = 0
      let circles = []
      let draw = _ => {
        ctx.clearRect(0, 0, w, h);
        if(circles.length == 0) return;
        for(let i = 0; i < circles.length; i++) {
          let circle = circles[i];
          if(circle.isDie) continue;
          circle.move();
          circle.drawCircle(ctx);
          for(let j = i + 1; j < circles.length; j++) {
            circle.drawLine(ctx, circles[j])
          }
        }
        this.timer = requestAnimationFrame(draw)
      }
      let init = _ => {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        r = Math.min(parseInt(window.innerWidth/120) , parseInt(window.innerHeight/120));
        circleNum =  parseInt(Math.min(window.innerWidth , window.innerHeight)/12)
        for(var i = 0; i < circleNum; i++) {
          circles.push(new Circle(Math.random() * w, Math.random() * h , r, w, h));
        }
        draw();
      }
      window.onresize = _ => {
        circles.splice(0, circles.length);
        setTimeout(function() {
          init();
        }, 50)
      }
      init()
    },
    getPaginationComponent() {
      const n = THEME_BLOG_PAGINATION_COMPONENT
      if (n === 'Pagination') {
        return Pagination
      }

      if (n === 'SimplePagination') {
        return SimplePagination
      }

      return Vue.component(n) || Pagination
    },

    resolvePostDate(date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || 'ddd MMM DD YYYY'
      )
    },

    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags
      return [tags]
    },
  },
}
</script>

<style lang="stylus">
.common-layout
  .content-wrapper
    padding-bottom 80px

.ui-post
  padding-bottom 25px
  margin-bottom 25px
  border-bottom 1px solid $borderColor

  &:last-child
    border-bottom 0px
    margin-bottom 0px

.ui-post-title
  font-family PT Serif, Serif
  font-size 28px
  border-bottom 0

  a
    cursor pointer
    color $darkTextColor
    transition all 0.2s
    text-decoration none

    &:hover
      text-decoration underline

.ui-post-summary
  font-size 14px
  color rgba($darkTextColor, 0.54)
  font-weight 200

.ui-post-meta
  display inline-flex
  align-items center
  font-size 12px
  line-height 12px

  &:not(:last-child)
    margin-bottom 3px
    margin-right 20px

  svg
    margin-right 5px
    width 14px
    height 14px

  @media (max-width: $MQMobile)
    display flex

    &:not(:last-child)
      margin-bottom 10px

.ui-post-author
  color rgba($darkTextColor, 0.84)
  font-weight 400

.ui-post-date
  color rgba($darkTextColor, 0.54)
  font-weight 200

.ui-post-tag
  color rgba($darkTextColor, 0.54)
  font-weight 200

  a
    color inherit
    font-weight 200
    text-decoration none
    margin-right 5px

    &:hover
      color $accentColor
canvas
  position: fixed
  width: 100%
  height: 100%
  top: 0
  left: 0
  pointer-events:none
</style>
