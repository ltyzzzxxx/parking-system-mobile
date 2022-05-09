<template>
	<view>
		<view class="search-product flex align-center">
			<uni-icons type="search" size="20" style="color: #1A1a19; margin-left: 14px;"></uni-icons>
			<text style="color: #8b8c8b; margin-left: 8px; font-size: 14px;">搜索商品</text>
		</view>
		
		<view style="margin-top: 50px;">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 350rpx;">
				<swiper-item class="flex justify-center" v-for="(item,index) in swiper" :key="index">
					<image :src="item.src" style="width: 720rpx;height: 350rpx;" class="rounded shadow">
					</image>
				</swiper-item>
			</swiper>
		</view>
		
		<uni-section title="最热商品" type="line" padding>
			<uni-grid :column="3" :show-border="false" :square="false" @change="change">
				<uni-grid-item v-for="(item, index) in hotProducts" :index="item.productId" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<image :src="item.imageUrl" mode="widthFix" style="width: 200rpx;height: 300rpx;" class="rounded shadow"></image>
						<view class="flex justify-center align-center" style="width: 200rpx; height: 100rpx; padding: 10px 0 10px 0;">
								<text class="text">{{item.name.length > 12 ? item.name.slice(0,12) + "..." : item.name}}</text>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
		
		<uni-section title="评分最多" type="line" padding>
			<uni-grid :column="3" :show-border="false" :square="false" @change="change">
				<uni-grid-item v-for="(item, index) in rateProducts" :index="item.productId" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<image :src="item.imageUrl" mode="widthFix" style="width: 200rpx;height: 300rpx;" class="rounded shadow"></image>
						<view class="flex justify-center align-center" style="width: 200rpx; height: 100rpx; padding: 10px 0 10px 0;">
								<text class="text">{{item.name.length > 12 ? item.name.slice(0,12) + "..." : item.name}}</text>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: [{
					src: "/static/demo/banner/ad1.png"
				}, {
					src: "/static/demo/banner/ad2.png"
				}],
				hotProducts: [],
				rateProducts: [],
			}
		},
		methods: {
			getProducts() {
				this.$api.getHotProducts().then(res => {
					console.log(res)
					this.hotProducts = res.hotProducts
				})
				this.$api.getRateProducts().then(res => {
					console.log(res)
					this.rateProducts = res.rateProducts
				})
			},
			change(e) {
				console.log(e)
				uni.navigateTo({
					url:"../product-detail/product-detail?id=" + e.detail.index
				})
			}
		},
		created() {
			this.getProducts()
		}
	}
</script>

<style>
.search-product {
	position: absolute;
	top: 2%;
	right: 4%;
	left: 4%;
	border-radius: 50px;
	width: 92%;
	height: 35px;
	background-color: #f8f8f7;
}
.grid-item-box {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
