<template>
	<view>
		<view class="zhanwei"></view>
		<!-- 搜索框 -->
		<view class="cu-bar search bg-gradual-orange">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="search" placeholder="搜索商品" />
			</view>
			<view class="action">
				<text class="cuIcon-scan" style="font-size: 150%"></text>
			</view>
		</view>
		<!-- 导航 -->
		<view>
			<scroll-view class="nav bg-white" scroll-x>
				<view class="flex text-center">
					<view :class="thistab==index?'text-orange cur':''" @click="qiehuan(index)" v-for="(item,index) in TabLists" class="cu-item flex-sub">{{item}}</view>
					
				</view>
				
			</scroll-view>
		</view>
		<!-- 滑动 -->
		<swiper style="margin-top: 10upx;" :circular="true" :indicator-dots="true">
			<swiper-item v-for="(item, index) in banners" :key="index">
				<image mode="scaleToFill" class="swiperimg" :src="item.url"></image>
			</swiper-item>
			
		</swiper>
		<!-- 众筹 -->
		<view class="zhongchou">
			<view style="display: flex;  align-items: center;">
				<image style="height:50upx; width: 50upx; margin-right: 5upx;" src="../../static/logo.png"></image>
				<text style="font-size: 110%; font-weight: bold;">众筹</text>
			</view>
			<view>查看全部<text class="cuIcon-right"></text></view>
		</view>
		<!-- 导航图表 -->
		<view class="icon-father bg-white">
			<view v-for="(item, index) in iconList" :key="index" class="icon-item">
				<image :src="item.url"></image>
				<view style="text-align: center;">{{item.name}}</view>
			</view>
			
		</view>
		<!-- 特价 -->
		<view style="padding-top: 30upx;" class="tejia bg-white">
			<view class="flex tejiabar justify-between align-center">
				<view class="flex align-center">
					<view><image style="width: 50upx; height: 50upx;" src="../../static/icon/wallet.png"></image></view>
					<view class="text-bold" style="font-size:140%; ">百亿补贴</view>
					<view style="margin-left:10upx ;" class="text-bold cu-tag">打牌正品 官方补贴</view>
				</view>
				<view>
					全部<text class="cuIcon-right"></text>
				</view>
			</view>
			
			<!-- 特价商品列表开始 -->
			<view class="flex justify-around">
				<view v-for="(item, index) in tejialist" :key="index">
					<view style="position: relative;" class="flex ">
						<image style="width:150upx; height: 130upx;" :src="item.url"></image>
						<view style="position: absolute;bottom:10upx;left:35upx" class="cu-tag sm bg-red">{{item.tag}}</view>
					</view>
					<view style="text-align: center; color:red">￥{{item.price}}</view>
					
				</view>
			</view>
			
			<!-- 商品列表 -->
			<view style="margin-top: 30upx;">
				<view style="padding-top: 20upx;" class="flex justify-around" v-for="(item,index) in goodslist" :key="index">
					<view style="height:250upx">
						<image style="height: 250upx; width:250upx" :src="item.url"></image>
					</view>
					<view style="width:400upx; flex-direction: column;border-bottom: 1upx solid #e7e7e7;" class="flex justify-between">
						<view>
						<view style="font-weight: bold; font-size: 30upx;">
							<text v-if="item.tag1==true" class="sm cu-tag bg-gradual-orange round">女神节</text>iphone首发
						</view>
						<view class="cu-tag bg-brown radius">
							旗舰店</view>
						</view>
						<view>
							<view>
								<text v-if="item.tag2==true" class="cu-tag sm bg-red radius">小编推荐</text>
								<text v-if="item.tag3==true" class="cu-tag sm bg-orange radius">假一赔十</text>
							</view>
							<view>
								<text style="color:red">￥{{item.price}}</text>
								<text style="color:grey; font-size:90%">已买1000+</text>
							</view>
							<view style="width:100%; height:20upx"></view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				shuru:null,
				search:"",
				TabLists:["热门","水果","蔬菜","肉类","众筹"],
				thistab:0,
				banners:[],
				iconList:[],
				tejialist:[],
				goodslist:[]
			}
		},
		onLoad() {/*页面渲染时执行*/
			this.gebanners();
			this.geticonlist();
			this.gettejia();
			this.getgoodslist();
		},
		onReady(){  /*页面加载完执行*/
			
		},
		methods: {
			gaibian(){
				this.shu="点击了"
			},
			
			qiehuan(index){
				this.thistab=index;
				console.log(index)
				
			},
			gebanners(){
				var data=[{
					url:"../../static/swiper/dog.jpg",
					action:""
				},
				{
					url:"../../static/swiper/girl.jpg",
					action:""
				},
				{
					url:"../../static/swiper/dva.jpg",
					action:""
				}];
				this.banners=data;
			},
			geticonlist(){
				var data=[{
						url:"../../static/icon/hot.png",
						name:"热卖"
					},
					{
						url:"../../static/icon/fruit.png",
						name:"水果"
					},
					{
						url:"../../static/icon/veg.png",
						name:"蔬菜"
					},
					{
						url:"../../static/icon/meat.png",
						name:"肉类"
					},
					{
						url:"../../static/icon/chicken.png",
						name:"禽类"
					}];
					this.iconList =data;
			},
			gettejia(){
				var data=[{
					id:1,
					url:"../../static/goods/phone.jpg",
					tag:"超优惠",
					price: 1999
				},
				{
					id:2,
					url:"../../static/goods/phone.jpg",
					tag:"史低",
					price: 999
				},
				{
					id:3,
					url:"../../static/goods/phone.jpg",
					tag:"超优惠",
					price: 2999
				},
				{
					id:4,
					url:"../../static/goods/phone.jpg",
					tag:"超特价",
					price: 1999
				},
				{
					id:5,
					url:"../../static/goods/phone.jpg",
					tag:"超优惠",
					price: 1999
				}];
				this.tejialist=data;
				
			},
			getgoodslist(){
				var data=[];
				for(var i=0; i<10; i++){
					var p={
						id:1,
						title:'',
						tag1:true,
						shop:"",
						tag2:true,
						tag3:true,
						url:"../../static/goods/phone.jpg",
						price:3899,
						num:1000
					};
				
					data.push(p);
				}
				this.goodslist = data;
			}
			
		}
	}
</script>

<style>
	
	.swiperimg{
		width:750upx;
		
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.zhongchou{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height:90upx;
		align-items: center;
		padding-left:20upx ;
		padding-right: 20upx;
		background-color: white;
	}
	.icon-father{
		border-top:0.5upx solid #e7e7e7;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		padding-top: 30upx;
		padding-bottom: 30upx;
	}
	.icon-item image{
		height: 100upx;
		width: 100upx;
		text-align: center;
	}
	.tejia{
		margin-top: 25upx;
	}
	.tejiabar{
		padding-bottom: ;
	}
	.zhanwei{
		height:var(--status-bar-height);
		width: 100%;
	}
</style>
