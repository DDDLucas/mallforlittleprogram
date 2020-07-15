import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		carts:[
			{
				id:1,
				name:"商品"
			}
		]
	},
	mutations:{
		INIT_CARTS(state, data){
			state.carts=data;
		},
		ADD_CARTS(state,data){
			let flag =true;
			state.carts.forEach(p=>{
				if(p.goods_id == data.goods_id){
					p.num+=data.num;
					flag=false;
				}
				
			});
			if(flag==true){
				state.carts.push(data);
			};
			uni.request({
				url: Vue.prototype.$url+ "/cart/refresh",
				data:{
					uid: uni.getStorageSync("uid"),

					data:JSON.stringify(state.carts)
				},
				success: (res) => {
					console.log(res.data);
				}
			})
		}
	},
	actions:{
		init_carts(context){
			uni.request({
				url:Vue.prototype.$url+"/cart/init",
				data:{
					uid: uni.getStorageSync("uid")
					
				},
				success: (res) => {
					context.commit("INIT_CARTS",res.data);
				}
			})
			
		},
		add_carts(context,data){
			context.commit("ADD_CARTS",data);
			
			
		}
	}
})
export default store