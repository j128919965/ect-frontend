<template>
  <view>
    <view class="VerticalBox">
      <scroll-view class="VerticalNav nav"
                   scroll-y
                   scroll-with-animation
                   :scroll-top="verticalNavTop"
                   style="height:calc(100vh)">
        <view class="cu-item expandable"
              v-for="(item,index) in types"
              :key="index"
              @tap="TabSelect"
              :data-id="index">
          <view class="m-tab-item" :class="index==tabCur?'text-green cur':''">
            <text>
              Tab-{{ item.name }}
              <text class="cuIcon-unfold lg text-gray"
                    :class="index==tabCur?'icon-rotate':''"
                    style="margin-left: 20rpx"
                    v-if="item.son.length!==0">
              </text>
            </text>
          </view>
          <view class="m-tab-item"
                :class="sonIndex==tabSonCur?'text-green cur':''"
                :class="itemSon.isGrand?'m-com-grand':''"
                v-for="(itemSon,sonIndex) in item.son"
                :key="sonIndex"
                v-show="index==tabCur">
            {{ itemSon.name }}
<!--            <view class="m-tab-item" :class="grandIndex==tabSonCur?'text-green cur':''"-->
<!--                  v-for="(itemGrand,grandIndex) in itemSon.son" :key="grandIndex" v-show="index==tabCur">-->
<!--              {{ itemGrand.name }}-->
<!--            </view>-->
          </view>
        </view>
      </scroll-view>
      <scroll-view class="VerticalMain" scroll-y scroll-with-animation="true" style="height:100vh"
                   :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
        <view class="padding-top padding-lr" v-for="(item,index) in types" :key="index" :id="'main-'+index">
          <view class="cu-bar solid-bottom bg-white">
            <view class="action">
              <text class="cuIcon-title text-green"></text>
              Tab-{{ item.name }}
            </view>
            <view>content</view>
          </view>
          <view class="cu-list menu-avatar"></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      types: [],
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true
    };
  },
  onLoad() {
    uni.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [];
    for (let i = 0; i < 26; i++) {
      list.push({
        name: String.fromCharCode(65 + i),
        id: i,
        son: [
          {
            name: '儿子1',
            son: [
              {
                name: '孙子',
                son: []
              }
            ]
          },
          {
            name: '儿子2',
            son: []
          }
        ]
      })
    }
    list.forEach(item =>{
      let result = []
      let sons = item.son;
      for (let son of sons) {
        result.push(son)
        for (let grand of son.son){
          grand.isGrand = true
          result.push(grand)
        }
      }
      item.son = result
    })
    this.types = list;
    this.listCur = list[0];
  },
  onReady() {
    uni.hideLoading()
  },
  methods: {
    toJSON() {
      return this
    },
    TabSelect(e) {
      this.tabCur = parseInt(e.currentTarget.dataset.id);
      this.mainCur = e.currentTarget.dataset.id;
      this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
    },
    VerticalMain(e) {
      if (this.load) {
        let tabHeight = 0;
        for (let i = 0; i < this.types.length; i++) {
          let view = uni.createSelectorQuery().select("#main-" + this.types[i].id);
          view.fields({
            size: true
          }, data => {
            this.types[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            this.types[i].bottom = tabHeight;
          }).exec();
        }
        this.load = false
      }
      let scrollTop = e.detail.scrollTop + 10;
      for (let i = 0; i < this.types.length; i++) {
        const {id, top, bottom} = this.types[i];
        if (scrollTop > top && scrollTop < bottom) {
          this.verticalNavTop = (id - 1) * 50
          this.tabCur = id
          return false
        }
      }
      return false
    }
  },
}
</script>

<style>
.icon-rotate {
  transform: rotate(180deg);
}

.m-tab-item {
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin: 0;
  border: none;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
}

.m-com-grand{
  padding-left: 20px;
}


.fixed {
  position: fixed;
  z-index: 99;
}

.VerticalNav.nav {
  width: 200upx;
  white-space: initial;
}

.VerticalNav.nav .cu-item {
  width: 100%;
  text-align: center;
  background-color: #fff;
  margin: 0 0 0 0;
  border: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.VerticalNav.nav .cu-item.expandable {
  height: auto;
  padding: 0;
}


.VerticalNav.nav .cu-item.cur {
  background-color: #f1f1f1;
  padding: 0;
}

.VerticalNav.nav .cu-item.cur::after {
  content: "";
  width: 8upx;
  height: 30upx;
  border-radius: 10upx 0 0 10upx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  margin: auto;
}

.m-tab-item.cur::after {
  content: "";
  width: 8upx;
  height: 30upx;
  border-radius: 10upx 0 0 10upx;
  position: absolute;
  background-color: currentColor;
  top: 0;
  right: 0upx;
  bottom: 0;
  margin: auto;
}

.VerticalBox {
  display: flex;
}

.VerticalMain {
  background-color: #f1f1f1;
  flex: 1;
}
</style>
