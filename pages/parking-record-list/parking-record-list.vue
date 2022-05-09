<template>
	<view class="flex-colum">
		<view class="tabs">
			<tab :tabs="tabs" :current="current" @change="clickTab"></tab>
		</view>
		<view class="search-list" style="margin-bottom: 30px;">
			<view class="record-item flex-column"  v-for="(item, index) in list" :key="index">
				<view class="flex align-center justify-between">
					<view class="flex-colum" style="margin-left: 15px;">
						<view style="color: #1a191a; font-weight: bold; font-size: 16px;">
							{{item.plate}}<uni-icons type="forward" size="15"></uni-icons>
						</view>
						<view style="color: #989799; font-size: 14px; margin-top: 8px;">
							{{item.carParkName}}
						</view>
						<view style="margin-top: 5px;">
							<text style="color: #DE5C5A; font-size: 14px;">￥{{item.carParkPrice}}/h</text>
						</view>
						<view style="margin-top: 5px;">
							<text style="color: #007AFF; font-size: 13px;">于 {{item.createTime}} 进入</text>
						</view>
						<view v-if="item.leftTime != null" style="margin-top: 5px;">
							<text style="color: #fbc02d; font-size: 13px;">于 {{item.leftTime}} 离开</text>
						</view>
					</view>
					<view class="record-status flex align-center justify-center">
						<text style="color: #F0F0F0; font-size: 13px; padding: 8rpx 15rpx 8rpx 15rpx;">{{item.status == 1 ? '正停' : '已停'}}</text>
					</view>
				</view>
				<view class="flex align-center justify-center" style="margin-top: 8px;">
					<view class="detail-button flex align-center justify-center" @click="navigateTo('/pages/parking-detail/parking-detail?id=' + item.carParkId)">
						<text style="color: #84cb86; font-size: 13px; padding: 5rpx 30rpx 5rpx 30rpx;">
							车场详情
						</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0" class="no-car flex align-center justify-center flex-column">
			<image src="../../static/noPlate.png" style="width: 130px; height: 100px;"></image>
			<text class="text-light-muted" style="font-size: 12px; margin: 20px 0 80px 0;">哎呀，暂未存在相关记录！</text>
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
				current: 0,
				tabs: [{
					name: '全部',
					list: [],
					page: 1,
					type: 'all'
					
				},{
					name: '正停',
					list: [],
					page: 1,
					type: 'notEnter'
				},{
					name: '已停',
					list: [],
					page: 1,
					type: 'hasEnter'
				}],
				list: [],
				parkingRecordList: []
			}
		},
		computed:{
			...mapState({
				user: state => state.user
			}),
		},
		methods: {
			getParkingRecordList() {
				this.$api.getParkingRecordList({
					userId: this.user.id
				}).then(res => {
					this.parkingRecordList = res.parkingRecordList
					this.list = this.parkingRecordList
					console.log(res)
				})
			},
			clickTab(index) {
				console.log(index)
				this.current = index
				if(index == 0) {
					this.list = this.parkingRecordList
				} else {
					this.list = this.parkingRecordList.filter(c => c.status == index)
				}
			},
		},
		created() {
			this.getParkingRecordList()
		}
	}
</script>

<style>
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
.record-item {
	margin: 20px auto 0px auto;
	background-color: #fefefe;
	height: auto;
	border-radius: 10px;
	width: 90%;
	padding: 15px 0 15px 0;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
.record-status {
	width: auto;
	height: 40rpx;
	background-color: #84cb86;
	border-radius: 10px;
	margin-right: 15px;
}
.detail-button {
	width: auto;
	height: 50rpx;
	border-style: solid;
	border-width: 1px;
	border-color: #84cb86;
	border-radius: 30px;
}
.no-car {
	position: absolute;
	top: 8%;
	height: 88%;
	width: 100%;
}
</style>
