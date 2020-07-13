<template>
	<view>
		<view class="flex justify-between bg-white">
			<view class="flex content">
				<view><image class="user-logo" src="../../static/icon/fruit.png"></image></view>
				<view style="margin-left: 20upx;">
					<view class="user-name">
						<text>王志龙</text>
						<view class="cu-tag bg-yellow" >铜牌</view>
					</view>
					<view style="margin-top: 25upx;">
						<view class="cu-tag line-blue round"> 积分720</view>
						<view class="cu-tag line-blue round"> 188****5598</view>
						<view class="cu-tag line-blue round"> 认证会员</view>
					</view>
				</view>
				<view class="flex align-center">
					<button class="cu-btn line-red round" style="width:200upx">
						<text class="cuIcon-redpacket_fill text-red"></text>
						拼单返现
					</button>
				</view>
			</view>
		</view>
		<!-- 月卡 -->
		<view class="yueka-fa">
			<view class="yueka">
				<view class="flex justify-center">
					<text>省钱月卡</text>
					<text>帮你省20.1元</text>
				</view>
				<view class="flex align-center">
					<button class="cu-btn sm bg-red">领取通用卷</button>
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>
		
		<!-- 订单部分 -->
		<view style="margin-top: 20upx;" class="flex justify-center flex-direction bg-white">
			<view style="border-bottom: 1upx black solid ; height: 80upx;" class="flex justify-between align-center">
				<text style="font-size: 140%;">我的订单</text>
				<view>查看全部<text class="cuIcon-right"></text></view>
			</view>
			<view class="bg-white flex justify-around" style="width: 700upx; height: 120upx;">
				<view style="position: relative;top:10upx; width: 150upx;" class="flex align-center flex-direction" v-for="(item,i) in orderlist" :key="i">
					<view :class="item.icon" style="font-size: 60upx;"> 
					
					</view>
					<view v-if="item.num!=0" style="position: absolute;top: 0upx; right: 20upx;" class="cu-tag bg-red round sm">
						{{item.num}}
					</view>
					<view>{{item.text}}</view>
				</view>
			</view>
		</view>
		
		<!-- 列表 -->
		<view style="margin-top:20upx ;">
			<!-- 列表项 -->
			<view @tap="gopage(i)" class="bg-white list-item" v-for="(p,i) in lists " :key="i">
				<text>{{p.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderlist:[{
						text:'待付款',
						icon:"cuIcon-pay",
						num:0,
						id:0
					},
					{
						text:'待发货',
						icon:"cuIcon-deliver",
						num:2,
						id:1
					},
					{
						text:'待收货',
						icon:"cuIcon-pay",
						num:3,
						id:2
					},
					{
						text:'评价',
						icon:"cuIcon-pay",
						num:1,
						id:3
					},
					{
						text:'退款/售后',
						icon:"cuIcon-pay",
						num:4,
						id:4
					},
				],
				lists:[{
					text:'官方客服',
					id:0
				},{
					text:'设置',
					id:1
				},{
					text:'收货地址',
					id:2
				},{
					text:'登录/注销',
					id:3,
					url:"../login/login"
				}]	
			}
		},
		onLoad(){
			
		},
		methods: {
			gopage(item){
				var url = this.lists[item].url;
				if(url!=null&&url!=undefined){
					uni.reLaunch({
						url:url
					})
				}
				
			}
		}
	}
</script>

<style>
.user-logo{
	width: 120upx;
	height: 120upx;
}
.content{
	padding: 30upx 30upx 30upx 30upx;
}
.user-name{
	font-size: 120%;
	font-weight: bold;
}
.yueka-fa{
	background-color: #F8F8F8;
	display: flex;
	justify-content: center;
}
.yueka{
	width: 600upx;
	height: 80upx;
	background-color: #FADBD9;
	border-radius: 18upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: red;
	padding:10upx;
}
.list-item{
	height: 80upx;
	display: flex;
	align-items: center;
	padding-left: 40upx ;
	padding-right: 20upx;
	border-bottom: 1upx #ddd solid;
}
.list-content{
	margin-top: 20upx;
}
</style>
