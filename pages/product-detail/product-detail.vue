<template>
	<view>
		<image style="width: 100%; height: 300px;" :src="product.imageUrl"></image>
		<view class="p-2">
			<view class="font-lg" style="margin-bottom: 5px;">{{product.name}}</view>
			<view class="font text-light-muted line-h-sm" style="margin-bottom: 5px;">
				{{product.tags}}
			</view>
			<price priceSize="font-lg" unitSize="font" :text="10"></price>
		</view>
		<card headTitle="相似推荐" :headTitleWeight="false"
		:headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item,index) in similarProducts"
				:key="index" :item="item" :index="index"
				type="redirectTo">
				</common-list>
			</view>
		</card>
		<bottom-btn></bottom-btn>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				product: {},
				similarProducts: [{
					productId: 62138,
					name: "砖叔汽车头枕S级迈巴赫颈椎枕头车用座椅车载靠垫靠枕护颈枕",
					imageUrl: "https://lty-1.oss-cn-hangzhou.aliyuncs.com/IMG_0598.PNG",
					score: null,
					categories: "枕头",
					tags: "装饰|护颈|柔弹|好用|舒适"
				},{
					productId: 75701,
					name: "【多功能车载野外手电筒】强光手电筒超亮充电户外军专用远射探照灯",
					imageUrl: "https://lty-1.oss-cn-hangzhou.aliyuncs.com/IMG_0600%2820220503-144649%29.JPG",
					score: null,
					categories: "手电筒|户外设备",
					tags: "生活|旅游|好用"
				},{
					productId: 302217,
					name: "Elizabeth Arden伊丽莎白雅顿绿茶香水50ml(进)(特卖)",
					imageUrl: "https://images-cn-4.ssl-images-amazon.com/images/I/41AAc8vsA5L._SY300_QL70_.jpg",
					score: null,
					categories: "彩妆|香水|美妆个护",
					tags: "化妆品|伊丽莎白|香水|好用|很香|到货速度快"
				},{
					productId: 13316,
					name: "汽车坐垫夏季凉垫单片座垫单个屁屁垫通风透气后座垫子木珠",
					imageUrl: "https://lty-1.oss-cn-hangzhou.aliyuncs.com/IMG_0590%2820220503-144531%29.JPG",
					score: null,
					categories: "坐垫",
					tags: "生活|保养|通风|透气|好用"
				}]
			}
		},
		methods: {
			getProductById(id) {
				this.$api.getProductById({
					id: id
				}).then(res => {
					console.log(res)
					this.product = res.product
				})
			},
			getSimilarProducts(id) {
				this.$api.getSimilarProducts({
					id: id
				}).then(res => {
					console.log(res)
					this.similarProducts = res.similarProducts
				})
			}
		},
		onLoad(option) {
			this.getProductById(option.id)
			this.getSimilarProducts(option.id)
		}
	}
</script>

<style>
.font-lg{ font-size: 40upx; }
.font{ font-size: 25upx; }
.line-h-sm{ line-height: 1.2!important; }
.text-light-muted{ color: var(--lightmuted)!important; }
</style>
