<template>
  <!-- ref/children -->
  <!-- 
      ref 如果是绑定在组件中的,那么通过this.$refs.refname 获取到的是一个组件对象 
      ref 如果是绑定在普通的元素中,那么通过this.$refs.refname 获取到的就是一个元素对象
    -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import PullDown from "@better-scroll/pull-down";
import PullUp from "@better-scroll/pull-up";

BScroll.use(PullDown);
BScroll.use(PullUp);

export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
    // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
    // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
    // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 最好不用document.querySelector('.wrapper')  因为可能获取到别的wrapper

    //因为加载的图片过多   this.$nextTick  失效
    // this.$nextTick(() => {
    //         if (!this.scroll) {
    //           this.scroll = new BScroll(this.$refs.wrapper, {
    //              scrollY: true,
    //           })
    //         } else {
    //           this.scroll.refresh()
    //         }
    //       })

    // 使用 document.readyState === "complete"  确保文档加载完成

    // let timer = null;
    // timer = setInterval(() => {
    //   //判断document是否全部加载完毕
    //   if (document.readyState === "complete") {
    //     if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.wrapper, {
    //         scrollY: true,
    //         click:true,
    //         probeType:this.probeType,
    //         pullUpLoad:this.pullUpLoad
    //       });

    //       //2.监听滚动的位置
    //       this.scroll.on('scroll',(position)=>{
    //         // console.log(position);
    //       this.$emit('scroll',position)
    //       })

    //       //3.监听上拉事件
    //       this.scroll.on('pullingUp',()=>{
    //       this.$emit('pullingUp');
    //       this.scroll.finishPullUp();
    //       })
    //     } else {
    //       this.scroll.refresh();
    //     }
    //     window.clearInterval(timer);
    //   }
    // }, 500);

    //使用总线bus
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      mouseWheel: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
 
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    //3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },

  components: {},

  computed: {},

  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style lang='css' scoped>
</style>