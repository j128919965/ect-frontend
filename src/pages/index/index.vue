<template>
  <view class="content">
    <view v-if="isLogin" class="user-info-content">
      <view class="user-avatar cu-avatar s120 round"
            style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);">
      </view>
      <view class="user-info-data-content">
        <view class="user-name">
          忧桑
          <view v-if="isTuanOwnerOrTuanAdmin" class="user-role">
            <text v-if="isTuanOwner">团长</text>
            <text v-else-if="isTuanAdmin">管理员</text>
          </view>
        </view>
        <view class="user-qq">
          949826078
        </view>
      </view>
      <view class="create-tuan">
        <view class="cuIcon-add"></view>
      </view>
    </view>
    <view v-else class="user-info-content">
      <view class="user-avatar cu-avatar s120 round">
        <text class="cuIcon-people"></text>
      </view>
      <view class="user-info-data-content" @click="route('/pages/user/register')">
        <view class="user-name" >
          立即注册&nbsp;&nbsp;>
        </view>
      </view>
    </view>

    <scroll-view scroll-x="true" class="bg-white nav l text-center">
      <!-- 如果没有团管权限，则不显示 -->
      <view class="cu-item xl" :class="tabCur === 0 ? 'cur orange b5' : ''"
            @tap="tabSelect"
            :data-id="0"
            v-if="isTuanOwnerOrTuanAdmin">
        我管理的
      </view>
      <view class="cu-item xl" :class="tabCur === 1 ? 'cur orange b5' : ''" @tap="tabSelect" :data-id="1">
        我参与的
      </view>
    </scroll-view>
  </view>
</template>

<script>
import state from "../../utils/state/state";

export default {
  onLoad() {
    // 如果没有团管权限，则默认tabCur = 2
    if (!state.getters.isTuanOwnerOrTuanAdmin()) {
      this.tabCur = 1
    }
    this.loadData()
  },
  computed: {
    isLogin: function () {
      return state.state.isLogin
    },
    isTuanOwnerOrTuanAdmin() {
      return !state.getters.isTuanOwnerOrTuanAdmin()
    },
    isTuanOwner(){
      return true
    },
    isTuanAdmin(){
      return true
    }
  },
  data() {
    return {
      title: 'Hello',
      tabCur: 0,
      scrollLeft: 0,
    }
  },
  methods: {
    tabSelect(e) {
      this.tabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      this.loadData()
    },
    loadData() {
      console.log(this.tabCur)
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.user-info-content {
  width: 100%;
  padding-top: 42rpx;
  padding-bottom: 61rpx;
  background: #ffffff;
  display: flex;
}

.user-info-data-content {
  margin-left: 41rpx;
  /*display: flex;*/
}

.user-name {
  font-size: 17px;
  font-weight: bold;
  margin-top: 5rpx;
  display: flex;
  align-items: center;
  height: 50rpx;
}

.user-role{
  display: inline-block;
  background: #EE62C1;
  color: #ffffff;
  border-radius: 6rpx;
  margin-left: 20rpx;
  font-size: 10px;
  width: 50rpx;
  height: 30rpx;
  text-align: center;
}

.user-qq{
  background: #f2f2f2;
  font-weight: bold;
  border-radius: 6rpx;
  margin-top: 20rpx;
  font-size: 14px;
  padding: 4rpx;
  text-align: center;
}

.create-tuan {
  margin-left: auto;
  margin-right: 30rpx;
  border: 2px solid black;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50rpx;
  width: 50rpx;
}

.user-avatar {
  margin-left: 69rpx;
}
</style>
