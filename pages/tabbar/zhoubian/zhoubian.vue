<template>
	<view>

		<view>
			<uni-popup ref="popup1" type="center">
				<view class="popup-content">
					<view style="margin-top: 20px;">
						<text>专属你的身份标签</text>
					</view>
					<view style="margin-top: 12px;">
						<text style="font-size: 13px;">可在“设置”中修改（单选）</text>
					</view>
					<view class="flex flex-column justify-center align-center">
						<view style="margin-top: 20px;">
							<image src="../../../static/boy.png" style="width: 80px; height: 80px;"
								@click="chooseSex(1)"></image>
						</view>
						<view>
							<text style="font-size: 14px;" :class="sex=='男' ? 'selected' : ''">男</text>
						</view>
						<view style="margin-top: 10px;">
							<image src="../../../static/girl.png" style="width: 80px; height: 80px;"
								@click="chooseSex(2)"></image>
						</view>
						<view>
							<text style="font-size: 14px;" :class="sex=='女' ? 'selected' : ''">女</text>
						</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="popup2" type="center">
				<view class="popup-content">
					<view style="margin-top: 20px;">
						<text>专属你的身份标签</text>
					</view>
					<view style="margin-top: 12px;">
						<text style="font-size: 13px;">可在“设置”中修改（多选）</text>
					</view>
					<view class="flex flex-column">
						<view class="flex" style="margin-top: 25px;">
							<view style="margin-right: 20px;">
								<view>
									<image src="../../../static/baoyangyizu.png" style="width: 50px; height: 50px;"
										@click="choosePreference('保养')"></image>
								</view>
								<view>
									<text style="font-size: 12px;" :class="isBaoyang ? 'selected' : ''">保养一族</text>
								</view>
							</view>
							<view style="margin-left: 20px;">
								<view>
									<image src="../../../static/kuaizhuangshi.png" style="width: 50px; height: 50px;"
										@click="choosePreference('装饰')"></image>
								</view>
								<view>
									<text style="font-size: 12px;" :class="isZhuangshi ? 'selected' : ''">酷爱装饰</text>
								</view>
							</view>
						</view>
						<view class="flex" style="margin-top: 25px;">
							<view style="margin-right: 20px;">
								<view>
									<image src="../../../static/anquandiyi.png" style="width: 50px; height: 50px;"
										@click="choosePreference('安全')"></image>
								</view>
								<view>
									<text style="font-size: 12px;" :class="isAnquan ? 'selected' : ''">安全第一</text>
								</view>
							</view>
							<view style="margin-left: 20px;">
								<view>
									<image src="../../../static/pinweishenghuo.png" style="width: 50px; height: 50px;"
										@click="choosePreference('生活')"></image>
								</view>
								<view>
									<text style="font-size: 12px;" :class="isShenghuo ? 'selected' : ''">品味生活</text>
								</view>
							</view>
						</view>
					</view>
					<view class="flex align-center justify-center" style="margin-top: 10px;">
						<view class="button flex align-center justify-center" style="margin-right: 10px;"
							@click="returnPreStep">
							<text style="color: #84cb86; font-size: 14px;">上一步</text>
						</view>
						<view class="button flex align-center justify-center" style="margin-left: 10px;"
							@click="confirm">
							<text style="color: #84cb86; font-size: 14px;">确定</text>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>



		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 350rpx;">
			<swiper-item class="flex justify-center" v-for="(item,index) in swiper" :key="index">
				<image :src="item.src" style="width: 720rpx;height: 350rpx;" class="rounded shadow">
				</image>
			</swiper-item>
		</swiper>

		<icon-nav :list="iconNav"></icon-nav>

		<coupon-list></coupon-list>

		<view class="divider"></view>

		<uni-section title="猜你喜欢" type="line" padding>
			<uni-grid :column="2" :show-border="false" :square="false" @change="change">
				<uni-grid-item v-for="(item, index) in recommendations" :index="item.productId" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<image :src="item.imageUrl" mode="widthFix" style="width: 280rpx;height: 350rpx;" class="rounded shadow"></image>
						<view class="flex justify-center align-center" style="width: 280rpx; height: 100rpx; padding: 10px 0 10px 0;">
								<text class="text">{{item.name.length > 16 ? item.name.slice(0,16) + "..." : item.name}}</text>
						</view>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		data() {
			return {
				swiper: [{
					src: "/static/demo/banner/ad1.png"
				}, {
					src: "/static/demo/banner/ad2.png"
				}],
				iconNav: [{
					src: "/static/jiayou.png",
					name: "优惠加油",
				}, {
					src: "/static/shop.png",
					name: "车品商城",
					url: "/pages/shopping-mall/shopping-mall"
				}, {
					src: "/static/xiche.png",
					name: "优惠洗车",
				}, {
					src: "/static/coupon.png",
					name: "兑停车券",
				}],
				sex: 1,
				isBaoyang: false,
				isZhuangshi: false,
				isAnquan: false,
				isShenghuo: false,
				recommendations: [{
					imageUrl: "/static/rec1.png",
					name: "车载充电接头点烟器充电接头"
				},{
					imageUrl: "/static/rec2.png",
					name: "车用仪表台固定后视镜支撑架"
				},{
					imageUrl: "/static/rec3.png",
					name: "左都号码牌反向自动折叠伞"
				},{
					imageUrl: "/static/rec4.png",
					name: "清风唯洁雅高端手帕纸"
				}]
			}
		},
		methods: {
			change(e) {
				uni.navigateTo({
					url:"../../product-detail/product-detail?id=" + e.detail.index
				})
			},
			chooseSex(sex) {
				this.sex = sex
				this.$refs.popup1.close()
				this.$refs.popup2.open()
			},
			choosePreference(preference) {
				switch (preference) {
					case '保养':
						this.isBaoyang = !this.isBaoyang
						break;
					case '装饰':
						this.isZhuangshi = !this.isZhuangshi
						break;
					case '安全':
						this.isAnquan = !this.isAnquan
						break;
					case '生活':
						this.isShenghuo = !this.isShenghuo
						break;
				}
			},
			returnPreStep() {
				this.$refs.popup1.open()
				this.$refs.popup2.close()
			},
			confirm() {
				let tags = ''
				if(this.isBaoyang) {
					tags += '保养,'
				}
				if(this.isZhuangshi) {
					tags += '装饰,'
				}
				if(this.isAnquan) {
					tags += '安全,'
				}
				if(this.isShenghuo) {
					tags += '生活,'
				}
				if(tags.length > 0) {
					tags = tags.substr(0, tags.length - 1)
				}
				if(!this.user) {
					this.$refs.popup2.close()
					uni.navigateTo({
						url: '/pages/login/login'
					});
				} else {
					this.$api.setUserPreference({
						userId: this.user.id,
						sex: this.sex,
						tags: tags
					}).then(res => {
						console.log(res)
						this.$store.dispatch('updateInfo', {hasPreference: 1})
						this.$store.dispatch('updateInfo', {tags: tags})
						this.$refs.popup2.close()
					})
				}
			},
			getGuessPreferenceProduct(userId = null) {
				if(userId == null) {
					this.$api.getGuessPreferenceProduct().then(res => {
						console.log(res)
						this.recommendations = res.guessPreference.slice(0,4)
					})
				} else {
					this.$api.getGuessPreferenceProduct({
						userId: userId
					}).then(res => {
						console.log(res)
						this.recommendations = res.guessPreference
					})
				}
			}
		},
		onShow() {
			if(!this.user) {
				this.$refs.popup1.open()
				return
			}
			if(this.user.hasPreference == 0) {
				this.$refs.popup1.open()
				return
			}
		},
		created() {
			if(!this.user) {
				this.getGuessPreferenceProduct()
			} else {
				this.getGuessPreferenceProduct(this.user.id)
			}
		}
	}
</script>

<style>
	.popup-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 350px;
		width: 250px;
		background-color: #fff;
		border-radius: 10px;
	}

	.selected {
		color: #5CCC84;
	}

	.button {
		width: 80px;
		height: 50rpx;
		border-style: solid;
		border-width: 1px;
		border-radius: 30px;
		border-color: #84cb86;
	}

	.grid-item-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
