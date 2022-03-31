<template>
	<view class="flex-column">
		<view class="search">
			<view class="search-parking flex align-center">
				<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
				<input v-model="keyword" style="color: #8b8c8b; margin-left: 8px; font-size: 14px;" type="search"
					@confirm="searchParking" placeholder="搜索附近停车场" />
			</view>
		</view>
		<view>
			<view class="flex align-center justify-between py-3 px-2">
				<text class="font-md font-weight-bold">历史记录</text>
				<text class="font-sm text-light-muted" @click="clear">清除全部</text>
			</view>

			<view class="list">
				<view class="history-item" v-for="(item,index) in list" :key="index" @click="handleSearchEvent(item)">
					{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				list: []
			}
		},
		onLoad() {
			let list = uni.getStorageSync('historyKeyword')
			if (list) {
				this.list = JSON.parse(list)
			}
		},
		methods: {
			handleSearchEvent(value) {
				this.keyword = value
				// 跳转到搜索结果页
				uni.navigateTo({
					url: `/pages/search-result/search-result?keyword=${this.keyword}`
				});
				this.addHistory()
			},
			searchParking() {
				uni.navigateTo({
					url: `/pages/search-result/search-result?keyword=${this.keyword}`
				})
				this.addHistory()
			},
			addHistory() {
				if (this.keyword == '') {
					return
				}
				let index = this.list.findIndex(v => v == this.keyword)
				if (index != -1) {
					this.objToFirst(this.list, index)
				} else {
					this.list.unshift(this.keyword)
				}
				uni.setStorageSync('historyKeyword', JSON.stringify(this.list))
			},
			clear() {
				uni.showModal({
					content: '是否要清除搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.list = []
							uni.removeStorageSync('historyKeyword')
						}
					}
				});
			},
			objToFirst(arr, index) {
				if (index != 0) {
					arr.unshift(arr.splice(index, 1)[0])
				}
				return arr
			}
		}
	}
</script>

<style>
	.search {
		width: 100%;
		height: 80px;
		background-color: #f6f6f6;
	}

	.search-parking {
		position: absolute;
		top: 2.5%;
		right: 4%;
		left: 4%;
		border-radius: 50px;
		width: 92%;
		height: 6%;
		background-color: #fefefe;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
	}

	.history-item {
		margin: 0 5px 10px 10px;
		color: #8A8A8A;
		font-size: 28upx;
		box-sizing: border-box;
		text-align: center;
		padding: 20upx 20upx;
		border-top: 2upx solid #FFF;
		border-left: 2upx solid #FFF;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color: #F7F7F7;
	}
</style>
