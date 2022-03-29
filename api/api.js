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
	// wxLogin(data){
	// 	return api.post("/test/login",data)
	// },
	// getSessionKey(params = {}) {
	// 	return api.get("/test/getSessionKey", params)
	// }
}