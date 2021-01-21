<template>
  <div id="flxq">
    <!-- 顶部滚动标签页 -->
    <van-tabs v-model="active" id="index">
      <van-tab
        v-for="(item, index) in subCategoryList"
        :key="index"
        :title="item.name"
      >
        <div id="mod1">
          <div id="text">
            <div id="text1">
              {{ item.name }}
            </div>
            <div id="text2">
              {{ item.front_name }}
            </div>
          </div>
        </div>

        <van-grid :border="false" :column-num="2" id="mod2">
          <van-grid-item v-for="(item, index) in list" :key="index" :to="'/xiangqing/'+item.id">
            <van-image :src="item.list_pic_url" />
            <div id="text3">
              {{ item.name }}
            </div>
            <div id="text4">¥{{ item.retail_price }}</div>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import axios from "axios";
import api from "../assets/config/api";
export default {
  props: ["id"],
  data: function () {
    return {
      subCategoryList: [],
      active: 0,
      list: [],
    };
  },
  async created() {
    // console.log(this.id);
    let id = this.id;

    let arr = await axios.get(api.GoodsCategory, { params: { id } });
    this.subCategoryList = arr.data.data.brotherCategory;
    // console.log(arr.data.data.brotherCategory);
    // if (id == this.subCategoryList[0].id) {
    //   this.active = 0;
    // } else if (id == this.subCategoryList[1].id) {
    //   this.active = 1;
    // }
    for (let i = 0; i < 10; i++) {
      if (id == this.subCategoryList[i].id) {
        this.active = i;
        // console.log(i);
      } 
    }

    let id1 = this.subCategoryList[this.active].id;
    let page = 1;
    let size = 20;
    let rsc = await axios.get(api.GoodsList, {
      params: { categoryId: id1, page: page, size: size },
    });
    this.list = rsc.data.data.data;
  },
  watch: {
    active: async function () {
      let id = this.subCategoryList[this.active].id;
      //   console.log(this.subCategoryList[this.active].id);
      let page = 1;
      let size = 20;
      let rsc = await axios.get(api.GoodsList, {
        params: { categoryId: id, page: page, size: size },
      });
      // console.log(rsc);
      this.list = rsc.data.data.data;
      // console.log(rsc.data.data.data);
      //   let rss = await axios.get(`${api.GoodsList}?categoryId=${id}&page=${page}&size=20`);
      //   console.log(rss);
    },
  },
};
</script>


<style lang="less" scoped>
#flxq {
  #index{
    margin-top: 50px;
  }
  #mod1 {
    background: rgb(218, 214, 214);
    height: 100px;
    text-align: center;
    #text {
      padding: 25px;
      #text1 {
        font-size: 20px;
        font-weight: 900;
      }
    }
  }
  #mod2 {
    #text3 {
      width: 90%;
      // 溢出裁剪
      overflow: hidden;
      // 不允许换行
      white-space: nowrap;
    }
    #text4 {
      color: red;
    }
  }
  .van-grid-item {
    width: 50%;
  }
}
</style>