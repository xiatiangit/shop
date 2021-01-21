<template>
  <div id="fenlei">
    <!-- 搜索框 -->
    <van-search
      input-align="center"
      v-model="searchData"
      placeholder="商品搜索共239款好物"
    />

    <!-- 分类模块 -->
    <van-tree-select
      height="calc(100vh - 164px)"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="change"
    >
      <template #content>
        <img :src="banner" id="img">
        <van-grid :column-num="3" id="mod">
          <van-grid-item
            v-for="(item, index) in subCategoryList"
            :key="index"
            :icon="item.wap_banner_url"
            :text="item.name"
            :to = "'/flxq/'+item.id"
          />
        </van-grid>
      </template>
    </van-tree-select>

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
      data: {},
      searchData: "",
      active: 0,
      subCategoryList: [],
      banner:''
    };
  },
  methods: {
    change: function (index) {
      this.active = index;
    },
  },
  watch: {
    active: async function () {
      // console.log(this.data);
      if (this.data.categoryList) {
        // console.log(this.data.categoryList[this.active].id);
        let id = this.data.categoryList[this.active].id;
        // console.log(id);
        let res = await axios.get(api.CatalogCurrent, { params: { id } });
        // console.log(res);
        this.subCategoryList = res.data.data.currentCategory.subCategoryList;
        this.banner = this.data.categoryList[this.active].img_url
        // console.log(res.data.data.currentCategory.subCategoryList);
      } else {
        this.subCategoryList = [];
      }
    },
  },
  computed: {
    items: function () {
      if (this.data.categoryList) {
        let arr = [];
        this.data.categoryList.forEach((item, index) => {
          item.text = item.name;
          arr.push(item);
        });
        return arr;
      } else {
        return [];
      }
    },
  },
  components: {
    tabBtn,
  },
  async created() {
    let res = await axios.get(api.CatalogList);
    // console.log(res.data.data);
    this.data = res.data.data;

    let id = this.data.categoryList[this.active].id;
    let ree = await axios.get(api.CatalogCurrent, { params: { id } });
    // console.log(res);
    this.subCategoryList = res.data.data.currentCategory.subCategoryList;


    let bn = this.data.categoryList[this.active].img_url
    this.banner = bn
  },
};
</script>


<style lang="less" scoped>
#fenlei {
  margin-top: 50px;
  .van-tree-select__nav {
    text-align: center;
  }
  #img{
    width: 100%;
  }
}
</style>