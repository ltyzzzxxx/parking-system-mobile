<template>
	<view class="flex-colum">
		<view class="tabs">
			<tab :tabs="tabs" :current="current"></tab>
		</view>
		<view class="search-list" style="margin-bottom: 30px;">
			<view class="tip flex align-center justify-center">
				<uni-icons type="sound" size="20" color="#9C9C9C"></uni-icons>
				<text style="color: #9C9C9C; font-size: 13px;">请在预约后15分钟内达到车场，否则预约自动取消</text>
			</view>
			<view class="record-item flex-column"  v-for="(item, index) in appointmentList" :key="index">
				<view class="flex align-center justify-between">
					<view class="flex-colum" style="margin-left: 15px;">
						<view>{{item.carParkName}}</view>
						<view style="margin-top: 5px;">
							<text style="color: #9a9a9b; font-size: 13px;">{{item.carParkAddress.length > 17 ? item.carParkAddress.slice(0,17) + "..." : item.carParkAddress}}</text>
						</view>
						<view style="margin-top: 5px;">
							<text style="color: #DE5C5A; font-size: 13px;">￥{{item.carParkPrice}}/h</text>
						</view>
						<view style="margin-top: 5px;">
							<text style="color: #007AFF; font-size: 13px;">于 {{item.createTime}} 预约</text>
						</view>
					</view>
					<view class="record-status flex align-center justify-center" style="margin-top: 20px">
						<text style="color: #F0F0F0; font-size: 13px; padding: 8rpx 15rpx 8rpx 15rpx;">{{item.status == 0 ? '未进入' : item.status == 1 ? '已进入' : '已超时'}}</text>
					</view>
				</view>
				<view class="flex align-center justify-center">
					<view class="detail-button flex align-center justify-center" style="margin-top: 10px;" @click="navigateTo('/pages/parking-detail/parking-detail?id=' + item.carParkId)">
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
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				address: '武汉市东西湖区金银潭大道1号永旺梦乐城F1',
				appointmentList: [],
				current: 0,
				tabs: [{
					name: '全部',
					list: [],
					page: 1,
					type: 'all'
					
				},{
					name: '未进入',
					list: [],
					page: 1,
					type: 'notEnter'
				},{
					name: '已进入',
					list: [],
					page: 1,
					type: 'hasEnter'
				},{
					name: '已超时',
					list: [],
					page: 1,
					type: 'expired'
				}],
			}
		},
		computed:{
			...mapState({
				user: state => state.user
			}),
		},
		methods: {
			getAppointmentList() {
				this.$api.getAppointmentList({
					userId: this.user.id
				}).then(res => {
					console.log(res)
					this.appointmentList = res.appointmentList
				})
			}
		},
		created() {
			this.getAppointmentList()
		},
		onLoad() {
			this.getAppointmentList()
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
.tip {
	margin: 20px auto 0px auto;
	background-color: #fefefe;
	height: auto;
	border-radius: 10px;
	width: 90%;
	padding: 8px 0 8px 0;
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
