import api from './request.js'
export default {
	//微信登录
	wxLogin(data){
		return api.post("/mobile/login/wxLogin", data)
	},
	//绑定手机号
	bindPhone(data) {
		return api.post("/mobile/user/bindPhone", data)
	},
	//获取车牌列表
	getPlates(params = {}) {
		return api.get("/mobile/user/getPlates", params)
	},
	//添加车牌
	addPlate(data) {
		return api.post("/mobile/user/addPlate", data)
	},
	//删除车牌
	deletePlate(data) {
		return api.post("/mobile/user/deletePlate", data)
	},
	//获取全部车场列表
	getCarParkList() {
		return api.get("/mobile/carPark/getList")
	},
	//获取最近的6个车场信息列表
	getNearestCarParks(params = {}) {
		return api.get("/mobile/carPark/getNearest", params)
	},
	//根据关键词模糊搜索停车场
	getCarParkListByKeyword(params = {}) {
		return api.get("/mobile/carPark/getListByKeyword", params)
	},
	//根据id获取车场
	getCarParkById(params = {}) {
		return api.get("/mobile/carPark/getCarParkById", params)
	},
	//根据车牌查找停车记录
	searchPlateForPay(params = {}) {
		return api.get("/mobile/user/searchPlate", params)
	},
	//根据车牌获取缴费详情信息
	getPayDetail(params = {}) {
		return api.get("/mobile/user/getPayDetail", params)
	},
	//创建订单
	createOrder(data) {
		return api.post("/mobile/user/createOrder", data)
	},
	//支付订单
	payOrder(data) {
		return api.post("/mobile/user/payOrder", data)
	},
	//支付订单
	cancelOrder(data) {
		return api.post("/mobile/user/cancelOrder", data)
	},
	//根据商户订单号获取订单详情
	getOrderDetail(params = {}) {
		return api.get("/mobile/user/getOrderDetail", params)
	},
	//根据用户id获取订单列表
	getOrderList(params = {}) {
		return api.get("/mobile/user/getOrderList", params)
	},
	//预约
	makeAppointment(data) {
		return api.post("/mobile/user/makeAppointment", data)
	},
	//获取预约记录列表
	getAppointmentList(params = {}) {
		return api.get("/mobile/user/getAppointmentList", params)
	},
	//获取优惠券列表
	getCouponList(params = {}) {
		return api.get("/mobile/user/getCouponList", params)
	},
	//添加用户偏好
	setUserPreference(data) {
		return api.post("/mobile/user/setUserPreference", data)
	},
	//根据用户偏好推荐商品
	getGuessPreferenceProduct(params = {}) {
		return api.get("/mobile/product/guessPreference", params)
	},
	//获取热门商品推荐
	getHotProducts(params = {}) {
		return api.get("/mobile/product/hot", params)
	},
	//获取评分最多商品推荐
	getRateProducts(params = {}) {
		return api.get("/mobile/product/rate", params)
	},
	//根据id获取商品
	getProductById(params = {}) {
		return api.get("/mobile/product/getProductById", params)
	},
	//获取相似商品推荐
	getSimilarProducts(params = {}) {
		return api.get("/mobile/product/getSimilarProducts", params)
	}
	// wxLogin(data){
	// 	return api.post("/test/login",data)
	// },
	// getSessionKey(params = {}) {
	// 	return api.get("/test/getSessionKey", params)
	// }
}