<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index"  :goods-item='item'>
    </goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  data () { 
    return {};
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },

  components: {
    GoodsListItem
  },

  computed: {},

  methods: {}
}
</script>
<style lang='css' scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    
  }

</style>