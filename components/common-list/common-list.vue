<template>
	<view style="width: 372.5rpx;" @click="openDetail">
		<image :src="item.imageUrl" style="width: 372.5rpx; height: 270rpx;" lazy-load></image>
		<view style="padding: 5px 5px 5px 20px;">
			<view><text class="font-md">{{item.name.length > 12 ? item.name.slice(0,12) + "..." : item.name}}</text></view>
			<text class="d-block font" style="color: #c9c9c9; margin-top: 5px;">{{item.tags}}</text>
			<view class="d-flex py-1">
				<price :text="10"></price>
				<view class="ml-1 a-self-end line-h" >
					<text class="font-sm line-through" style="color: #c9c9c9;">
					￥20
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:[Number,String],
			type:{
				type:String,
				default:"navigateTo"
			}
		},
		methods: {
			openDetail() {
				// uni[this.type]({
				// 	url:"/pages/detail/detail?detail="+JSON.stringify(this.item)
				// })
			}
		},
	}
</script>

<style>
	.p-2 {padding-left: 20upx;padding-right: 20upx;padding-top: 20upx;padding-bottom: 20upx;}
	.pt-1 { padding-top: 10upx;}
	.d-block{ display: block; }
	.font{ font-size: 25upx; }
	.font-md{ font-size: 30upx; }
	.text-light-muted{ color: var(--lightmuted)!important; }
	.d-flex{ display: flex;flex-direction: row!important; }
	.py-1 { padding-top: 10upx;padding-bottom: 10upx;}
	.ml-1 { margin-left: 10upx;}
	.a-self-end{ align-self: flex-end; }
	.line-h{ line-height: 1!important; }
	.font-sm{ font-size: 22upx; }
	.line-through{ text-decoration: line-through; }
</style>
