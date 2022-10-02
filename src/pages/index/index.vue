<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
      <button class="m-test" @click="route('/pages/admin/commodity')">TO SHOPPING</button>
      <button class="m-test" v-if="isLogin">只有在登录了会显示</button>
      <button class="m-test" v-if="isTuanOwnerOrTuanAdmin">只有没有团长权限会显示</button>
    </view>
  </view>
</template>

<script>
import state from "../../utils/state/state";

export default {
  computed: {
    isLogin: function () {
      return state.state.isLogin
    },
    isTuanOwnerOrTuanAdmin() {
      return !state.getters.isTuanOwnerOrTuanAdmin()
    }
  },
  data() {
    return {
      title: 'Hello'
    }
  }
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
