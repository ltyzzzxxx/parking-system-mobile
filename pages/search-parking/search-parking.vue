<template>
	<view class="flex-column">
		<view class="search">
			<view class="search-parking flex align-center">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<input style="color: #8b8c8b; margin-left: 8px; font-size: 14px;" type="search" @confirm="navigateTo('/pages/search-result/search-result')" placeholder="搜索附近停车场" />
			</view>
		</view>
		<view>
			<view class="flex align-center justify-between py-3 px-2">
				<text class="font-md font-weight-bold">历史记录</text>
				<text class="font-sm text-light-muted" @click="clear">清除全部</text>
			</view>
			<view class="flex flex-wrap px-2" style="margin-right: -30rxp;">
				<uni-badge :text="item" size="normal" type="primary" v-for="(item, index) in list" style="margin-right: 25rpx; margin-bottom: 25rpx;" @click="handleSearchEvent(item)"></uni-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.search {
	width: 100%;
	height: 80px;
	background-color: #f6f6f6;
}
.search-parking {
	position: absolute;
	top: 2.5%;
	right: 4%;
	left: 4%;
	border-radius: 50px;
	width: 92%;
	height: 6%;
	background-color: #fefefe;
}
</style>
