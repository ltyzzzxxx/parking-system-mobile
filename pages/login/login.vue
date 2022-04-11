<template>
	<view>
		<view class='header'>
			<image src='../../static/wx_login.png'></image>
		</view>
		<view class='content'>
			<view>申请获取以下权限</view>
			<text>获得你的公开信息(昵称，头像、地区等)</text>
		</view>

		<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxLogin">
			授权登录
		</button>
	</view>
</template>

<script>
	import WXBizDataCrypt from "@/common/WXBizDataCrypt.js"
	export default {
		data() {
			return {

			}
		},
		methods: {
			wxLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						let code = res.code
						console.log(res.code)
						this.$api.wxLogin({
							code
						}).then(data => {
							console.log(data.userinfo)
							this.handleLoginSuccess(data.userinfo)
						})
					}
				})
			},
			handleLoginSuccess(user) {
				this.$toast('登录成功')
				this.$store.dispatch('login', user)
				if (!user.phone) {
					uni.redirectTo({
						url: "/pages/bind-phone/bind-phone"
					})
					return
				}
				console.log("登录成功")
				uni.switchTab({
					url:"../tabbar/home/home"
				})
				return
			}
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
