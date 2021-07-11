<template>
  <div v-show="isshow" class="toast">{{ text }}</div>
</template>

<script>
import { toRefs, reactive } from "vue";
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    let state = reactive({
      text: props.text,
      isshow: true
    });
    let timeid = null;

    function show() {
      state.isshow = true;
      clearTimeout(timeid);
      timeid = setTimeout(() => {
        state.isshow = false;
      }, 3000);
    }
    show();
    return {
      ...toRefs(state),
      show
    };
  }
};
</script>

<style  scoped>
.toast {
  position: fixed;
  width: 360px;
  line-height: 60px;
  text-align: center;
  left: 50%;
  top: 100px;
  margin-left: -180px;
  color: #ffffff;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>

