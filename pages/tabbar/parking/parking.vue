<template>
	<view>
		<map id="map" ref="map" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers" @regionchange="regionChange">
			<view class="search-parking flex align-center" @click="navigateTo('/pages/search-parking/search-parking')">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<text style="color: #8b8c8b; margin-left: 8px; font-size: 14px;">搜索附近停车场</text>
			</view>
			<uni-list class="parking-list flex-column">
				<uni-list-item v-for="(item, index) in nearestList">
					<view slot="body">
						<view>
							<text>{{item.name}}</text>
						</view>
						<view>
							<text style="color: #9a9a9b; font-size: 12px;">{{item.address}}</text>
						</view>
						<view>
							<text style="color: #007AFF; font-size: 12px;">距我&nbsp;{{ item.distance / 1000 }}&nbsp;km</text>
						</view>
						<view>
							<text style="color: #DE5C5A; font-size: 12px;">￥{{item.price}}/h</text>
						</view>
					</view>
					<view slot="footer">
						<view style="position: absolute; right: 8%; top: 45%;" @click="openMap(item.latitude, item.longitude)">
							<image src="../../../static/nav.png" style="width: 20px; height: 20px;" mode="aspectFit">
							</image>
						</view>
					</view>
				</uni-list-item>
			</uni-list>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nearestList: [],
				latitude: 30.513985,
				longitude: 114.343979,
				covers: [{
					latitude: 30.513985,
					longitude: 114.343979,
					iconPath: '../../../static/p-coordinate.png',
					width: 30,
					height: 30
				}, {
					latitude: 30.533985,
					longitude: 114.346979,
					iconPath: '../../../static/p-coordinate.png',
					width: 30,
					height: 30
				}, {
					latitude: 30.413985,
					longitude: 114.353979,
					iconPath: '../../../static/p-coordinate.png',
					width: 30,
					height: 30
				}, {
					latitude: 30.512985,
					longitude: 114.344979,
					iconPath: '../../../static/p-coordinate.png',
					width: 30,
					height: 30
				}, {
					latitude: 30.515985,
					longitude: 114.343979,
					iconPath: '../../../static/p-coordinate.png',
					width: 30,
					height: 30
				}, {
					latitude: 30.513685,
					longitude: 114.344979,
					iconPath: '../../../static/p-coordinate.png',
					width: 30,
					height: 30
				}, ]
			}
		},
		methods: {
			getAllCarPark() {
				this.$api.getCarParkList().then(res => {
					console.log(res)
					this.covers = []
					let that = this
					res.carParkList.forEach(c => {
						let cover = {
							latitude: '',
							longitude: '',
							iconPath: '../../../static/p-coordinate.png',
							width: 30,
							height: 30
						}
						cover.latitude = c.latitude
						cover.longitude = c.longitude
						that.covers.push(cover)
					})
				})
			},
			getAuthorizeInfo() {
				uni.authorize({
					scope: 'scope.userLocation',
					success: () => {
						this.getLocationInfo()
					},
					fail: () => {
						this.openConfirm()
						console.log("你拒绝了授权，显示默认武汉理工大学鉴湖校区")
					}
				})
			},
			// 获取地理位置
			getLocationInfo() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						console.log("您当前的位置信息", res)
						this.latitude = res.latitude
						this.longitude = res.longitude
						let latitude = this.latitude
						let longitude = this.longitude
						this.getNearestCarParks(latitude + '', longitude + '');
					}
				});
			},
			// 再次获取授权
			// 当用户第一次拒绝后再次请求授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '您拒绝了授权，无法获得周边信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},
			getNearestCarParks(latitude, longitude) {
				this.$api.getNearestCarParks({
					latitude: latitude,
					longitude: longitude
				}).then(res => {
					this.nearestList = res.nearestList
				})
			},
			regionChange(e) {
				if(e.type == 'end') {
					console.log("拖拽结束")
					let mapCtx = uni.createMapContext("map", this);
					mapCtx.getCenterLocation({
						success:res => {
							this.getNearestCarParks(res.latitude + '', res.longitude + '');
						}
					})
				}
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
		created() {
			this.getAllCarPark()
		},
		onShow() {
			this.getAuthorizeInfo()
		}
	}
</script>

<style>
	.search-parking {
		position: absolute;
		top: 3%;
		right: 4%;
		left: 4%;
		border-radius: 50px;
		width: 92%;
		height: 6%;
		background-color: #fefefe;
	}

	.parking-list {
		position: absolute;
		bottom: 3%;
		right: 5%;
		left: 5%;
		border-radius: 10px;
		width: 90%;
		height: 30%;
		background-color: #fefefe;
		overflow: auto;
	}

	.parking-item {
		width: 100%;
		height: 100px;
	}
</style>
