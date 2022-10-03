<template>
  <view>
    <view v-show="step === 1">
      <view class="p-t-c-container lg">
        <view class="text-xxl margin-top-xxl h60">
          1. 输入该次排谷名称
        </view>
        <view class="text-xl text-gray margin-top-xl">
          拼团名称
          <text class="text-red margin-left-sm">*</text>
        </view>
        <view class="cu-form-group margin-top-sm">
          <input placeholder="请输入拼团名称" v-model="name"></input>
        </view>
        <view v-show="nameWarn" class="text-warn">{{ nameWarn }}</view>
        <view class="text-xl text-gray margin-top-xl">
          拼团描述（选填）
        </view>
        <view class="cu-form-group margin-top">
          <textarea maxlength="-1" placeholder="开团盒数/出荷时间等信息" v-model="desp"></textarea>
        </view>
        <view class="p-t-c-tab">
          <button class="item gray" @click="cancel">取消</button>
          <button class="item xl pink" @click="gotoStep(2)">下一步
            <text class="cuIcon-right"></text>
          </button>
        </view>
      </view>
    </view>
    <view v-show="step === 2">
      <view class="p-t-c-container">
        <view class="text-xxl h60 m25lr">
          2. 编辑商品列表
        </view>
        <view class="p-t-c-goods">
          <view v-for="goods in goodsList" :key="goods.id" class="p-t-c-card">
            <view class="pic">
              <img src="" alt="">
            </view>
            <view class="infos">
              <view class="item">
                <view class="key">谷名</view>
                <view class="value">{{ goods.id }}</view>
              </view>
              <view class="item">
                <view class="key">均价</view>
                <view class="value">{{ goods.avgPrice / 100 }}元</view>
              </view>
              <view class="item">
                <view class="key">调价</view>
                <view class="value">{{ goods.adjPrice / 100 }}元</view>
              </view>
              <view class="item">
                <view class="key">总量</view>
                <view class="value">{{ goods.total }}</view>
              </view>
              <view class="item">
                <view class="key">余量</view>
                <view class="value">{{ goods.rest }}</view>
              </view>
            </view>
            <view class="remove cuIcon-close"><text class=""></text></view>
          </view>
        </view>
        <view class="p-t-c-add-goods">
          <button>添加一个商品</button>
        </view>
        <view class="p-t-c-tab m25lr">
          <view class="item"></view>
          <button class="item gray" @click="gotoStep(1)">
            <text class="cuIcon-back"></text>
            上一步
          </button>
          <button class="item pink" @click="gotoStep(3)">下一步
            <text class="cuIcon-right"></text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "create",
  data: function () {
    return {
      step: 1,
      name: '',
      desp: '',
      goodsList: [
        {
          id: 1,
          avgPrice: 1000000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 2,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 3,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 4,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 5,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 6,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 7,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        },
        {
          id: 8,
          avgPrice: 10000,
          adjPrice: 600,
          total: 100,
          rest: 67
        }
      ],
      nameWarn: null
    }
  },
  methods: {
    createGoods() {
      uni.navigateTo({
        url: '/pages/tuan/edit/goods'
      })
    },
    cancel() {
      uni.navigateBack()
    },
    gotoStep(step) {
      const now = this.step
      if (step < 2) {
        this.step = step
        return;
      }
      if (now === 1) {
        if (this.name?.length < 1) {
          this.nameWarn = '拼团名称不能为空'
          return
        } else {
          this.nameWarn = null
        }
        this.step = step
        return;
      }
      if (now === 2) {

      }
    }
  }
}
</script>

<style scoped>
.p-t-c-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 50rpx 25rpx;
  position: relative;
}

.p-t-c-container.lg {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 50rpx;
  position: relative;
}


.p-t-c-tab {
  margin-top: auto;
  display: flex;
  align-content: space-between;
}

.p-t-c-tab .item {
  width: 30%;
  height: 60rpx;
  font-size: 27rpx;
  margin: auto;
}

.p-t-c-tab .item.xl {
  width: 60%;
}

.p-t-c-tab .item.pink {
  background: #EC808D;
  color: white;
}

.p-t-c-tab .item.gray {
  background: #D7D7D7;
  color: black;
}

.p-t-c-goods {
  margin: 20rpx 0;
  padding: 20rpx 0;
  height: calc(100vh - 380rpx);
  /*border: 1px solid black;*/
  overflow-y: auto;
}

.p-t-c-add-goods {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 60rpx;
  margin: 40rpx 0;
}

.p-t-c-add-goods button {
  width: 220rpx;
  background: #EC808D;
  color: white;
  font-size: 27rpx;
}

.p-t-c-card {
  width: 690rpx;
  height: 180rpx;
  display: flex;
  padding: 20rpx;
  background: white;
  border-radius: 25rpx;
  margin-bottom: 40rpx;
  align-items: center;
  position: relative;
}

.p-t-c-card .pic img {
  height: 120rpx;
  width: 120rpx;
  border: 1px solid #eee;
}

.p-t-c-card .infos {
  width: calc(100% - 120rpx);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.p-t-c-card .remove {
  position: absolute;
  right: -10rpx;
  top: -20rpx;
  background: #EC808D;
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26rpx;
  font-weight: bold;
}

.p-t-c-card .infos .item {
  width: 33%;
  display: flex;
  padding: 0 0 0 20rpx;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
}

.p-t-c-card .infos .key {
  color: black;
  width: 50rpx;
}

.p-t-c-card .infos .value {
  color: #666;
  width: calc(100% - 50rpx);
  text-align: center;
}




</style>