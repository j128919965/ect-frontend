<template>
  <view>
    <view class="cu-card article">
      <view class="cu-item shadow">
        <view class="title">
          <view class="text-cut">{{ id == null ? '请选择商品' : getGoodsById(id).name }}</view>
        </view>
        <view class="p25">
          <view class="p-t-e-g-infos">
            <view class="item">
              <view class="key">均价</view>
              <input class="value" placeholder="请输入均价" v-model="avgPrice" type="digit"/>
            </view>
            <view class="item">
              <view class="key">调价</view>
              <input class="value" placeholder="请输入调价" v-model="adjPrice" type="digit"/>
            </view>
            <view class="item">
              <view class="key">总量</view>
              <input class="value" placeholder="请输入总量" v-model="total" type="number"/>
            </view>
            <view class="item">
              <view class="key">余量</view>
              <input class="value" placeholder="请输入余量" v-model="rest" type="number"/>
            </view>
          </view>
          <view class="text-lg margin-top margin-bottom-lg text-gray">
            商品
          </view>
          <view v-if="id == null" class="avatar empty" @click="chooseGoods">
            <text class="cuIcon-add" ></text>
          </view>
          <view class="avatar" v-else>
            <img :src="getGoodsById(id).picCompress" alt="">
            <view class="remove sm cuIcon-close" v-if="mode === 'add'" @click="removeGoods"></view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="warning != null" class="text-warn text-center">
      {{ warning }}
    </view>
    <view class="que-center-button">
      <button @click="save">保存</button>
    </view>
  </view>
</template>

<script>
import goodsLogic from "../../../logic/goodsLogic";

export default {
  name: "goods",
  data: function () {
    return {
      mode: 'add',
      nowIds: [],
      id: null,
      avgPrice: null,
      adjPrice: null,
      total: null,
      rest: null,
      warning: null
    }
  },
  onLoad: function (opts) {
    this.mode = opts.mode
    if (opts.nowIds != null) {
      this.nowIds = opts.nowIds.split(',').map(it => parseInt(it))
    }
    if (opts.now != null) {
      const {id, avgPrice, adjPrice, total, rest} = JSON.parse(opts.now)
      this.id = id
      this.avgPrice = avgPrice / 100
      this.adjPrice = adjPrice / 100
      this.total = total
      this.rest = rest
    }
  },
  methods: {
    getGoodsById: goodsLogic.getGoodsById,
    save() {
      if (this.id == null) {
        this.warning = '请选择商品'
        return
      }
      if (this.avgPrice == null) {
        this.warning = '请输入均价'
        return;
      }
      if (this.avgPrice < 0) {
        this.warning = '均价必须为正数'
        return;
      }
      if (this.adjPrice == null) {
        this.warning = '请输入调价'
        return;
      }
      if (this.total == null) {
        this.warning = '请输入总量'
        return;
      }
      if (this.total < 0) {
        this.warning = '总量必须为正数'
        return;
      }
      if (this.rest == null) {
        this.warning = '请输入余量'
        return;
      }
      if (this.rest > this.total) {
        this.warning = '余量不能超过总量'
        return;
      }
      const newGoods = {
        id: this.id,
        avgPrice: parseInt(`${this.avgPrice * 100}`),
        adjPrice: parseInt(`${this.adjPrice * 100}`),
        total: this.total,
        rest: this.rest
      }
      this.getOpenerEventChannel().emit('saveGoods',newGoods)
      uni.navigateBack()
    },
    chooseGoods(){
      // TODO 实际选择商品
      for (let i = 1; i < 1000; i++) {
        if (this.nowIds.indexOf(i) < 0) {
          this.id = i
          return
        }
      }
    },
    removeGoods(){
      this.id = null
    }
  }
}
</script>

<style scoped>
.p-t-e-g-infos {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.p-t-e-g-infos .item {
  width: 45%;
  display: flex;
  padding: 0 0 0 20rpx;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
}

.p-t-e-g-infos .key {
  color: black;
  width: 60rpx;
  font-size: 26rpx;
}

.p-t-e-g-infos .value {
  color: #666;
  width: calc(100% - 60rpx);
  text-align: center;
}
</style>