<template>
  <div id="xq">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" id="mod1">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <van-image height="60vh" fit="cover" :src="item.img_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 文字1 -->
    <div id="text">
      <div>30天无忧退货</div>
      <div>48小时急速退款</div>
      <div>满88元免邮费</div>
    </div>

    <!-- 文字2 -->
    <div id="word">
      <div id="word1">
        {{ info.name }}
      </div>
      <div id="word2">
        {{ info.goods_brief }}
      </div>
      <div id="word3">¥{{ info.retail_price }}</div>
    </div>

    <!-- 商品规格数量 -->
    <van-cell title="请选择规格数量" is-link />

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />

    <!-- 商品参数 -->
    <h3>商品参数</h3>
    <div class="mod2" v-for="(item, index) in attribute" :key="index">
      <div class="name">{{ item.name }}</div>
      <div class="value">{{ item.value }}</div>
    </div>

    <!-- 商品详情 -->
    <div id="mod3" v-html="info.goods_desc"></div>

    <!-- 底部商品导航 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="goodsCount"
        to="/shopcar"
      />
      <van-goods-action-icon icon="star-o" text="已收藏" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="tankuang"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>


<script>
import axios from "axios";
import api from "../assets/config/api";

let sku = {
  tree: [],
  list: [
    {
      id: 2259,
      "s-1": "1",
      "s-2": "4",
      price: 100,
      stock_num: 110,
    },
    {
      id: 2259,
      "s-1": "2",
      "s-2": "3",
      price: 100,
      stock_num: 110,
    },
  ],
  price: "1.00",
  stock_num: 227,
  collection_id: 2261,
  none_sku: false,
  hide_stock: false,
};

export default {
  props: ["id"],
  data: function () {
    return {
      data: {},
      images: [],
      info: [],
      attribute: [],
      goodsCount: 0,
      show: false,
      specificationList: {},
      sku: sku,
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg",
      },
    };
  },
  methods: {
    tankuang: function () {
      this.show = true;
    },
    onBuyClicked: function (skuData) {},

    async onAddCartClicked(skuData) {
      this.show = false;
      // console.log(skuData);
      // console.log(skuData.selectedSkuComb);
      let res = this.data.productList.filter((item, index) => {
        let choose = skuData.selectedSkuComb["s-1"] + "_" + skuData.selectedSkuComb["s-2"];
        // console.log(choose);
        // console.log(item);
        if (item.goods_specification_ids == choose) {
          return true;
        } else {
          return false;
        }
      });
      // console.log(res);
      // console.log(this.data.productList);
      let shopcat = await axios.post(api.CartAdd,{goodsId:res[0].goods_id, number:skuData.selectedNum, productId:res[0].id})
      // console.log(shopcat);

      this.goodsCount = shopcat.data.data.cartTotal.goodsCount;
    },
  },
  async created() {
    this.$store.dispatch("AjaxCart");
    // console.log(this.id);
    let id = this.id;
    let res = await axios.get(api.GoodsDetail, { params: { id } });
    // console.log(res);
    this.data = res.data.data;
    // console.log(res.data.data);
    this.images = res.data.data.gallery;
    this.info = res.data.data.info;
    // console.log(res.data.data.info);
    this.attribute = res.data.data.attribute;
    // console.log(this.attribute);
    this.goods.picture = res.data.data.info.primary_pic_url;
    this.sku.price = res.data.data.info.retail_price;
    this.sku.stock_num = res.data.data.info.goods_number;
    this.specificationList = res.data.data.specificationList;
    let tree = [];
    this.specificationList.forEach((item, index) => {
      let arr = [];
      item.valueList.forEach((pro, i) => {
        arr.push({
          id: pro.id,
          name: pro.value,
        });
      });
      tree.push({
        k: item.name,
        k_s: "s-" + item.specification_id,
        v: arr,
      });
    });
    this.sku.tree = tree;

    let shopcat = await axios.get(api.CartList);
    // console.log(shopcat);
    this.goodsCount = shopcat.data.data.cartTotal.goodsCount;
  },
};
</script>



<style lang="less">
#xq {
  margin-top: 50px;
  #mod1 {
    width: 100%;
    height: 60vh;
  }
  #text {
    font-size: 14px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    div {
      position: relative;
    }
    div::before {
      content: "";
      display: block;
      position: absolute;
      left: -7px;
      top: 18px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      border: 1px solid red;
    }
  }
  #word {
    text-align: center;
    #word1 {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 900;
    }
    #word2 {
      font-size: 14px;
      font-weight: lighter;
    }
    #word3 {
      margin-top: 20px;
      color: red;
    }
  }
  h3 {
    margin-left: 15px;
  }
  .mod2 {
    display: flex;
    justify-content: space-between;
    background: rgb(207, 205, 205);
    margin: 0 auto;
    width: 90%;
    height: 30px;
    line-height: 30px;
    .name {
      font-weight: lighter;
      font-size: 14px;
    }
    .value {
      width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    }
  }
  #mod3 {
    margin-top: 25px;
    margin-bottom: 50px;
    width: 100%;
    p {
      margin: 0;
      img {
        width: 100%;
      }
    }
  }
}
</style>