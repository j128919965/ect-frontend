<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{title}}</text>
      <button class="m-test" v-on:click="setStore('token', '114514' + 1)">Store set Test</button>
      <button class="m-test" v-on:click="rmStore('token' )">Store remove Test</button>
      <button class="m-test" v-on:click="clearStore()">Store clear Test</button>
      <button class="m-test" v-on:click="getRqu(baseUrl)">
        get Test
        <text class="cuIcon-vipcard cuIcon-vipcard"></text>
      </button>
      <button class="m-test" @click="route('/pages/admin/commodity')">TO SHOPPING</button>
    </view>
  </view>
</template>

<script>
import httpx from "@/utils/http/httpx";
import store from "@/utils/store/store";
import { base, userUrls } from "@/utils/http/urls"
export default {
  data() {
    return {
      baseUrl: base,
      userUrls: userUrls,
      title: 'Hello'
    }
  },
  onLoad() {
  },
  methods: {
    getRqu: function (url, data) {
      httpx.get(url, data)
    },
    postRqu: function (url, data) {
      httpx.post(url, data)
    },
    putRqu: function (url, data) {
      httpx.put(url, data)
    },
    delRqu: function (url, data) {
      httpx.del(url, data)
    },
    setStore: function (k, v) {
      store.set(k, v)
    },
    getStore: function (k) {
      store.get(k)
    },
    rmStore: function (k) {
      store.remove(k)
    },
    clearStore: function () {
      store.clear()
    }
  }
  /*
  * methods: {
  * httpx, store, base, userUrls
  * }
  * */
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
