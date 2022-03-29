<template>
	<view>
		<view class="login-back" @click="back">
			<uni-icons type="arrowleft" size="20" color="#ffffff"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="flex">
				<text class="title">绑定手机号</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input v-model="phone" type="text" placeholder="请输入手机号" class="rounded font-md"/>
			</view>
			<view class="bg-main btn" hover-class="bg-main-hover" @click="submit">绑 定</view>
		</view>
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
				phone: '',
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if(!myreg.test(this.phone)) {
					this.$toast("手机号格式不正确")
					return
				}
				uni.showLoading({
					title: '提交中...',
					mask: false
				});
				this.$api.bindPhone({
					phone: this.phone,
					carParkUserId: this.user.id
				}).then(res => {
					this.$toast('绑定成功')
					this.$store.dispatch('updateInfo', {phone: this.phone})
					setTimeout(() => {
						this.back()
					}, 350)
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
