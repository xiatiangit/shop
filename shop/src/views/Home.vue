<template>
  <div id="home" class="home">
    <!-- 搜索框 -->
    <van-search
      input-align="center"
      v-model="searchData"
      placeholder="商品搜索共239款好物"
    />

    <!-- 轮播图1 -->
    <van-swipe :autoplay="3000" width="375" height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img id="swiperimg" v-lazy="image.image_url" />
      </van-swipe-item>
    </van-swipe>

    <!-- 菜单 -->
    <van-grid column-num="5">
      <van-grid-item
        v-for="(item, index) in channel"
        :key="index"
        :icon="item.icon_url"
        :text="item.name"
      />
    </van-grid>

    <!-- 板块1 -->
    <van-panel title="品牌制造商直供" id="mod1">
      <div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, index) in brandList" :key="index">
            <van-image :src="item.new_pic_url" />
            <p id="text1">{{ item.name }}</p>
            <p id="text2">{{ item.floor_price }}元起</p>
          </van-grid-item>
        </van-grid>
      </div>
    </van-panel>

    <!-- 模块2 -->
    <van-panel title="周一周四新品首发" id="mod2">
      <div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item, index) in newGoodsList" :key="index">
            <van-image :src="item.list_pic_url" />
            <p id="text3">{{ item.name }}</p>
            <p id="text4">¥{{ item.retail_price }}</p>
          </van-grid-item>
        </van-grid>
      </div>
    </van-panel>

    <!-- 模块3 -->
    <van-panel title="人气推荐" id="mod3">
      <div>
        <van-card
          v-for="(item, index) in hotGoodsList"
          :key="index"
          :price="item.retail_price"
          :desc="item.goods_brief"
          :title="item.name"
          :thumb="item.list_pic_url"
        />
      </div>
    </van-panel>

    <!-- 轮播图2 -->
    <van-panel id="mod4" title="专题精选">
      <div>
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in topicList" :key="index">
            <img id="img1" v-lazy="item.item_pic_url" />
            <div id="text1">{{ item.title }}</div>
            <div id="text2">¥0元起</div>
            <div id="text3">{{ item.subtitle }}</div>
          </van-swipe-item>
          <template #indicator>
            <div></div>
          </template>
        </van-swipe>
      </div>
    </van-panel>

    <!-- 模块5 -->
    <van-panel
      id="mod5"
      :title="item.name"
      v-for="(item, index) in categoryList"
      :key="index"
    >
      <div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="(item2,index) in item.goodsList" :key="index">
            <van-image :src="item2.list_pic_url"/>
            <div id="text1">{{item2.name}}</div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-panel>



    <!-- 底部导航 -->
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
import tabBtn from '../views/tabBtn'

export default {
  name: "Home",
  data: function () {
    return {
      searchData: "",
      data: {},
    };
  },
  computed: {
    images: function () {
      if (this.data.banner) {
        return this.data.banner;
      } else {
        return [];
      }
    },
    channel: function () {
      if (this.data.channel) {
        return this.data.channel;
      } else {
        return [];
      }
    },
    brandList: function () {
      if (this.data.brandList) {
        return this.data.brandList;
      } else {
        return [];
      }
    },
    newGoodsList: function () {
      if (this.data.newGoodsList) {
        return this.data.newGoodsList;
      } else {
        return [];
      }
    },
    hotGoodsList: function () {
      if (this.data.hotGoodsList) {
        return this.data.hotGoodsList;
      } else {
        return [];
      }
    },
    topicList: function () {
      if (this.data.topicList) {
        return this.data.topicList;
      } else {
        return [];
      }
    },
    categoryList: function () {
      if (this.data.categoryList) {
        return this.data.categoryList;
      } else {
        return [];
      }
    },
  },
  // 组件
  components: {
    tabBtn
  },
  // 挂载时获取
  async mounted() {
    // console.log(api);
    let res = await axios.get(api.IndexUrl);
    console.log(res.data.data);
    this.data = res.data.data;
    // let ree = await axios.get(api.GoodsDetail, { params: 1026000});
    // console.log(ree);
  },
};
</script>





<style lang="less">
#home {
  margin-top: 50px;
  #swiperimg {
    width: 375px;
    height: 200px;
  }
  #mod1 {
    position: relative;
    .van-cell {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      margin: 7px 0;
    }
    .van-grid-item__content {
      padding: 0;
    }
    #text1 {
      position: absolute;
      left: 10px;
      top: 0px;
    }
    #text2 {
      position: absolute;
      left: 10px;
      top: 30px;
      font-size: 10px;
    }
  }
  #mod2 {
    .van-cell {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      margin: 20px 0;
      padding: 0;
    }
    #text3 {
      width: 170px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    #text4 {
      margin: 0;
      color: red;
    }
  }
  #mod3 {
    .van-cell {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      padding: 20px;
    }
    .van-card__title {
      font-size: 16px;
      margin: 0 0 5px 0;
    }
    .van-card__price {
      color: red;
    }
    .van-card__bottom {
      margin: 0 0 20px 0;
    }
  }
  #mod4 {
    .van-cell__title {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      padding: 20px;
    }
    #img1 {
      width: 375px;
      height: 200px;
    }
    #text1 {
      position: absolute;
    }
    #text2 {
      color: red;
      margin: 0 0 0 220px;
    }
    #text3 {
      font-weight: lighter;
      font-size: 13px;
      // 溢出裁剪
      overflow: hidden;
      // 不允许换行
      white-space: nowrap;
      // 溢出的由省略号替代
      text-overflow: ellipsis;
    }
  }
  #mod5 {
    padding: 0 0 60px 0;
    .van-cell__title {
      text-align: center;
      font-size: 16px;
      font-weight: 900;
      padding: 20px;
    }
    .van-grid-item__content{
      padding: 1px;
    }
    #text1{
      width: 185px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
