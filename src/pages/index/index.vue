<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
      <button class="m-test" v-on:click="store.set('token', '114514')">Store set Test</button>
      <button class="m-test" v-on:click="store.remove('token' )">Store remove Test</button>
      <button class="m-test" v-on:click="store.clear()">Store clear Test</button>
      <button class="m-test" v-on:click="httpx.get(userUrls)">get Test</button>
		</view>
	</view>
</template>

<script>
  import httpx from "@/utils/http/httpx";
  import store from "@/utils/store/store";
  import {base, userUrls} from "@/utils/http/urls"
	export default {
		data() {
			return {
				title: 'Hello',
        httpx, store, base, userUrls
			}
		},
		onLoad() {
		},
		methods: {

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
