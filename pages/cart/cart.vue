<template>
	<view>
		
		
		<view class="caozuo">
			<view>
				<checkbox-group class="flex align-center" @change="changeAll()">
				<checkbox  :class="checked==true? 'checked':''" class="round" ></checkbox>
					<text style="font-size: 120%; margin-left: 10upx;">全选</text>
					
				</checkbox-group>
			</view>
			<view>
				<view @tap="deleteAll()" class="cu-btn sm round"><text class="cuIcon-delete"></text>删除</view>
			</view>
		</view>
		
		<view class="cart-content">
			<view v-for="(p,i) in cartlist" :key="i" class="cart-item bg-white">
				<view class="flex align-center">
					<checkbox-group>
						<checkbox @tap="changeChecked(i)" :checked="p.checked" :class="p.checked==true? 'checked':''" class="sx-round" ></checkbox>
					</checkbox-group>
					<image :src="p.image"></image>	
				</view>
				<view class="flex cart-item-info">
					<view class="cart-title" style="font-size: 150%; font-weight: solid;">
						{{p.name}}
					</view>
					<view>
						<view style="font-size: 100%;">类型：{{p.tags}}</view>
						<view class="flex justify-between">
							<view style="color: red;">￥{{p.price}}</view>
							<view>{{p.num}}</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<view class="heji">
			<view>
				<view>
					合计：<text style="color: orange;">￥{{sum}}</text>
				</view>
			</view>
			<view>
				<view class="cu-btn sm round bg-red">结算</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	// import uniNumberBox from "../../components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				checked: false,
				checked1: false,
				
				
			}
		},
		// components:{uniNumberBox},
		onLoad(){
			// this.getcartlist();
			// var carts = this.$store.state.carts;
			// console.log(carts);
			this.$store.dispatch("init_carts");
		},
		computed:{  //计算属性
			cartlist(){
				console.log(this.$store.state.carts);
				return this.$store.state.carts;
			},
			sum(){
				var he=0;
				this.cartlist.forEach(p=>{
					if(p.checked==true){
						he+=p.num*p.price;
						
					}
				});
				return he.toFixed(2);
			}
		},
		methods: {
			deleteAll(){
				this.cartlist = this.cartlist.filter(p=>{
					return !p.checked;
				})
			},
			clickcheck(){
				var p = this.checked;
				if(p){
					this.checked = false;
				}else{
					this.checked = true;
				}	
			},
			changeChecked(index){
				this.cartlist[index].checked = this.cartlist[index].checked?'':true;
				var selected = this.cartlist.filter(p=>{return !p.checked});
				selected.length==0 ? this.checked =true :this.checked=false;
			},
			changeAll(){
				
				this.cartlist.forEach(p=>{
					return p.checked=!this.checked;
				})
				this.checked? this.checked=false: this.checked=true;
			},
			changejishu(val){
				val = parseInt(val);
				if(val==0){
					var thisdata=this.cartlist.find(p=>{
						return p.num==0;
					});
					var its=this;
					uni.showModal({
						confirmText:"是的",
						content:"您确定要把"+thisdata.info+"移除购物车吗?",
						title:"删除警告",
						success(res) {
							if(res.confirm){
								this.cartlist = its.cartlist.filter(p=>{
									return p.id!=thisdata.id;
								})
							}
						}
					})
				}
			},
			getcartlist(){
				var data=[];
				data.push({
					id:1,
					url:"../../static/goods/cloth.jpg",
					info:"裙子1",
					type:"女装",
					price:20,
					num:1,
					checked:true
				});
				data.push({
					id:2,
					url:"../../static/goods/phone.jpg",
					info:"苹果手机iphoneX",
					type:"手机",
					price:5999,
					num:1,
					checked:true
				});
				data.push({
					id:3,
					url:"../../static/goods/cloth.jpg",
					info:"白裙子",
					type:"女装",
					price:20,
					num:1,
					checked:true
				});
				this.cartlist=data;
			}
			
		}
	}
</script>

<style>
.caozuo{
	position: fixed;
	background-color: white;
	display: flex;
	top:0upx;
	/*#ifdef H5*/
	top:90upx;
	/*#endif*/
	justify-content: space-between;
	align-items:  center;
	width: 750upx;
	height:100upx;
	padding-left: 40upx;
	padding-right:40upx ;
}
.cart-content{
	margin-top: 80upx;
	margin-bottom: 200upx;
	
}
.cart-item{
	display: flex;
	justify-content: space-between;
	padding: 20upx;
}
.cart-item image{
	width: 200upx;
	height:200upx;
}


.cart-item-info{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width:450upx;
}
.cart-title{
	overflow: hidden;
	text-overflow: ellipsis;
}

.heji{
	position:fixed;
	bottom: 0upx;
	/*#ifdef H5*/
	bottom: 100upx;
	/*#endif*/
	width:750upx;
	height: 100upx;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items:  center;
	padding-left: 40upx;
	padding-right:40upx ;
}

</style>
