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
    register() {
      if (this.cn?.length < 1) {
        this.msg = 'cn不能为空'
        this.isWarning = true
        return
      }
      if (this.qq?.length < 1) {
        this.msg = 'qq不能为空'
        this.isWarning = true
        return
      }
      // TODO DELETE
      return;
      qq.login({
        success: async data => {
          const loginResp = await httpx.post(userUrls.login, {
            code: data.code,
            type: 2
          })
          console.log(loginResp)
          const {tempUserKey} = loginResp.d;
          const registerResp = await httpx.post(userUrls.register, {
            tempUserKey, qqNumber: this.qq, nickname: this.cn
          })
          if (!registerResp.s) {
            this.msg = registerResp.m
            this.isWarning = true
            return
          }

        }
      })
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