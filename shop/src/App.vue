<template>
  <div id="app">
    <div id="nav">
      <!-- 返回键 -->
      <van-nav-bar
        title="网易商城"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        id="top"
      />
    </div>
    <router-view />
  </div>
</template>


<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1);
      // console.log(this.$router);
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  #top{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
}
</style>
