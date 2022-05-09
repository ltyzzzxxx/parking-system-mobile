<template>
	<view class="flex flex-wrap py-2">
		<view class="flex flex-column align-center justify-center py-1" style="width: 25%;" v-for="(item,index) in list"
			:key="index" hover-class="bg-light" @click="open(item.url)">
			<image :src="item.src" mode="widthFix" style="width: 70rpx; height: 70rpx; border-radius: 100%;"></image>
			<text class="font-sm text-muted mt-1">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "icon-nav",
		props: {
			list: Array,
		},
		data() {
			return {

			};
		},
		methods: {
			open(url) {
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>

</style>
