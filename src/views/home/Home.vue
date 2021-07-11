<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center> 购物街 </template></nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      >
      </tab-control>
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
      </tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 组件不能直接设置点击事件 要增加使用 修饰符 .native  @click.native -->
    <back-top
      class="back-top"
      @click.native="backClick"
      v-show="isShowBackTop"
    ></back-top>
  </div>
</template>
<script>
//子组件
import HomeSwiper from "./childcomponents/HomeSwiper";
import RecommendView from "./childcomponents/RecommendView";
import FeatureView from "./childcomponents/FeatureView.vue";

//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";
import Scroll from "components/common/scroll/Scroll";

//方法 数据
import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin, backTopMixin} from 'common/mixin';

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    GoodsListItem,
    Scroll,
    
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
    };
  },
  mixins:[
    itemListenerMixin,
    backTopMixin,
  ],
  created() {
    //1.请求多个数据 轮播图和推荐导航
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // //监听item中图片加载完成
    // //防抖
    // const refresh = debounce(this.$refs.scroll.refresh, 100);

    // //对监听的事件进行保存
    // this.itemImgListener = () => {
    //   // this.$refs.scroll.refresh();  使用防抖替代
    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);

    //  因为重复的代码  最终方案使用mixins混入解决监听
  },
  methods: {
    /*
      事件监听相关的方法
    */
    //切换 流行 新款 精选
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //返回顶部
    //写入混入 mixin
    // backClick() {
    //   // 可以直接用this.$refs.scroll获取组件scroll  然后用.scroll获取其中的scroll对象 再使用scroll中的方法scrollTo
    //   /*
    //     scrollTo(x, y, time, easing, extraTransform)
    //       参数：
    //       {number} x 横轴坐标（单位 px）
    //       {number} y 纵轴坐标（单位 px）
    //       {number} time 滚动动画执行的时长（单位 ms）
    //       {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 packages/shared-utils/src/ease.ts 里的写法
    //       {Object} extraTransform，只有在你想要修改 CSS transform 的一些其他属性的时候，你才需要传入此参数
    //   */
    //   // this.$refs.scroll.scroll.scrollTo(0,0,500)

    //   //可以在scroll组件中封装方法 可以让Home页面更简洁
    //   this.$refs.scroll.scrollTo(0, 0);
    // },
    //监听滚动 
    contentScroll(position) {
      //是否显示返回顶部图标 backTop
      // if(-position.y < 1000){
      //   this.isShowBackTop = false
      // }else{
      //   this.isShowBackTop = true
      // }
      // 写入混入mixin中
      // this.isShowBackTop = (-position.y) > 1000;
       this.listenShowBackTop (position);

      //决定tabControl 是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    //获取 tabControl 的 tabOffsetTop
    swiperImageLoad() {
      //所有的组件都有一个属性 $el: 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
      网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //res => pop  前30条数据 page : 1
        //将数组res.data.list中的数据 添加到 this.goods[type].list数组中
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  destroyed() {
    
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存 Y 值
    this.saveY = this.$refs.scroll.getScrollY();
    //离开home页面 取消全局事件监听  itemImageLoad
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
};
</script>
<style lang='css' scoped>
#home {
  /* padding-top: 44px; */
  /* vh  ->  viewport height */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99; */
}

.wrapper {
  /* height:100%; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position:relative;
  z-index: 9;
}
</style>
