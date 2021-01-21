<template>
  <div id="zhuanti">
    <div v-for="(item, index) in data" :key="index">
      <van-image :src="item.scene_pic_url" id="img" fit="cover" />
      <div id="text">
        <div id="text1">{{ item.title }}</div>
        <div id="text2">{{ item.subtitle }}</div>
        <div id="text3">{{ item.price_info }}元起</div>
      </div>
    </div>
    <div id="mod"></div>

    <!-- 底部导航 -->
    <tab-btn></tab-btn>
  </div>
</template>




<script>
import tabBtn from "../views/tabBtn";
import api from "../assets/config/api";
import axios from "axios";

export default {
  data: function () {
    return {
      searchData: "",
      data: {},
    };
  },
  method: {},
  computed: {},
  // 组件
  components: {
    tabBtn,
  },
  // 挂载时获取
  async mounted() {
    let res = await axios.get(api.TopicList);
    console.log(res.data.data.data);
    this.data = res.data.data.data;
    let arr = [];
    this.data.forEach((item) => {
      arr.push(item.id)
      console.log(arr);
    });
    let ree = await axios.get(api.GoodsDetail, { params: 299});
    console.log(ree);
  },
};
</script>


<style lang="less">
#zhuanti {
  #img {
    width: 375px;
    height: 200px;
  }
  #text {
    padding: 10px 0;
    text-align: center;
    #text1 {
      font-size: 17px;
      font-weight: 900;
    }
    #text2 {
      font-size: 13px;
      font-weight: lighter;
      // 溢出裁剪
      overflow: hidden;
      // 不允许换行
      white-space: nowrap;
      // 溢出的由省略号替代
      text-overflow: ellipsis;
    }
    #text3 {
      color: red;
    }
  }
  #mod {
    height: 50px;
  }
}
</style>