<template>
  <div class="toast"  v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data () {
    return {
      message:'',
      isShow:false,
    };
  },
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }

  },
  components: {},

  computed: {},

  methods: {
    show(message,duration=2000){
      // duration = duration || 2000;
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);

    }
  }
}
</script>
<style lang='css' scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, .5);
  color:white;
  transform: translate(-50%,-50%);

  z-index: 999;
}
</style>