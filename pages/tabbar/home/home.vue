<template>
	<view class="animate__animated animate__fadeInDown">
		<view class="home-bg"></view>
		<view class="position-relative">
			<view class="flex p-3" v-if="!user" @click="navigateTo('/pages/login/login')" open-type="getUserInfo">
				<image src="/static/parking_lot.png" style="width: 120rpx; height: 120rpx;"
					class="rounded-circle bg-light"></image>
				<view class="flex flex-column pl-3 flex-1 text-white">
					<view class="font-md mb-2">立即登录</view>
					<view class="font-sm">登录解锁更多功能</view>
				</view>
			</view>

			<view class="flex align-center p-3" v-else @click="authJump('/pages/user-info/user-info')">
				<image :src="user.avatar" style="width: 120rpx; height: 120rpx;" class="rounded-circle bg-light">
				</image>
				<view class="flex flex-column pl-3 flex-1 text-white">
					<view class="font-md mb-2">{{user.name}}</view>
					<view class="font-sm">{{'我是一个小可爱！'}}</view>
				</view>
				<text class="iconfont icon-leimupinleifenleileibie text-white"></text>
			</view>

			<icons-card :icons='icons'></icons-card>
			<view class="px-3">
				<uni-list :border="false">
					<uni-list-item clickable title="自助缴费" @click="searchCarForPay" showArrow>
						<text slot="header" class="iconfont icon-zizhujiaofei mr-2"
							style="font-size: 20px; color: #4396ec;"></text>
					</uni-list-item>
					<uni-list-item clickable title="停车记录" @click="toParkingRecodList" showArrow>
						<text slot="header" class="iconfont icon-jilu mr-2"
							style="font-size: 20px; color: #4396ec;"></text>
					</uni-list-item>
					<uni-list-item clickable title="预约记录" @click="toAppointmentRecordList" showArrow>
						<text slot="header" class="iconfont icon-yuyue mr-2"
							style="font-size: 20px; color: #4396ec;"></text>
					</uni-list-item>
					<uni-list-item clickable title="账单记录" @click="toOrderList" showArrow>
						<text slot="header" class="iconfont icon-zhangdan mr-2"
							style="font-size: 20px; color: #4396ec;"></text>
					</uni-list-item>

					<view class="divider"></view>

					<uni-list-item clickable title="联系客服" @click="makePhoneCall" showArrow>
						<text slot="header" class="iconfont icon-kefu mr-2"
							style="font-size: 20px; color: #4396ec;"></text>
					</uni-list-item>
					<uni-list-item clickable title="退出登录" showArrow @click="logout">
						<text slot="header" class="iconfont icon-tuichu mr-2"
							style="font-size: 20px; color: #4396ec;"></text>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		data() {
			return {
				icons: [{
					icon: 'icon-qiche',
					name: '我的爱车',
					path: '/pages/my-car/my-car'
				}, {
					icon: 'icon-youhuiquan',
					name: '我的优惠券'
				}, {
					icon: 'icon-xiaoxi',
					name: '我的消息'
				}]
			}
		},
		onNavigationBarButtonTap() {
			this.navigateTo("/pages/setting/setting")
		},
		methods: {
			toParkingRecodList() {
				this.authJump('../../parking-record-list/parking-record-list')
			},
			toAppointmentRecordList() {
				this.authJump('../../appointment-record-list/appointment-record-list')
			},
			toOrderList() {
				this.authJump('../../order-list/order-list')
			},
			searchCarForPay() {
				this.authJump('../../search-car/search-car')
			},
			openLogin() {
				this.navigateTo('../../login/login')
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
			logout() {
				uni.showModal({
					content: '是否要退出登录？',
					success: (res) => {
						if (res.cancel) {
							return
						}
						// this.$api.logout()
						this.$store.dispatch('logout').then(res => {
							this.$toast('退出登录成功')
						})
					}
				});
			}
		}
	}
</script>

<style>
	.home-bg {
		background-color: #5CCC84;
		height: 350rpx;
		width: 750rpx;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		position: fixed;
		left: 0;
		right: 0;
	}
</style>
