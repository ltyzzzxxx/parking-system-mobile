<template>
	<view class="flex-column">
		<view class="tabs">
			<tab :tabs="tabs" :current="current" @change="clickTab"></tab>
		</view>
		<view class="search-list" style="margin-bottom: 30px;">
			<view class="coupon-item flex-column"  v-for="(item, index) in list" :key="index">
				<view class="flex align-center justify-between">
					<view class="flex-column" style="margin-left: 15px;">
						<view class="flex align-center justify-center">
							<view class="coupon-status flex align-center justify-center" :class="item.status == 0 ? 'status-blue' : item.status == 1 ? 'status-green' : 'status-red'">
								<text style="color: #F0F0F0; font-size: 13px; padding: 8rpx 15rpx 8rpx 15rpx;">{{item.status == 0 ? '待使用' : item.status == 1 ? '已使用' : '已过期'}}</text>
							</view>
							<view>{{item.title}}</view>
						</view>
						<view class="flex align-center" style="margin-top: 10px;">
							<text style="color: #9a9a9b; font-size: 13px;">于 {{item.validTime}} 到期</text>
						</view>
					</view>
					<view style="height: 60px; width: 1px; background:#F1F2f2; border: 0;"></view>
					<view class="flex-column" style="margin-top: -10px;">
						<view class="flex align-center justify-center" style="margin-right: 20px;">
							<text style="color: #F5631D; font-size: 12px;">￥</text>
							<text style="color: #F5631D; font-size: 30px; font-weight: bold;">{{item.discountAmount}}</text>
						</view>
						<view class="flex align-center justify-center" style="margin-right: 20px;">
							<text style="color: #4c4c4b; font-size: 12px;">满{{item.thresholdAmount}}可用</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="list.length == 0" class="no-car flex align-center justify-center flex-column">
				<image src="../../static/noPlate.png" style="width: 130px; height: 100px;"></image>
				<text class="text-light-muted" style="font-size: 12px; margin: 20px 0 80px 0;">您还没有优惠券哦！</text>
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
				couponList: [],
				list: [],
				current: 0,
				tabs: [{
					name: '全部',
					list: [],
					page: 1,
					type: 'all'
				},{
					name: '待使用',
					list: [],
					page: 1,
					type: 'notUse'
				},{
					name: '已使用',
					list: [],
					page: 1,
					type: 'hasUse'
				},{
					name: '已过期',
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
			clickTab(index) {
				this.current = index
				if(index == 0) {
					this.list = this.couponList
				} else {
					this.list = this.couponList.filter(c => c.status == index - 1)
				}
			},
			getCouponList() {
				this.$api.getCouponList({
					userId: this.user.id
				}).then(res => {
					console.log(res)
					this.couponList = res.couponList
					this.list = this.couponList
				})
			},
			created() {
				this.getCouponList()
			},
			onLoad() {
				this.getCouponList()
			}
		}
	}
</script>

<style>
page {
	background-color: #f8f8fa;
}
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
.coupon-item {
	margin: 20px auto 0px auto;
	background-color: #fefefe;
	height: auto;
	border-radius: 10px;
	width: 90%;
	padding: 15px 0 15px 0;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
.coupon-status {
	width: auto;
	height: 40rpx;
	background-color: #84cb86;
	border-radius: 3px;
	margin-right: 10px;
}
.status-blue {
	background-color: #007AFF;
}
.status-red {
	background-color: #DE5C5A;
}
.status-green {
	background-color: #84CB86;
}
.no-car {
	position: absolute;
	top: 8%;
	height: 88%;
	width: 100%;
}
</style>
