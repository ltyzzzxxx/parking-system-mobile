<template>
	<view class="flex-column">
		<view class="search">
			<view class="search-parking flex align-center">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<text style="color: #8b8c8b; margin-left: 8px; font-size: 14px;" @click="back">搜索附近停车场</text>
			</view>
		</view>
		<view v-if="loading">
			<zero-loading mask="true"></zero-loading>
		</view>
		<view v-else>
			<view v-if="carParkList.length > 0">
				<view class="search-list" style="margin-bottom: 30px;">
					<view class="parking-item flex justify-between"  v-for="(item, index) in carParkList">
						<view class="flex flex-column" style="margin-left: 15px;" @click="navigateTo('/pages/parking-detail/parking-detail?id=' + item.id)">
							<view style="color: #1a191a; font-weight: bold; margin-top: 15px; font-size: 16px;">{{item.name}}</view>
							<view style="color: #989799; font-size: 12px; margin-top: 8px;">
								{{item.distance/1000}}km | {{item.address.length > 12 ? item.address.slice(0,12) + "..." : item.address}}
							</view>
							<view style="color: #ee7d7a; font-size: 13px; margin-top: 8px;">￥{{item.price}}元/小时</view>
							<view style="color: #84cb86; font-size: 13px; margin-top: 8px;">车位数{{item.carNum}} | 可用{{item.leftCarNum}}</view>
						</view>
						<view style="margin: auto 20px auto 0" @click="openMap(item.latitude, item.longitude)">
							<image src="../../static/nav.png" style="width: 30px; height: 30px;" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-else class="no-carpark flex align-center justify-center flex-column">
				<image src="../../static/noCarpark.png" style="width: 120px; height: 100px;"></image>
				<text class="text-light-muted" style="font-size: 12px; margin: 20px 0 80px 0;">系统中暂时未找到该相关车场！</text>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				carParkList: [],
				loading: false
			}
		},
		methods: {
			back() {
				console.log("返回")
				uni.navigateBack({
					delta:1
				})
			},
			getListByKeyword(latitude, longitude, keyword) {
				this.$api.getCarParkListByKeyword({
					latitude: latitude,
					longitude: longitude,
					keyword: keyword
				}).then(res => {
					console.log(res)
					this.carParkList = res.list
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
			}
		},
		onLoad(option) {
			this.loading = true
			uni.getLocation({
				type: 'wgs84',
				success: (res) => {
					console.log("您当前的位置信息", res)
					this.latitude = res.latitude
					this.longitude = res.longitude
					let latitude = this.latitude
					let longitude = this.longitude
					this.getListByKeyword(latitude + '', longitude + '', option.keyword);
					this.loading = false
				}
			});
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
	display: flex;
	flex-direction: column;
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
.no-carpark {
	position: absolute;
	top: 0%;
	height: 88%;
	width: 100%;
}
</style>
