<template>
	<view class="cu-bar">
		<view class="action text-bold" style="font-size: 120%;">{{title}}</view>
		<view @tap="goview" class="action flex align-center text-gray">查看更多
			<text class="cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		method:{
			goview(){
				uni.navigateTo({
					url:this.action+"?id="+this.goods_id				
				});
			}
		},
		props:{
			title:{
				type:String
			},
			action:{
				type:String
			},
			goods_id:{
				type:String
			}
		}
	}
</script>

<style>

</style>
