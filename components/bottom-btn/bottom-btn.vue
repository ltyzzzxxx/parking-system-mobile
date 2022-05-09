<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="d-flex a-stretch bg-white position-fixed left-0 right-0"
		style="height: 100rpx; z-index: 100; bottom: 10px;">
			<view class="flex-1 d-flex flex-column align-center justify-center line-h-md" hover-class="bg-light-secondary">
				<view class="iconfont icon-xihuan text-muted line-h-md"></view>
				打分
			</view>
			<view class="d-flex justify-center align-center font-md main-bg-color text-white" hover-class="main-bg-hover-color" style="flex: 2.5;">
				加入购物车
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		methods: {
			
		},
	}
</script>

<style>
.d-flex{ display: flex;flex-direction: row!important; }
.a-stretch{ align-items: stretch; }
.bg-white{ background-color: var(--white)!important; }
.line-h-md{ line-height: 1.5!important; }
.bg-light-secondary{background-color: #F1F1F1!important;}
.main-bg-color{ background-color: #FD6801; }
.main-bg-hover-color{ background-color: rgba(253,104,1,0.85); }
</style>
