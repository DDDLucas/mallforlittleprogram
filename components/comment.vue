<template>
	<view class="comment-item">
		<!-- 头像和名字 -->
		<view class="flex align-center">
			<image class="comment-avatar " :src="item.avatar"></image>
			<view class="comment-name">{{item.name}}</view>
		</view>
		<!-- 评价 -->
		<view class="comment-content">
			{{item.content}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			xiujiancontent(){
				var max=50;
				if(this.item.content.length<max){
					
				}else{
					this.item.content = this.item.content.substring(0,max)+"...";
				}
				
				
			}
		},
		created(){  //加载完成时进行
			this.xiujiancontent();
		},
		props:{
			item:{  //这个是在主控那边调用时传的参数
				type:Object,
				default(){
					return{
						comment_id:0,
						avatar:null,
						name:null,
						comment:null,
						ins_date:null
						
					}
				}
			}
		}
	}
</script>

<style>
.comment-avatar{
	width: 60upx;
	height: 60upx;
	border-radius: 60upx;
	
}
.comment-item{
	padding: 20upx 20upx;
	border-bottom: 1upx  solid #DDDDDD ;
}
.comment-name{
	font-size: 110%;
	font-weight: bold;
	margin-left: 10upx;
}
.comment.content{
	margin-top: 10upx;
	font-size: ;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
