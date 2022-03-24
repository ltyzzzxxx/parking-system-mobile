<template>
	<view class="flex-column">
		<view class="solid-line">
			<view class="add-car flex align-center justify-center" @click="navigateTo('/pages/add-car/add-car')">
				<uni-icons type="plusempty" style="color: #5CCC84"></uni-icons>
				<text style="color: rgb(92, 204, 132);">添加车辆</text>
			</view>
		</view>
		<view v-if="plateList.length > 0" class="plates flex-column">
			<view v-for="i in 8" class="plate flex justify-between align-center mt-5">
				<text style="color: #000000; font-size: 19px; margin-left: 25px;">鄂ABY636</text>
				<uni-icons type="trash" size="20" style="color: #989899; margin-right: 25px;"></uni-icons>
			</view>
		</view>
		<view v-else class="no-car flex align-center justify-center flex-column">
			<image src="../../static/noPlate.png" style="width: 130px; height: 100px;"></image>
			<text class="text-light-muted" style="font-size: 12px; margin: 20px 0 80px 0;">您还未绑定车牌哦！</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				plateList: ['ss']
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.add-car {
	height: 100%;
	background-color: #F0FFF0;
}
.solid-line {
	position: absolute;
	top: 5%;
	left: 10%;
	right: 10%;
	width: 80%;
	height: 10%;
	border-radius: 5px;
	border: 1px dashed #7FFFD4;
}
.no-car {
	position: absolute;
	top: 12%;
	height: 88%;
	width: 100%;
}
.plates {
	position: absolute;
	top: 15%;
	left: 10%;
	right: 10%;
	height: 70%;
	width: 80%;
	border-radius: 5px;
}
.plate {
	width: 300px;
	height: 80px;
	border-radius: 5px;
	background-color: #fefefe;
}
page {
	background-color: #f8f9fb;
}
</style>
