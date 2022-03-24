<template>
	<view>
		<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
			<view class="search-parking flex align-center" @click="navigateTo('/pages/search-parking/search-parking')">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<text style="color: #8b8c8b; margin-left: 8px; font-size: 14px;">搜索附近停车场</text>
			</view>
			<uni-list class="parking-list flex-column">
					<uni-list-item v-for="i in 6">
						<view slot="body">
							<view>
								<text>鸿岭花园停车场</text>
							</view>
							<view>
								<text style="color: #9a9a9b; font-size: 12px;">湖北省武汉市武昌区瑞景路鸿岭花园</text>
							</view>
							<view>
								<text style="color: #DE5C5A; font-size: 12px;">￥3/h</text>
							</view>
						</view>
						<view slot="footer">
							<view style="position: absolute; right: 8%; top: 40%;">
								<image src="../../../static/nav.png" style="width: 20px; height: 20px;" mode="aspectFit"></image>
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
				},{
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
	bottom: 4%;
	right: 4%;
	left: 4%;
	border-radius: 10px;
	width: 92%;
	height: 25%;
	background-color: #fefefe;
	overflow: auto;
}
.parking-item {
	width: 100%;
	height: 100px;
}
</style>
