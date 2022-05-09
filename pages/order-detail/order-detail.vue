<template>
	<view>
		<view class="detail-bg">
			<view class="flex align-center" style="margin: 10px 0 0 20px;">
				<view v-if="orderDetail.orderStatus === 0">
					<text style="color: white; font-size: 18px; font-weight: 400;">订单已支付</text>
					<uni-icons type="forward" size="15" color="white"></uni-icons>
				</view>
				<view class="flex align-center" v-else-if="orderDetail.orderStatus === 1">
					<text style="color: white; font-size: 18px; font-weight: 400;">
						订单待支付，剩余
					</text>
					<min-countdown :targetTime="targetTime" countdownClass="white" @callback="callback" style="margin-left: 2px;"></min-countdown>
					<uni-icons type="forward" size="15" color="white"></uni-icons>
				</view>
				<view v-else>
					<text style="color: white; font-size: 18px; font-weight: 400;">订单已取消</text>
					<uni-icons type="forward" size="15" color="white"></uni-icons>
				</view>
			</view>
		</view>
		<view class="detail-container">
			<view class="detail-order">
				<view v-if="orderDetail.orderStatus === 0" class="flex flex-column">
					<view style="color: #000000; font-size: 16px; font-weight: 400; margin: 14px 0 0 12px;">
						请在支付后15分钟内离开，否则将重新计时</view>
					<view class="my-divider" style="margin-right: 15px;"></view>
				</view>
				<view v-else-if="orderDetail.orderStatus === 1" class="flex flex-column">
					<view class="flex align-center " style="margin: 14px 0 0 12px;">
						<text style="color: #000000; font-size: 16px; font-weight: 400;">
							请尽快支付
						</text>
						<uni-icons style="margin-left: 10px;" type="sound" size="15" color="black"></uni-icons>
						<text style="font-size: 12px; font-weight: 350; ">
							15分钟内未支付，订单将自动取消
						</text>
					</view>
					<view class="my-divider" style="margin-right: 15px;"></view>
				</view>
				<view v-else class="flex flex-column">
					<view style="color: #000000; font-size: 16px; font-weight: 400; margin: 14px 0 0 12px;">你取消了订单
					</view>
					<view class="my-divider" style="margin-right: 15px;"></view>
				</view>
				<view class="flex" v-if="orderDetail.orderStatus === 0 || orderDetail.orderStatus === 2">
					<view class="flex-1 flex flex-column align-center justify-center py-3" hover-class="bg-light">
						<uni-icons type="phone" size="23"></uni-icons>
						<text class="font-sm mt-1 text-secondary" @click="makePhoneCall">联系客服</text>
					</view>
				</view>
				<view v-else class="flex">
					<view class="flex-1 flex flex-column align-center justify-center py-3" hover-class="bg-light">
						<uni-icons type="wallet" size="23"></uni-icons>
						<text class="font-sm mt-1 text-secondary" @click="continuePay">继续支付</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center py-3" hover-class="bg-light">
						<uni-icons type="closeempty" size="23"></uni-icons>
						<text class="font-sm mt-1 text-secondary" @click="cancelPay">取消订单</text>
					</view>
				</view>
			</view>
			<view class="detail-order2">
				<view style="margin: 0 0 0 20px; padding-top: 15px;">
					<view class="flex flex-column">
						<view style="color: #323133; font-weight: bold;">订单详情</view>
						<view style="border: 0; height: 1px; background-color: #F1F1F1; margin: 15px 15px 0 0px;">
						</view>
					</view>
					<view class="flex justify-between"
						style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>车牌号</view>
						<view style="margin-right: 20px;">{{orderDetail.plate}}</view>
					</view>
					<view class="flex justify-between"
						style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>车场</view>
						<view style="margin-right: 20px;">{{orderDetail.carParkName}}</view>
					</view>
					<view class="flex justify-between"
						style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>
							收费标准
							<uni-icons type="help" size="15" style="margin-left: 6rpx;" @click="showHelp"></uni-icons>
						</view>
						<view style="margin-right: 20px;">￥{{orderDetail.carParkPrice}}/h</view>
					</view>
					<view class="flex justify-between"
						style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>进入时间</view>
						<view style="margin-right: 20px;">{{enterTime}}</view>
					</view>
					<view class="flex justify-between"
						style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>订单号码</view>
						<view style="margin-right: 20px;">{{orderDetail.orderNo}}</view>
					</view>
					<view class="flex justify-between"
						style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>下单时间</view>
						<view style="margin-right: 20px;">{{orderDetail.payTime}}</view>
					</view>
					<view style="border: 0; height: 1px; background-color: #F1F1F1; margin: 15px 15px 0 0px;"></view>
					<view class="price-detail flex align-center justify-end" style="margin-top: 10px;">
						<view style="margin-right: 8px;">
							<text style="font-size: 15px; font-weight: 340;">原价</text>
							<text
								style="color: #000000; font-size: 18px;">￥{{(orderDetail.originalFee) / 100 % 1 == 0 ? orderDetail.originalFee / 100 + '.0' : orderDetail.originalFee / 100}}</text>
						</view>
						<view style="margin-right: 20px;">
							<text style="font-size: 15px; font-weight: 340;">已优惠</text>
							<text
								style="color: #E24f39; font-size: 18px;">￥{{(orderDetail.discountAmount) / 100 % 1 == 0 ? orderDetail.discountAmount / 100 + '.0' : orderDetail.discountAmount / 100}}</text>
						</view>
					</view>
					<view class="price-detail flex align-center justify-end">
						<view style="margin-right: 20px; margin-bottom: 10px;">
							<text style="font-size: 15px; font-weight: 340;">小计￥</text>
							<text
								style="color: #000000; font-size: 25px;">{{(orderDetail.totalFee) / 100 % 1 == 0 ? orderDetail.totalFee / 100 + '.0' : orderDetail.totalFee / 100}}</text>
						</view>
					</view>
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
	import minCountdown from '@/components/min-countdown/min-countdown.vue'
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
	export default {
		components: {
			wybPopup,
			minCountdown
		},
		data() {
			return {
				orderDetail: {},
				orderNo: '',
				targetTime: ''
			}
		},
		computed: {
			enterTime() {
				let formatTime = moment(parseInt(this.orderDetail.startTime * 1000)).format('yyyy-MM-DD HH:mm:ss')
				return formatTime;
			},
		},
		methods: {
			callback() {
				this.getOrderDetail(this.orderNo)
			},
			continuePay() {
				uni.showModal({
					content: '是否确认支付？',
					showCancel: true,
					success: res => {
						if (res.confirm) {
							this.$api.payOrder({
								orderNo: this.orderNo
							}).then(res => {
								uni.showToast({
									title: '支付成功',
									icon: 'none'
								});
								this.getOrderDetail(this.orderNo)
							})
						} else {
							console.log("取消支付")
						}
					},
				});
			},
			cancelPay() {
				uni.showModal({
					content: '是否取消订单？',
					showCancel: true,
					success: res => {
						if (res.confirm) {
							this.$api.cancelOrder({
								orderNo: this.orderNo
							}).then(res => {
								uni.showToast({
									title: '取消订单成功',
									icon: 'none'
								});
								this.getOrderDetail(this.orderNo)
							})
						}
					},
				});
			},
			makePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: '19903581356',
					success: (res) => {
						console.log("调用成功")
					},
					fail: (err) => {
						console.log("调用失败")
					}
				})
			},
			showHelp() {
				this.$refs.popup.show()
			},
			getOrderDetail(orderNo) {
				this.$api.getOrderDetail({
					orderNo: orderNo
				}).then(res => {
					console.log(res)
					this.orderDetail = res.orderDetail
					if (this.orderDetail.orderStatus === 1) {
						this.setOrderInvalidationTime(this.orderDetail.payTime)
					}
				})
			},
			setOrderInvalidationTime(payTime) {
				let date = payTime
				date = date.substring(0, 19);
				date = date.replace(/-/g, '/'); //必须把日期'-'转为'/'
				this.targetTime = new Date(date).getTime() + 900000
			},
		},
		onLoad(option) {
			console.log(option.orderNo)
			this.orderNo = option.orderNo
			this.getOrderDetail(option.orderNo)
		}
	}
</script>

<style>
	.detail-bg {
		background-image: linear-gradient(#5CCC84 0%, #3CB371 100%);
		/* background-color: #5ccc84; */
		height: 220rpx;
		width: 750rpx;
		position: fixed;
		left: 0;
		right: 0;
	}

	.detail-container {
		width: 100%;
		position: absolute;
		top: 220rpx;
		bottom: 0;
		left: 0;
		background-color: #f8f8fa;
	}

	.detail-order {
		background-color: #fefefe;
		margin: -70px auto 0 auto;
		width: 90%;
		height: 130px;
		border-radius: 10px;
		box-shadow: 10px 20px 20px -20px #eeeff5;
	}

	.detail-order2 {
		background-color: #fefefe;
		margin: 15px auto 0 auto;
		width: 90%;
		height: auto;
		border-radius: 10px;
		padding-bottom: 15px;
		box-shadow: 10px 20px 20px -20px #eeeff5;
	}

	.my-divider {
		border: 0;
		height: 1px;
		background: #F1F1F1;
		margin: 15px 5px 0 5px;
	}

	.price-detail {
		height: 70rpx;
		width: 100%;
	}
	
	.white {
	  color: white;
	  font-size: 18px;
	}
</style>
