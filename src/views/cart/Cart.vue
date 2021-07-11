<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>
          购物车({{length}})
        </div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 商品汇总 -->
    <cart-botton-bar></cart-botton-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childcomponents/CartList';
import CartBottonBar from './childcomponents/CartBottonBar';

import {mapGetters} from 'vuex';


export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CartBottonBar
  },
  data() {
    return {};
  },
  methods: {},
  computed:{
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }

    //两种语法  
    // ...mapGetters([
    //   'cartLength',
    //   'cartList'
    // ])

    //如果想给getter属性另取一个名字,使用对象形式
    ...mapGetters({
      length:'cartLength'
    })

  }
};
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;
  font-weight: 700;
}
</style>
