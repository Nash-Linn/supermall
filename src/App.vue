<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"></main-tab-bar>

    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    
  </div>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>
<style>
@import "assets/css/base.css";
</style>
