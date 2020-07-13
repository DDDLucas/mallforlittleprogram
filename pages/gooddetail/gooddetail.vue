<template>
	<view>
		<!-- 占位 不占app状态栏 -->
		<view class="zhanwei"></view>
		<!-- 返回bar -->
		<view class="cu-bar " style="position: fixed; top: 10upx; width: 750upx; z-index: 9999;" >
			<view class="action anniu">
				<view class=" cuIcon-back text-white" style="font-size: 140%; color:white;"></view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view>
			<swiper style="height: 500upx;">
				<swiper-item v-for="(p,i) in banners" :key="i">
					<image mode="widthFix" class="bannerimg" :src="p.url"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 基本信息 -->
		<!-- 显示一下价格 -->
		<view class="bg-white flex justify-between align-center padd">
			<view class="text-red">￥
				<text style="font-size: 180%;">{{detail.price}} </text>起
				<text v-if="detail.ori_price" style="text-decoration: line-through;" class="text-grey">￥{{detail.ori_price}}</text>
			</view>
			<view>已出售{{detail.sellnum?detail.sellnum:"0"}}</view>
		</view>
		<!-- 显示名字 -->
		
		<view class="bg-white padd flex align-center">
			<view v-if="i<4" :class="p.color" class="cu-tag radius" v-for="(p,i) in tags" :key="i">
				{{p.text}}
			</view>
			<view style="font-weight:bold; font-size: 120% ; margin-left: 10upx;">{{detail.name}}</view>
		</view>
		
		
		
		
		<!-- 拼团活动 -->
		<view class="bg-white margin-top border">
			<detailbar action="" :goods_id="goods_id" title="这些人刚刚购买成功，可参与拼单"></detailbar>
			
			<!-- 活动列表 -->
			<view v-for="i in 3" :key="i"  class="flex align-center justify-between" style="padding: 10upx; border-top: 1upx solid #DDDDDD;">
				<view class="flex align-center" style="padding-left: 50upx;">
				<image class="pdavatar" src="../../static/icon/chicken.png"></image>
				<image class="pdavatar" src="../../static/icon/fruit.png"></image>
				<view>小可爱，大宝贝</view>
				</view>
				<view>
					<button class="cu-btn bg-red">去拼单</button>
				</view>
			</view>
		</view>
							
		
		<!-- 评价 -->
		<view class="bg-white margin-top">
			<detailbar action="" :goods_id="goods_id" :title="'商品评价('+num.comment_num+')'"></detailbar>
			
			
			<view>
				<comment  :item="p" v-for="(p,i) in comment" :key="i"></comment>
			</view>
		</view>
		
		<!-- 晒图 -->
		<view class="bg-white margin-top">
			<detailbar  :goods_id="goods_id" :title="'晒图('+num.photos_num+')'"></detailbar>
			<view class="photos">
				<image :src="p.url" v-for="(p,i) in photos" :key="i"></image>
			</view>
			
			
		</view>
		<!-- 问答 -->
		
		<!-- 店家介绍 -->
		
		<!-- 商品规格 -->
		
		<!-- 详情简介 -->
		<view class="bg-white margin-top">
			<detailbar :goods_id="goods_id" title="商品详情"></detailbar>
			<image style="width: 750upx;" mode="widthFix" :src="p.url" v-for="(p,i) in picdetail" :key="i"></image>
		</view>
		
		
		<!-- 下方bar -->
		<view class="zhanweixia">
			
		</view>
		<view class="barfixed cu-bar tabbar bg-white border shop ">
			<button class="action">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge">2</view>
				</view>
				客服
			</button>
			<button @tap="dofavor"  class="action" :class="favor?'text-orange':''">
				<view  :class="favor?'cuIcon-favorfill':'cuIcon-favor' ">
					
				</view>
				{{favor?"已收藏":"收藏"}}
			</button>
			<button class="action">
				<view class="cuIcon-cart ">
					<view class="cu-tag badge">10</view>
				</view>
				购物车
			</button>
			<view class="bg-orange submit">加入购物车</view>
			<view class="bg-red submit">立即购买</view>
		</view>
	</view>
</template>

<script>
	import comment from "../../components/comment.vue"
	import detailbar from "../../components/detaibar.vue"
	export default {
		data() {
			return {
				goods_id:"",
				detail:{},
				banners:[],
				tags:[],
				comment:{},
				num:{},
				photos:[],
				picdetail:[],
				isfavor:false
			}
		},
		components:{comment, detailbar},
		computed:{
			favor(){
				var uid = uni.getStorageSync("uid");
				if(uid=="" || uid==null || uid==undefined){
					return false;
				}
				if(this.isfavor == false){
					return false;
				}else{
					return true;
				}
			}	
		},
		methods: {
			gettags(str){
				var colors = ["bg-red","bg-orange","bg-yellow","bg-green","bg-blue"]
				this.tags=[];
				if(str.indexOf(",")==-1){
					var index=parseInt(Math.random()*4);
					this.tags.push({text:str, color:colors[index]})
				}else{
					var lists = str.split(",");
					lists.forEach(p=>{
						var index=parseInt(Math.random()*4);
						this.tags.push({text:p, color:colors[index]})
					});
				}
			},
			getdata(){
				uni.request({
					url:this.$url+"/goods/detail",
					data:{
						id:this.goods_id
					},
					method:"GET",
					success: (res) => {
						console.log(res.data);
						this.comment = res.data.comment;
						this.detail = res.data.detail;
						this.banners = res.data.banners;
						this.gettags(this.detail.tags);
						this.photos = res.data.photos;
						this.num =  res.data.num;
						this.picdetail =res.data.picdetail;
					}
				})
			},
			dofavor(){
				var uid = uni.getStorageSync("uid");
				if(uid=="" || uid==null || uid==undefined){
					return ;
				}
				uni.request({
					url:this.$url+"/goods/favor",
					data:{
						goodsid:this.goods_id,
						uid:uid,
						is_favor: this.isfavor==false? 0:1
					},
					method:"GET",
					success: (res) => {
						this.isfavor = res.data.status==0 ? true: false
						console.log(res.data)
					}
				})
			},
			getfavor(){
				var uid = uni.getStorageSync("uid");
				if(uid=="" || uid==null || uid==undefined){
					return ;
				}
				uni.request({
					url:this.$url+"/goods/goods_favor_detail",
					data:{
						goodsid:this.goods_id,
						uid:uid
					},
					method:"GET",
					success: (res) => {
						res.data.favor == null? this.isfavor = false: this.isfavor=true;
					}
				})
			}
		},
		onLoad(options) {
			this.goods_id = options.id;
			this.getdata();
			var uid = uni.getStorageSync("uid");
			console.log(uid)
			this.getfavor();
		}
	}
</script>

<style>
.barfixed{
	position: fixed;
	bottom: 0upx;
	width: 750upx;
}
.zhanwei{
	width: 750upx;
	height: var(--status-bar-height);
}
.bannerimg{
	width: 750upx;
	
}
.padd{
	padding: 10upx;
}
.anniu{
	width: 100upx;
	height: 100upx;
	padding: 8upx 8upx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(41,36,33,0.3);
}
.pdavatar{
	width: 90upx;
	height: 90upx;
	border-radius: 90upx;
	margin-left: -35upx;
	border: 1upx solid white;
	background-color: white;
}
.zhanweixia{
	height: calc(100upx + env(safe-area-inset-bottom) / 2);
	width: 100%;
	min-height: 100upx;
}
.photos{
	display: flex;
	
}
.photos image{
	width: 150upx;
	height: 150upx;
	margin: 15upx 15upx;
}
</style>
