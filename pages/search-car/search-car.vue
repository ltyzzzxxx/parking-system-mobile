<template xlang="wxml">
	<view class="body">
		<view class="carinput">
			<view class="carinput-title">
				请填写车牌号码
			</view>
			<view class="carinput-input">
				<view class="carinput-input-i" :class="{'input-active':carIndex == i}" @tap="inputKey" :data-index="i" v-for="(v,i) in carInput" :key="i" v-show="i < 7">
					{{carInput[i].val}}
				</view>
				<view class="carinput-input-i" :class="{'input-active':carIndex == 7}" @tap="inputKey" data-index="7">
					{{carInput[7].val?carInput[7].val:'+'}}
				</view>
			</view>
			<view class="carinput-power">
				<checkbox-group class="checkbox-g" @change="powerChange">
					<label class="checkbox">
						<checkbox value="true" :checked="isPower" />
						新能源
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="p-3">
			<view class="bg-main main-btn" hover-class="bg-main-hover" type="default" @tap="toBind">
				确定
			</view>
		</view>
		<tki-float-keyboard ref="keybd" :mode="'car'" :type="keyType" :title="'车牌键盘'" @del="keyCbDel" @val="keyCbVal" @hide="keyCbHide"></tki-float-keyboard>
	</view>
</template>
<script>
import {
	mapState
} from 'vuex'
import tkiFloatKeyboard from "@/components/tki-float-keyboard/tki-float-keyboard.vue";
export default {
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	data() {
		return {
			carIndex: -1,
			carInput: [
				{ type: 2, val: "鄂" },
				{ type: 4, val: "A" },
				{ type: 1, val: "" },
				{ type: 1, val: "" },
				{ type: 1, val: "" },
				{ type: 1, val: "" },
				{ type: 3, val: "" },
				{ type: 1, val: "" }
			],
			keyType: 0,
			isPower: false, // 新能源
		};
	},
	methods: {
		// 判定是否为空
		empty(v) {
			let tp = typeof v,
				rt = false;
			if (tp == "number" && String(v) == "") {
				rt = true
			} else if (tp == "undefined") {
				rt = true
			} else if (tp == "object") {
				if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
			} else if (tp == "string") {
				if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
			} else if (tp == "function") {
				rt = false
			}
			return rt
		},
		inputKey(e) {
			let that = this;
			let data = e.currentTarget.dataset;
			if (data.index >= 7) {
				if (!that.isPower) {
					return false;
				} else {
					that.carIndex = 7;
				}
			} else {
				that.carIndex = data.index;
			}
			that.upKeyType();
			that.keyShow();
		},
		keyCbVal(e) {
			let that = this;
			let index = Number(that.carIndex);
			if (index >= 0 && index < 6) {
				that.carInput[index].val = e;
				that.carIndex = index + 1;
			} else if (index == 6) {
				that.carInput[index].val = e;
				if (that.isPower) {
					// 新能源
					that.carIndex = 7;
				} else {
					// 不是新能源出输入结束
					that.keyHide();
					that.carIndex = -2;
					console.log('非新能源车输入完毕')
				}
			} else if (index == 7) {
				// 新能源车输入完毕
				that.carInput[index].val = e;
				that.keyHide();
				that.carIndex = -3;
				console.log('新能源车输入完毕')
			}
			that.upKeyType();
		},
		keyCbDel(e) {
			let index = this.carIndex;
			if (index > 0) {
				if (!this.empty(this.carInput[index].val)) {
					this.carInput[index].val = "";
					this.carIndex = index;
				} else {
					this.carInput[index - 1].val = "";
					this.carIndex = index - 1;
				}
			}
			this.upKeyType();
		},
		upKeyType() {
			if (!this.empty(this.carInput[this.carIndex])) {
				this.keyType = this.carInput[this.carIndex].type;
			}
		},
		keyShow() {
			this.$refs.keybd._keyShow();
		},
		keyHide() {
			this.$refs.keybd._keyHide();
		},
		keyCbHide() {
			if (this.carIndex != -3 || this.carIndex != -2) {
				this.carIndex = -1;
			}
		},
		powerChange(e) {
			let that = this
			let i = that.checkCar().i
			if (e.detail.value.length > 0) {
				that.isPower = true;
				if (i == -1) {
					that.carIndex = 7;
				} else {
					that.carIndex = i;
				}
				that.keyShow();
			} else {
				that.isPower = false;
				that.carInput[7].val = "";
				if (that.carIndex == 7) {
					that.keyHide();
					that.carIndex = -2;
				}
			}
			that.upKeyType();
		},
		checkCar() {
			// 检查车牌是否输入完成
			let that = this;
			let i = 7;
			let rt = { i: -1, isempty: false, val: "" };
			if (that.isPower) {
				i = 8;
			}
			for (let index = 0; index < i; index++) {
				const obj = that.carInput[index];
				if (this.empty(String(obj.val))) {
					rt.i = index;
					rt.isempty = true;
					rt.val = "";
					break;
				}
				rt.val += that.carInput[index].val;
			}
			return rt;
		},
		toBind() {
			let that = this
			let ck = that.checkCar();
			if (ck.i == -1 && !ck.isempty) {
				console.log('可以查找车牌了')
				let plate = ''
				this.carInput.forEach(c => {
					plate += c.val
				})
				console.log(plate)
				this.$api.searchPlateForPay({
					plate: plate
				}).then(res => {
					if(res.status) {
						this.authJump("/pages/pay-detail/pay-detail?plate=" + plate)
					}
				})
			} else {
				this.$toast("请继续输入车牌号")
				// 显示键盘输入
				that.keyShow();
				that.carIndex = ck.i;
				that.keyType = that.carInput[ck.i].type
			}
		}
	},
	components: {
		tkiFloatKeyboard
	},
	watch: {},
	onPageScroll: function () {
		let that = this;
	},
	onReachBottom: function () {
		let that = this;
	},
	onPullDownRefresh: function () {
		let that = this;
	},
	onShow: function () {
		let that = this;
	},
	onHide: function () {
		let that = this;
	},
	onUnload: function () {
		let that = this;
	},
	onLoad: async function () {
		let that = this;
	}
};
</script>

<style>
@import "./style.css";
</style>
