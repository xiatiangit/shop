<template>
  <div id="submit">
    <!-- 选择地址 -->
    <div id="loction">
      <van-radio-group v-model="radio">
        <van-radio name="1"></van-radio>
      </van-radio-group>
      <div id="text">
        <div id="me">
          <div id="name">张三</div>
          <div id="phoNum">13800000000</div>
        </div>
        <div id="address">
          浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室
        </div>
      </div>
    </div>

    <!-- 优惠券 -->
    <!-- coupons:可用优惠券列表 -->
    <van-coupon-cell
      id="coupon"
      ref="ref"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 60%; padding-top: 4px"
    >
      <!-- chosen-coupon：当前选中优惠券的索引 -->
      <!-- disabled-coupons：不可用优惠券列表 -->
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <!-- 商品合计，运费，优惠券计算 -->
    <div id="total">
      <div class="num">
        <div class="num1">商品合计</div>
        <div class="num2">¥ {{ tp }}</div>
      </div>
      <div class="num">
        <div class="num1">运费</div>
        <div class="num2">¥0</div>
      </div>
      <div class="num">
        <div class="num1">优惠券</div>
        <div class="num2">¥0</div>
      </div>
    </div>

    <!-- 结算 -->
    <van-submit-bar
      :price="this.tp * 100"
      button-text="付款"
      @submit="onSubmit"
    />

    <!-- 加载 -->
    <div id="login" v-show="xianshi">
      <van-loading color="#1989fa" id="log" size="40" />
      <div id="text0">加载中..</div>
    </div>
  </div>
</template>






<script>
import axios from "axios";
import api from "../assets/config/api";
export default {
  data: function () {
    return {
      data: [],
      tp: 0,
      xianshi: false,
      radio: "1",
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
    };
  },
  methods: {
    onChange: function () {},
    onExchange: function () {},
    onSubmit: function () {
      this.xianshi = true;
      if ((this.xianshi = true)) {
        this.$refs.ref.style.pointerEvents = "none";
      }
    },
  },
  computed: {},
  async created() {
    let res = await axios.get(api.CartList);
    //   console.log(res.data.data);
    this.data = res.data.data.cartList;
    //   console.log(this.data);
    let arr = [];
    let ree = this.data.filter((item) => {
      if (item.checked == 1) {
        let num = item.number * item.retail_price;
        arr.push(num);
      }
      return arr;
    });
    // console.log(arr);
    let s = 0;
    arr.forEach((item) => {
      s += item;
    });
    this.tp = s;
    // console.log(this.tp);
  },
};
</script>





<style lang="less" scoped>
#submit {
  height: 100vh;
  margin-top: 50px;
  #loction {
    margin-top: 70px;
    color: #000;
    margin-bottom: 5px;
    width: 100%;
    height: 100px;
    background: rgb(231, 230, 230);
    display: flex;
    align-items: center;
    justify-content: space-around;
    #text {
      width: 60%;
      margin-right: 30px;
      #me {
        display: flex;
        align-items: baseline;
        #phoNum {
          margin-left: 10px;
        }
      }
    }
  }
  #coupon {
    background: rgb(231, 230, 230);
  }
  #total {
    margin-top: 5px;
    .num {
      margin-top: 2px;
      line-height: 45px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      background: rgb(231, 230, 230);
      .num1 {
        margin-left: 15px;
      }
      .num2 {
        margin-right: 25px;
      }
    }
  }
  #login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: rgba(211, 208, 208, 0.5);
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