<template>
	<view class="flex-column">
		<view class="detail-bg">
			<view class="flex justify-between" style="margin: 20px 0 0 20px; ">
				<view>
					<view style="color: white; font-size: 18px; font-weight: 400;">103孵化器内部停车场</view>
					<view class="flex-column" style="margin-top: 15px;">
						<view class="flex">
							<text style="color: #EEEFF5" class="iconfont icon-zuobiao"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">湖北省武汉市蔡甸区经济技术开发区</text>
						</view>
						<view class="flex" style="margin-top: 14px;">
							<text style="color: #EEEFF5" class="iconfont icon-type"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">商业停车场</text>
						</view>
						<view class="flex" style="margin-top: 14px;">
							<text style="color: #EEEFF5" class="iconfont icon-shouye"></text>
							<text style="color: #EEEFF5; font-size: 12px; margin-left: 7px;">17712346666</text>
						</view>
					</view>
				</view>
				<view style="margin: 50px 40px auto 0;border-radius: 100%; background-color: white; width: 40px; height: 40px;">
					<image src="../../static/nav.png" style="width: 25px; height: 25px; margin: 5px 0 0 5px;" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="detail-container">
			<view class="detail-parking">
				<view style="margin: 0 0 0 20px; padding-top: 15px;">
					<view style="color: #323133; font-weight: bold;">车场信息</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>总车位数</view>
						<view style="margin-right: 20px;">300</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>可用车位数</view>
						<view style="margin-right: 20px;">150</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>收费价格</view>
						<view style="margin-right: 20px;">￥3/h</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>出口数</view>
						<view style="margin-right: 20px;">1</view>
					</view>
					<view class="flex justify-between" style="margin-top: 20px; color: #323133; font-weight: 350; font-size: 14px;">
						<view>入口数</view>
						<view style="margin-right: 20px;">2</view>
					</view>
					
				</view>
				<view class="bg-main main-btn" style="width: 80%; margin: 20px auto 0 auto;" hover-class="bg-main-hover" type="default" @tap="toBind">
					预&nbsp;&nbsp;&nbsp;约
				</view>
				<view class="flex justify-center align-center" style="margin: 20px auto 0 auto;">
					<text style="color: #9C9C9C;" class="iconfont icon-tips"></text>
					<text style="color: #9C9C9C; font-size: 11px;">请在确认预约后的15分钟内抵达车场，否则会自动取消哦！</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.detail-bg {
	background-image: linear-gradient(#5CCC84 0%, #3CB371 100%);
	/* background-color: #5ccc84; */
	height: 350rpx;
	width: 750rpx;
	position: fixed;
	left: 0;
	right: 0;
}
.detail-container {
	width: 100%;
	position: absolute;
	top: 350rpx;
	bottom: 0;
	left: 0;
	background-color: #f8f8fa;
}
.detail-parking {
	background-color: #fefefe;
	margin: -25px auto 0 auto;
	width: 80%;
	height: 370px;
	border-radius: 10px;
	box-shadow: 10px 20px 20px -20px #eeeff5;
}
</style>
