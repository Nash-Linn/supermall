<template>
  <div class="tab-bar-item" @click='itemClick'>
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style='activeStyle'><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  //添加属性
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  components: {},
  data() {
    return {
    };
  },
  computed:{
    isActive(){
      //判断活跃的route中的path是否包含 this.path的值
      // /home -> item(/home) = true
      // /home -> item(/category) = false
      // /home -> item(/cart) = false
      // /home -> item(/profile) = false
      /*
        indexOf(对应内容) == -1
        表示没有找到 对应内容
      
      */
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path)
    }
  },
};
</script>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: bottom;
}
.active {
  color: red;
}
</style>
