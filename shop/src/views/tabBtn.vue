<template>
  <div>
    <van-tabbar v-model="active" id="tabBtn">
      <van-tabbar-item icon="home-o" to='/'>主页</van-tabbar-item>
      <van-tabbar-item icon="gem-o" to="/zhuanti">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to='/fenlei'>分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to='/shopcar'>购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to='/mySelf'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      active: 0,
    };
  },
  // 挂载前
  mounted() {
    switch (this.$route.path) {
      case "/":
        this.active = 0;
        break;
      case "/zhuanti":
        this.active = 1;
        break;
      case "/fenlei":
        this.active = 2;
        break;
      case "/shopCar":
        this.active = 3;
        break;
      case '/mySelf':
        this.active = 4;
        break;
    }
  },
};
</script>




<style lang="less">
</style>