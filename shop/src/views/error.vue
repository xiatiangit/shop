<template>
  <div id="error">
    <div id="box">
      <div id="text">
        <div id="text1">请先登录</div>
        <button id="btn" @click="toLogin">登陆</button>
      </div>
    </div>
  </div>
</template>




<script>
import axios from "axios";
import api from "../assets/config/api";
export default {
  data: function () {
    return {};
  },
  async created() {
    // let res = await axios.get(api.AuthLoginByWeixin)
    // console.log(res.data);
  },
  methods:{
      toLogin:function(){
          this.$router.push('/login')
      }
  }
};
</script>






<style lang="less" scoped>
#error {
  height: 100vh;
  margin-top: 50px;
  background: pink;
  #box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: rgba(177, 173, 173, 0.5);
    border-radius: 30px;
    #text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      #text1{
          font-size: 18px;
          color: #fff;
      }
      #btn{
          background: skyblue;
          width: 100px;
          height: 40px;
          margin-top: 25px;
          border-radius: 20px;
      }
    }
  }
}
</style>