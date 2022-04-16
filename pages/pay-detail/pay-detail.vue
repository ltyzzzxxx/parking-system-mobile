<template>
	<view class="flex-column">
		<view class="detail-bg">
			<view class="flex justify-between" style="margin: 20px 0 0 20px; ">
				<view>
					<view style="color: white; font-size: 18px; font-weight: 400;">{{payDetail.carParkName}}</view>
					<view class="flex-column" style="margin-top: 15px;">
						<view class="flex">
							<text style="color: #EEEFF5" class="iconfont icon-zuobiao"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">{{payDetail.carParkAddress}}</text>
						</view>
						<view class="flex" style="margin-top: 14px;">
							<text style="color: #EEEFF5" class="iconfont icon-type"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">商业停车场</text>
						</view>
						<view class="flex" style="margin-top: 14px;">
							<text style="color: #EEEFF5" class="iconfont icon-shouye"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">{{payDetail.contactPhone}}</text>
						</view>
					</view>
				</view>
				<view style="margin: 50px 40px auto 0;border-radius: 100%; background-color: white; width: 40px; height: 40px;" @click="openMap(carPark.latitude, carPark.longitude)">
					<image src="../../static/nav.png" style="width: 25px; height: 25px; margin: 5px 0 0 5px;" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="detail-container">
			<view class="detail-parking">
				<view style="margin: 0 0 0 20px; padding-top: 15px;">
					<view style="color: #323133; font-weight: bold;">当前缴费信息</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>车牌号</view>
						<view style="margin-right: 20px;">{{payDetail.plate}}</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>停车状态</view>
						<view style="margin-right: 20px;">
							<view class="parking-status flex align-center justify-center">
								<text style="color: #F0F0F0; padding: 4rpx 15rpx 4rpx 15rpx;">正停</text>
							</view>
						</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>
							收费标准
							<uni-icons type="help" size="15" style="margin-left: 6rpx;" @click="showHelp"></uni-icons>
						</view>
						<view style="margin-right: 20px;">￥{{payDetail.price}}/h</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>进入时间</view>
						<view style="margin-right: 20px;">{{enterTime}}</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>红包/优惠券</view>
						<view style="margin-right: 20px;">
							<view v-if="payDetail.discountAmount == 0" class="coupon flex justify-between align-center" @click="chooseCoupon">
								<text style="color: #7f5222; padding: 4rpx 5rpx 6rpx 15rpx; font-size: 22rpx;">
									未选红包，点击选择
								</text>
								<uni-icons type="forward" size="13"></uni-icons>
							</view>
							<view v-else class="flex justify-between align-center" @click="chooseCoupon">
								<text style="color: #E24f39; padding: 4rpx 5rpx 6rpx 15rpx; font-size: 25rpx;">
									-￥{{payDetail.discountAmount}}
								</text>
								<uni-icons type="forward" size="13"></uni-icons>
							</view>
						</view>
					</view>
					<view class="flex justify-between my-divider"></view>
					<view class="price-detail flex align-center justify-end" style="margin-top: 10px;">
						<view style="margin-right: 8px;">
							<text style="font-size: 15px; font-weight: 340;">原价</text>
							<text style="color: #000000; font-size: 18px;">￥{{payDetail.originalFee % 1 == 0 ? payDetail.originalFee + '.0' : payDetail.originalFee}}</text>
						</view>
						<view style="margin-right: 20px;">
							<text style="font-size: 15px; font-weight: 340;">已优惠</text>
							<text style="color: #E24f39; font-size: 18px;">￥{{payDetail.discountAmount % 1 == 0 ? payDetail.discountAmount + '.0' : payDetail.discountAmount}}</text>
						</view>
					</view>
					<view class="price-detail flex align-center justify-end">
						<view style="margin-right: 20px; margin-bottom: 10px;">
							<text style="font-size: 15px; font-weight: 340;">小计￥</text>
							<text style="color: #000000; font-size: 25px;">{{payDetail.totalFee % 1 == 0 ? payDetail.totalFee + '.0' : payDetail.totalFee}}</text>
						</view>
					</view>
				</view>
				<view class="bg-main main-btn" style="width: 80%; margin: 0px auto 0 auto;" hover-class="bg-main-hover" type="default" @click="confirmPay">
					确认支付
				</view>
				<view class="flex justify-center align-center" style="margin: 20px auto 0 auto;">
					<text style="color: #9C9C9C;" class="iconfont icon-tips"></text>
					<text style="color: #9C9C9C; font-size: 11px;">请在点击后的15分钟内完成支付，否则会重新计时哦！</text>
				</view>
			</view>
		</view>
		<wyb-popup ref="popup" type="bottom" height="400" width="500" radius="6" :showCloseIcon="true">
		    <view>
		        <view class="flex align-center justify-center" style="margin-top: 15rpx;">
					收费标准说明
				</view>
				<view style="font-size: 13px; padding: 20px 15px 15px 15px;">
					停车场以半小时为时间单位进行收费，不足半小时按照半小时进行收费，否则按照一小时进行收费。
				</view>
				<view style="font-size: 13px; padding: 0px 15px 15px 15px;">
					如：某车场每小时收费3元，停15分钟收费1.5元，停45分钟收费3元，依此类推。
				</view>
		    </view>
		</wyb-popup>
	</view>
</template>


<script>
	import moment from 'moment'
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		components: {
		    wybPopup
		},
		data() {
			return {
				payDetail: {},
			}
		},
		computed:{
			enterTime() {
				let formatTime = moment(parseInt(this.payDetail.startTime * 1000)).format('YYYY-MM-DD hh:mm:ss')
				return formatTime;
			},
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			showHelp() {
				this.$refs.popup.show()
			},
			getPayDetail(plate, discountAmount = 0.0) {
				this.$api.getPayDetail({
					plate: plate,
					discountAmount: discountAmount
				}).then(res => {
					console.log(res)
					this.payDetail = res.payDetail
				})
			},
			confirmPay() {
				uni.showLoading({
					title: '创建订单中...',
					mask: false
				});
				this.$api.createOrder({
					userId: this.user.id,
					totalFee: this.payDetail.totalFee * 100,
					carParkId: this.payDetail.carParkId,
					plate: this.payDetail.plate,
					recordId: this.payDetail.recordId,
					originalFee: this.payDetail.originalFee * 100,
					discountAmount: this.payDetail.discountAmount * 100,
				}).then(res => {
					uni.hideLoading()
					let orderNo = res.order.orderNo
					uni.showModal({
						content: '是否确认支付？',
						showCancel: true,
						success: res => {
							if(res.confirm) {
								this.$api.payOrder({
									orderNo: orderNo
								}).then(res => {
									uni.showToast({
										title: '支付成功',
										icon: 'none'
									});
									uni.navigateBack({
										delta:1
									})
								})
							} else {
								console.log("取消支付")
								this.navigateTo("/pages/order-detail/order-detail?orderNo=" + orderNo)
							}
						},
					});
				})
			},
			chooseCoupon() {
				uni.navigateTo({
					url:'../choose-coupon/choose-coupon?originalFee=' + this.payDetail.originalFee + '&plate=' + this.payDetail.plate
				})
			}
		},
		onLoad(option) {
			if(option) {
				this.getPayDetail(option.plate)
			} else {
				let pages = getCurrentPages()
				let curPage = pages[pages.length - 1]
				console.log("车牌：" + curPage.data.plate)
				console.log("优惠金额：" + curPage.data.discountAmount)
				this.getPayDetail(curPage.data.plate, curPage.data.discountAmount)
			}
		},
	}
</script>

<style>
.detail-bg {
	background-image: linear-gradient(#5CCC84 0%, #3CB371 100%);
	/* background-color: #5ccc84; */
	height: 350rpx;
	width: 750rpx;
	position: fixed;
	left: 0;
	right: 0;
}
.detail-container {
	width: 100%;
	position: absolute;
	top: 350rpx;
	bottom: 0;
	left: 0;
	background-color: #f8f8fa;
}
.detail-parking {
	background-color: #fefefe;
	margin: -25px auto 0 auto;
	width: 80%;
	height: 450px;
	border-radius: 10px;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
.parking-status {
	width: auto;
	height: 40rpx;
	background-color: #84cb86;
	border-radius: 10px;
}
.coupon {
	width: auto;
	height: 40rpx;
	background-color: #f5e0aa;
	border-radius: 10px;
}
.my-divider {
	margin-top: 15px;
	border: 0;
	height: 1px;
	background: #F1F1F1;
	margin-right: 20px;
}
.price-detail {
	height: 70rpx;
	width: 100%;
}
</style>

