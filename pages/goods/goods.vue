<template>
	<view>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="search" placeholder="搜索商品" />
			</view>

		</view>
		<!-- 主体内容 -->
		<view class="flex">
			<scroll-view class="bg-grey" scroll-y style="height: calc(100vh - 200upx); width:200upx">
				
				<view @tap="select(i)" :style="{fontSize:selected==i?'120%':'100%'}" :class="selected==i?'bg-white text-bold':''" class="type-item " v-for="(p,i) in goods" :key="i">
					<view v-if="selected==i" class="shuxian"></view>{{p.type_name}}
				</view>
			</scroll-view>
			<scroll-view scroll-with-animation :scroll-into-view="'good-'+selected" class="bg-white" scroll-y style="height: calc(100vh - 200upx); width:550upx">
				<view :id="'good-'+i" style="border-bottom: 0.5upx #e7e7e7 solid; padding-bottom: 20upx;" v-for="(p,i) in goods" :key="i">
					<view style="font-size:120% " class="text-bold text-black g-title">{{p.type_name}}</view>
					<view  class="flex flex-wrap" :class="p.data.length==0?'justify-center':''">
						<view @tap="gotodetail(pi.goods_id)" class="flex justify-center align-center" style="width: 275upx;" v-for="(pi, ti) in p.data" :key="ti">
							<view>
							<image style="width:200upx; height:200upx" :src="pi.image"></image>
							<view class="flex justify-center align-center flex-direction">
								<view style="text-align: center; width: 200upx; white-space: nowrap; overflow: hidden;text-overflow:ellipsis ;">{{pi.name}}</view>
								<view style="font-size:120%; color: red; font-weight: bold;text-align: center;">￥{{pi.price}}</view>
							</view>
								
							</view>
						</view>
						<view style="flex justify-center flex-direction: ;" v-if="p.data.length==0">
							<image style="width: 200upx; height:200upx;" src="../../static/nogoods.png"></image>
							<view>暂无商品</view>
						</view>
					</view>
					
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search:"",
				types:[],
				goods:[],
				selected:0
			}
		},
		onLoad(){
			this.getgoods();
		},
		methods: {
			gotodetail(id){
				console.log(id);
				uni.navigateTo({
					url:'../gooddetail/gooddetail?id=${id}'
				})
			},
			getgoods(){
				uni.request({
					url:this.$url+"/goods/type_lists",
					data:{
						
					},
					success: (res) => {
						this.goods = res.data;
					}
				})
				
			},
			select(i){
				this.selected=i;
			}
		}
	}
</script>

<style>
.type-item{
	height: 100upx;
	text-align: center;
	line-height: 100upx;
	position:relative;
	text-align: center;
	align-items: center;
}
.shuxian{
	position: absolute;
	width: 12upx;
	height:40upx;
	background-color: red;
	top:30upx;
	left:10upx;
}
.g-title{
	margin-top: 20upx;
	margin-left: 20upx ;
}
</style>
