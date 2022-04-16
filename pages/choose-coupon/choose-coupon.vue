<template>
	<view>
		<view class="flex-column">
			<view class="search-list" style="margin-bottom: 20px;">
				<view style="margin: 10px 0 0 25px; font-size: 15px;">
					<text>可使用优惠券</text>
					<text style="font-size: 12px; font-weight: 330; margin-left: 6px;">{{usableCouponList.length}}张</text>
				</view>
				<view class="coupon-item flex-column"  v-for="(item, index) in usableCouponList" :key="index">
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
					<view class="flex align-center justify-center">
						<view class="detail-button flex align-center justify-center" style="margin-top: 10px;" @click="backPay(item.discountAmount)">
							<text style="color: #84cb86; font-size: 13px; padding: 5rpx 30rpx 5rpx 30rpx;">
								选择
							</text>
						</view>
					</view>
				</view>
			</view>
			<view class="search-list" style="margin-bottom: 20px;">
				<view style="margin: 0px 0 0 25px; font-size: 15px;">
					<text>不可使用优惠券</text>
					<text style="font-size: 12px; font-weight: 330; margin-left: 6px;">{{unusableCouponList.length}}张</text>
				</view>
				<view class="coupon-item flex-column"  v-for="(item, index) in unusableCouponList" :key="index">
					<view class="flex-column">
						<view class="flex align-center justify-between">
							<view class="flex-column" style="margin-left: 15px;">
								<view class="flex align-center justify-center">
									<view class="coupon-status flex align-center justify-center" :class="item.status == 0 ? 'status-blue' : item.status == 1 ? 'status-green' : 'status-red'">
										<text style="color: #F0F0F0; font-size: 13px; padding: 8rpx 15rpx 8rpx 15rpx;">{{item.status == 0 ? '待使用' : item.status == 1 ? '已使用' : '已过期'}}</text>
									</view>
									<view>
										<text style="color: #bcbbbd;">{{item.title}}</text>
									</view>
								</view>
								<view class="flex align-center" style="margin-top: 10px;">
									<text style="color: #bcbbbd; font-size: 13px;">于 {{item.validTime}} 到期</text>
								</view>
							</view>
							<view style="height: 60px; width: 1px; background:#F1F2f2; border: 0;"></view>
							<view class="flex-column" style="margin-top: -10px;">
								<view class="flex align-center justify-center" style="margin-right: 20px;">
									<text style="color: #f2a796; font-size: 12px;">￥</text>
									<text style="color: #f2a796; font-size: 30px; font-weight: bold;">{{item.discountAmount}}</text>
								</view>
								<view class="flex align-center justify-center" style="margin-right: 20px;">
									<text style="color: #bcbbbd; font-size: 12px;">满{{item.thresholdAmount}}可用</text>
								</view>
							</view>
						</view>
						<view class="flex justify-between my-divider"></view>
						<view style="margin-left: 15px; margin-top: 10px; font-size: 12px; color: #F5631D;">
							不可用原因
						</view>
						<view style="margin-left: 15px; color: #bcbbbd;">
							<view style="font-size: 12px;">
								1.优惠券已使用或已过期
							</view>
							<view style="font-size: 12px;">
								2.订单金额不满足优惠券使用门槛金额
							</view>
						</view>
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
				usableCouponList: [],
				unusableCouponList: [],
				originalFee: 0,
				plate: '',
			}
		},
		computed:{
			...mapState({
				user: state => state.user
			}),
		},
		methods: {
			getCouponList() {
				this.$api.getCouponList({
					userId: this.user.id
				}).then(res => {
					console.log(res)
					res.couponList.forEach(c => {
						if(c.status == 0 && this.originalFee > c.thresholdAmount) {
							this.usableCouponList.push(c)
						} else {
							this.unusableCouponList.push(c)
						}
					})
				})
			},
			backPay(discountAmount) {
				console.log(discountAmount)
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.setData({
					plate: this.plate,
					discountAmount: discountAmount
				})
				uni.navigateBack({
					delta: 1,
					success: function() {
						prevPage.onLoad()
					}
				});
			}
		},
		onLoad(option) {
			this.getCouponList()
			console.log(option)
			this.originalFee = option.originalFee
			this.plate = option.plate
		}
	}
</script>

<style>
page {
	background-color:#f8f8fa;
}
.search-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #f8f8fa;
}
.coupon-item {
	margin: 10px auto 0px auto;
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
.detail-button {
	width: auto;
	height: 50rpx;
	border-style: solid;
	border-width: 1px;
	border-color: #84cb86;
	border-radius: 30px;
}
.my-divider {
	margin-top: 12px;
	border: 0;
	height: 1px;
	background: #F1F1F1;
	margin-left: 10px;
	margin-right: 10px;
}
</style>
