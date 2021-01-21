<template>
  <div id="shopCar">
    <!-- 文字 -->
    <div id="text1">
      <div>30天无忧退货</div>
      <div>48小时急速退款</div>
      <div>满88元免邮费</div>
    </div>

    <!-- 商品卡片 -->
    <div id="card">
      <div id="list" v-for="(item, index) in cartList" :key="index">
        <!-- 复选框 -->
        <van-checkbox
          @change="changeEvent($event, item)"
          v-model="item.checked"
        ></van-checkbox>
        <!-- 图片 -->
        <van-image
          width="5rem"
          height="5rem"
          fit="cover"
          :src="item.list_pic_url"
        />
        <!-- 标题和数量 -->
        <div id="text2">
          <div id="title">{{ item.goods_name }}</div>
          <div id="num">x{{ item.number }}</div>
          <!-- 商品描述 -->
          <div id="brief">{{ item.goods_specifition_name_value }}</div>
          <!-- 价格 -->
          <div id="price">¥{{ item.retail_price }}</div>
        </div>
      </div>
    </div>

    <!-- 底部提交订单 -->
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" @click="changeBtn">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>



<script>
import { mapState } from "vuex";
import axios from "axios";
import api from "../assets/config/api";
let mapStateObj = mapState(["cartTotal", "cartList"]);
export default {
  data: function () {
    return {
      checked: 0,
    };
  },
  methods: {
    changeBtn: function () {},
    onSubmit: function () {
      this.$router.push('/submit')
    },
    onClickEditAddress: function () {},
    changeEvent: async function (event, item) {
      // console.log(this.cartList);
      //   console.log(event);
      //   console.log(item)
      let res = await axios.post(api.CartChecked, {
        isChecked: Number(event),
        productIds: item.product_id,
      });
      // console.log(res);
      let data = res.data.data;
      //   console.log(data);
      this.$store.commit("setCartList", data.cartList);
      this.$store.commit("setCartTotal", data.cartTotal);
    },
  },
  computed: {
    checkedAll: {
      async set(val) {
          // console.log(val); 
        const arr =[]
        this.cartList.forEach((item)=>{
            arr.push(item.product_id)
        })
        await axios.post(api.CartChecked,{productIds: arr.join(','), isChecked: val ? 1 : 0 })
        this.$store.dispatch("AjaxCart")
        // console.log(val);
      },
      get() {
        if (this.cartTotal.goodsCount == this.cartTotal.checkedGoodsCount) {
          return true;
        } else {
          return false;
        }
      },
    },
    ...mapStateObj,
  },
  created() {
    this.$store.dispatch("AjaxCart");
  },
  mounted() {
    setTimeout(() => {
      //   console.log(this.cartList);
      //   console.log(this.cartTotal);
    }, 100);
  },
};
</script>


<style lang="less">
#shopCar {
  margin-top: 50px;
  #card {
    #list {
      display: flex;
      align-items: center;
      padding: 5px 5px;
      font-size: 14px;
      .van-image__img {
        background: #efefef;
        margin: 0 5px;
      }
      #text2 {
        width: 240px;
        height: 80px;
        position: relative;
        margin-left: 15px;
        #title {
          position: absolute;
          left: 0;
          top: 0;
        }
        #num {
          position: absolute;
          top: 0;
          right: 0;
        }
        #brief {
          position: absolute;
          top: 20px;
          color: red;
        }
        #price {
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  #text1 {
    background: rgb(201, 200, 200);
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
}
</style>