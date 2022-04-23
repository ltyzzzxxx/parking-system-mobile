<template>
	<view class="flex-column">
		<view class="search">
			<view class="search-order flex align-center">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<input v-model="plate" style="color: #8b8c8b; margin-left: 8px; font-size: 14px;" type="search"
					@confirm="searchOrder" placeholder="根据车牌号搜索订单" />
			</view>
		</view>
		<view class="search-list" style="margin-bottom: 30px;">
			<view class="order-item flex justify-between align-center" v-for="(item, index) in orderList" :key="index" @click="navigateTo('/pages/order-detail/order-detail?orderNo=' + item.orderNo)">
				<view class="flex flex-column" style="margin-left: 15px;">
					<view style="color: #1a191a; font-weight: bold; font-size: 16px;">
						{{item.plate}}<uni-icons type="forward" size="15"></uni-icons>
					</view>
					<view style="color: #989799; font-size: 12px; margin-top: 8px;">
						{{item.carParkName}}
					</view>
					<view style="color: #ee7d7a; font-size: 13px; margin-top: 8px;">停车{{item.duration}}</view>
					<view style="color: #989799; font-size: 12px; margin-top: 8px;">
						{{item.payTime}}
					</view>
				</view>
				<view class="flex flex-column justify-end" style="margin-right: 15px;">
					<view style="color: #989998; font-size: 13px; margin-left: auto;">{{item.orderStatus === 0 ? '已支付' : item.orderStatus === 1 ? '待支付' : '已取消'}}</view>
					<view style="color: #84cb86; font-size: 13px; margin-top: 8px;">小计￥{{(item.totalFee) / 100 % 1 == 0 ? item.totalFee / 100 + '.0' : item.totalFee / 100}}</view>
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
				orderList: [],
				plate: '',
			}
		},
		computed:{
			...mapState({
				user: state => state.user
			}),
		},
		methods: {
			getOrderList() {
				this.$api.getOrderList({
					userId: this.user.id
				}).then(res => {
					console.log(res)
					this.orderList = res.orderList
				})
			},
			searchOrder() {
				this.$api.getOrderList({
					userId: this.user.id,
					plate: this.plate
				}).then(res => {
					console.log(res)
					this.orderList = res.orderList
				})
			}
		},
		created() {
			this.getOrderList()
		},
		onShow() {
			this.getOrderList()
		}
	}
</script>

<style>
page {
	background-color: #f8f8fa;
}
.search {
	width: 100%;
	height: 80px;
	background-color: #fefefe;
}
.search-order {
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
	display: flex;
	flex-direction: column;
	background-color: #f8f8fa;
}
.order-item {
	margin: 20px auto 0px auto;
	background-color: #fefefe;
	height: auto;
	border-radius: 10px;
	width: 80%;
	padding: 15px 0 15px 0;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
.no-order {
	position: absolute;
	top: 0%;
	height: 88%;
	width: 100%;
}
</style>
