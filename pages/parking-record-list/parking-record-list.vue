<template>
	<view class="flex-colum">
		<view class="tabs">
			<tab :tabs="tabs" :current="current"></tab>
		</view>
		<view class="search-list" style="margin-bottom: 30px;">
			<view class="record-item flex-column"  v-for="i in 8">
				<view class="flex align-center justify-between">
					<view class="flex-colum" style="margin-left: 15px;">
						<view>永旺梦乐城金银潭店-A1</view>
						<view>
							<text style="color: #9a9a9b; font-size: 14px;">武汉市东西湖区金银潭大道1号</text>
						</view>
						<view>
							<text style="color: #DE5C5A; font-size: 14px;">￥3/h</text>
						</view>
					</view>
					<view class="record-status flex align-center justify-center">
						<text style="color: #F0F0F0; font-size: 13px; padding: 8rpx 15rpx 8rpx 15rpx;">已进入</text>
					</view>
				</view>
				<view class="flex align-center justify-center">
					<view class="detail-button flex align-center justify-center">
						<text style="color: #84cb86; font-size: 13px; padding: 5rpx 30rpx 5rpx 30rpx;">
							车场详情
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
					name: '全部',
					list: [],
					page: 1,
					type: 'all'
					
				},{
					name: '正停',
					list: [],
					page: 1,
					type: 'notEnter'
				},{
					name: '已停',
					list: [],
					page: 1,
					type: 'hasEnter'
				}],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.tabs {
	width: 100%;
	height: 45px;
	background-color: #fefefe;
	position: fixed;
	top: 0;
}
.search-list {
	width: 100%;
	display: flex;
	margin-top: 45px;
	flex-direction: column;
	background-color: #f8f8fa;
}
.record-item {
	margin: 20px auto 0px auto;
	background-color: #fefefe;
	height: auto;
	border-radius: 10px;
	width: 90%;
	padding: 15px 0 15px 0;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
.record-status {
	width: auto;
	height: 40rpx;
	background-color: #84cb86;
	border-radius: 10px;
	margin-right: 15px;
}
.detail-button {
	width: auto;
	height: 50rpx;
	border-style: solid;
	border-width: 1px;
	border-color: #84cb86;
	border-radius: 30px;
}
</style>
