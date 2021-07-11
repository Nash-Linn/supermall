<template>
    <swiper class="detail-swiper" >
      <swiper-item v-for="(item, index) in topImages" :key="index" >
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>

import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  data () {
    return {};
  },

  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },

  components: {
    Swiper,
    SwiperItem
  },

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>

.detail-swiper{
  height: 300px;
  overflow: hidden;
}

.detail-swiper img{
  width: 100%;
}

</style>