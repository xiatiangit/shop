<template>
  <div id="login">
    <div id="box">
      <div id="title">请登录</div>
      <div id="box2">
        <div class="box1">
          <div class="text">账号</div>
          <input type="text" class="input" ref="inp" />
        </div>
        <div class="box1">
          <div class="text">密码</div>
          <input type="password" class="input" ref="inpu" />
        </div>
      </div>
      <button id="btn" @click="show">登陆</button>
    </div>

    <!-- 加载 -->
    <div id="load" v-show="xianshi">
      <van-loading color="#1989fa" id="log" size="40" />
      <div id="text0">加载中..</div>
    </div>
  </div>
</template>


<script>
export default {
  data: function () {
    return {
      xianshi: false,
    };
  },
  methods:{
      show:function(){
          this.xianshi = true
          if(this.xianshi = true){
              this.$refs.inp.style.pointerEvents = "none";
              this.$refs.inpu.style.pointerEvents = "none";
          }
      }
  }
};
</script>


<style lang="less" scoped>
#login {
  margin-top: 50px;
  height: 100vh;
  background: pink;
  #box {
    width: 300px;
    height: 300px;
    background: skyblue;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #title {
      font-size: 30px;
      color: #fff;
      text-align: center;
      margin-top: 35px;
    }
    #box2 {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      .box1 {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .input {
          height: 30px;
          border-radius: 10px;
          margin-left: 5px;
        }
      }
    }
    #btn {
      width: 70px;
      height: 35px;
      position: absolute;
      left: 50%;
      bottom: 40px;
      transform: translateX(-50%);
      border-radius: 20px;
    }
  }
  #load {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: rgba(211, 208, 208, 0.5);
    border-radius: 20px;
    #log {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    #text0 {
      position: absolute;
      left: 35%;
      top: 70%;
    }
  }
}
</style>