<template>
	<view class="flex-column">
		<view class="detail-bg">
			<view class="flex justify-between" style="margin: 20px 0 0 20px; ">
				<view>
					<view style="color: white; font-size: 18px; font-weight: 400;">{{carPark.name}}</view>
					<view class="flex-column" style="margin-top: 15px;">
						<view class="flex">
							<text style="color: #EEEFF5" class="iconfont icon-zuobiao"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">{{carPark.address}}</text>
						</view>
						<view class="flex" style="margin-top: 14px;">
							<text style="color: #EEEFF5" class="iconfont icon-type"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">商业停车场</text>
						</view>
						<view class="flex" style="margin-top: 14px;">
							<text style="color: #EEEFF5" class="iconfont icon-shouye"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">{{carPark.contactPhone}}</text>
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
					<view style="color: #323133; font-weight: bold;">车场信息</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>总车位数</view>
						<view style="margin-right: 20px;">{{carPark.carNum}}</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>可用车位数</view>
						<view style="margin-right: 20px;">{{carPark.leftCarNum}}</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>收费价格</view>
						<view style="margin-right: 20px;">￥{{carPark.price}}/h</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>入口数</view>
						<view style="margin-right: 20px;">{{carPark.entranceNum}}</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>出口数</view>
						<view style="margin-right: 20px;">{{carPark.exitNum}}</view>
					</view>
					
				</view>
				<view class="bg-main main-btn" style="width: 80%; margin: 20px auto 0 auto;" hover-class="bg-main-hover" type="default" @click="makeAppointment">
					预&nbsp;&nbsp;&nbsp;约
				</view>
				<view class="flex justify-center align-center" style="margin: 20px auto 0 auto;">
					<text style="color: #9C9C9C;" class="iconfont icon-tips"></text>
					<text style="color: #9C9C9C; font-size: 11px;">请在确认预约后的15分钟内抵达车场，否则会自动取消哦！</text>
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
				carPark: {}
			}
		},
		computed:{
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			getCarParkById(id) {
				this.$api.getCarParkById({
					id: id
				}).then(res => {
					console.log(res)
					this.carPark = res.carPark
				})
			},
			openMap(latitude, longitude) {
				uni.openLocation({
					latitude:latitude,
					longitude:longitude,
					scale:12,
				})
				var map = uni.createMapContext('map');
				map.moveToLocation()
			},
			makeAppointment() {
				if(!this.user) {
					uni.navigateTo({
						url: '../login/login',
					});
				}
				this.$api.makeAppointment({
					userId: this.user.id,
					carParkId: this.carPark.id
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: '您已成功预约！',
						icon:'none'
					});
				})
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.getCarParkById(option.id + "")
		}
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
	height: 370px;
	border-radius: 10px;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
</style>
