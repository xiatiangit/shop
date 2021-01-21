<template>
  <div id="mySelf">
    <div id="head">
      <div id="photo">
        <img :src="photo" />
      </div>
      <a href="#" id="name" @click="tologin">点击登录</a>
    </div>

    <!-- 菜单 -->
    <van-grid :column-num="3">
      <van-grid-item icon="records" text="我的订单" to="/error" />
      <van-grid-item icon="balance-pay" text="优惠券" to="/error" />
      <van-grid-item icon="like-o" text="我的收藏" to="/error" />
      <van-grid-item icon="cluster-o" text="我的足迹" to="/error" />
      <van-grid-item icon="home-o" text="地址管理" to="/error" />
      <van-grid-item icon="question-o" text="帮助中心" to="/error" />
    </van-grid>

    <!-- 底部导航栏 -->
    <tab-btn></tab-btn>
  </div>
</template>







<script>
import axios from "axios";
import api from "../assets/config/api";
import tabBtn from "../views/tabBtn";
export default {
  data: function () {
    return {
      photo:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=249589786,2941481629&fm=26&gp=0.jpg",
    };
  },
  methods: {
    tologin: function () {
      this.$router.push("/login");
    },
  },
  async created() {
    // let res = await axios.get(api.AuthLoginByWeixin)
    // console.log(res);
    // let ree = await axios.get(api.AddressList)
    // console.log(ree);
  },
  components: {
    tabBtn,
  },
};
</script>






<style lang="less" scoped>
#mySelf {
  margin-top: 50px;
  #head {
    width: 100%;
    height: 25vh;
    background: pink;
    display: flex;
    align-items: center;

    #photo {
      width: 90px;
      height: 90px;
      background: #fff;
      border: 1px solid red;
      border-radius: 50%;
      margin-left: 20px;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    #name {
      font-size: 25px;
      margin-left: 20px;
      color: #fff;
    }
  }
}
</style>