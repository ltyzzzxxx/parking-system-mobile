<template>
	<view class="flex-column">
		<view class="search">
			<view class="search-parking flex align-center">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<text style="color: #8b8c8b; margin-left: 8px; font-size: 14px;" @click="back()">搜索附近停车场</text>
			</view>
		</view>
		<view class="search-list">
			<view class="parking-item flex justify-between"  v-for="i in 8" @click="navigateTo('/pages/parking-detail/parking-detail')">
				<view class="flex flex-column" style="margin-left: 15px;">
					<view style="color: #1a191a; font-weight: bold; margin-top: 15px; font-size: 18px;">103孵化器内部停车场</view>
					<view style="color: #989799; font-size: 12px; margin-top: 8px;">17.072km | 湖北省武汉市蔡甸区经济</view>
					<view style="color: #ee7d7a; font-size: 14px; margin-top: 8px;">￥3元/小时</view>
					<view style="color: #84cb86; font-size: 14px; margin-top: 8px;">车位数300 | 可用150</view>
				</view>
				<view style="margin: auto 20px auto 0">
					<image src="../../static/nav.png" style="width: 30px; height: 30px;" mode="aspectFit"></image>
				</view>
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
			back() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
.search {
	width: 100%;
	height: 80px;
	background-color: #fefefe;
}
.search-parking {
	position: absolute;
	top: 2.5%;
	right: 4%;
	left: 4%;
	border-radius: 50px;
	width: 92%;
	height: 6%;
	background-color: #f8f8fa;
}
.search-list {
	width: 100%;
	position: absolute;
	top: 80px;
	bottom: 0;
	left: 0;
	background-color: #f8f8fa;
}
.parking-item {
	margin: 30px auto 0 auto;
	background-color: #fefefe;
	height: 150px;
	border-radius: 10px;
	width: 80%;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
</style>
