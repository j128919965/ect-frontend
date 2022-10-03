<template>
  <view>
    <view class="cu-form-group">
      <view class="title">CN
        <text class="must-star">*</text>
      </view>
      <input placeholder="请输入CN" v-model="cn"></input>
    </view>

    <view class="cu-form-group margin-top-sm">
      <view class="title">QQ
        <text class="must-star">*</text>
      </view>
      <input placeholder="请输入QQ号" v-model="qq"></input>
    </view>

    <view class="register-btn">
      <button class="cu-btn round bg-blue shadow" @click="register">确定</button>
      <view v-if="isWarning" class="text-warn" style="margin-right: 20px">{{ msg }}</view>
    </view>
  </view>
</template>

<script>
import httpx from "../../utils/http/httpx";
import {userUrls} from "../../utils/http/urls";
import store from "../../utils/store/store";
import userLogic from "../../logic/userLogic";

export default {
  name: "register",
  data: function () {
    return {
      cn: '',
      qq: '',
      isWarning: false,
      msg: ''
    }
  },
  methods: {
    async register() {
      let {msg, isWarning} = await userLogic.register(this.cn, this.qq)
      if (isWarning) {
        this.isWarning = true
        this.msg = msg
        return
      }

      uni.showToast({
        title: "注册成功",
        duration: 1500
      })
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.register-btn {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin: 10px 0;
  padding: 0 20px;
  align-items: center;
}

</style>