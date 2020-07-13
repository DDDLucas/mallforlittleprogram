<template>
	<view>
		<view style="margin-top: 150upx ;" class="flex flex-direction align-center">
			<image class="logo" src="../../static/icon/chicken.png"></image>
			<view style="margin-top:30upx;color: grey ;">正品低价有保障</view>
		</view>
		<view style="margin-top: 50upx;">
			<view>
				<input class="log-input input-fa" placeholder="用户名/邮箱/手机号" v-model="form.phone" />
			</view>
			<view class="flex justify-between align-center">
				<input class="log-input input-fa" :placeholder="status?'请输入验证码':'请输入密码'"  v-model="form.password" :password="true"/>
				<button :disabled="yzmclick" @tap="huoquyzm" class="cu-btn bg-orange" v-if="status==1">{{yzmtext}}</button>
			</view>
		</view>
		
		<!-- 登录 -->
		<view style="margin-top: 20upx; " >
			<button @tap="login" style="width: 90%;" class="bg-gradual-red round">
				登录
			</button>
		</view>
		<!-- 忘记密码和注册 -->
		<view style="margin-top: 20upx; " class="input-fa flex justify-between">
			<text>忘记密码</text>
			<text>新用户注册</text>
		</view>
		
		<!-- 分割线 -->
		<view style="margin-top: 20upx;" class="flex justify-between align-center">
			<view class="line"></view>
			<view style="color: grey;">其他登录方式</view>
			<view class="line"></view>
		</view>
		
		<!-- 其他方式 两个快捷登录按钮-->
		<view class="flex justify-around">
			<view class=" flex flex-direction align-center center">
				<image class="anniulogo" src="../../static/icon/weixin.png"></image>
				<view style="margin-top: 10upx;">微信登录</view>
			</view>
			<view @tap="changeStatus" class=" flex flex-direction align-center center">
				<image class="anniulogo" :src="status==0?'../../static/icon/phone.png':'../../static/icon/account.png'"></image>
				<view style="margin-top: 10upx;">{{status==0?'验证码':'密码'}}登录</view>
			</view>
		</view>
		
		<!-- 版权声明 -->
		<view style="position: fixed;bottom: 10upx; color: grey; text-align: center; width: 750upx;">
			登录代表您已同意<text class="text-blue">【隐私政策】</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:0,  //状态表示登录类型0   密码登录  1  验证码登录
				form:{
					phone:"",
					password:''
				},
				yzmtext:"获取验证码",
				yzmclick:false
			}
		},
		methods: {
			huoquyzm(){
				var its=this;
				if(this.form.phone.length!=11){
					uni.showToast({
						icon:"none",
						title:"请输出正确的手机号"
					});
					return ;
				}
				if(this.yzmtext=="获取验证码"){
					this.yzmclick=true;
				}else{
					return;
				}
				//获取验证码
				uni.request({
					url:this.$url+"/user/getsms",
					data:{
						phone:this.form.phone
					},
					method:"POST",
					dataType:"json",
					success:(res)=> {
						console.log(res.data);
					}
				})
				//获取验证码
				
				var seconds=60;
				var jishiqi = setInterval(()=>{
					seconds--;
					its.yzmtext =seconds+"秒后重发";
					if(seconds<=0){
						its.yzmtext="获取验证码";
						its.yzmclick=false;
						clearInterval(jishiqi);
					}
					
				},1000);
			},
			changeStatus(){
				this.status = this.status?0:1;
			},
			login(){
				uni.request({
					url:this.$url+"/user/login",
					data:{
						phone:this.form.phone,
						password:this.form.password
					},
					method:"POST",
					success:(res)=> {
						uni.showToast({
							icon:"none",
							// title:"欢迎"
							title:res.data.desc+(res.data.status==0?(','+res.data.info.name):'')
						})
						if(res.data.status==0){
							uni.setStorageSync("uid",res.data.uid);
							uni.switchTab({
								url:"../my/my"
							})
						}
						console.log(res.data);
					}
				})
			}
		}
	}
</script>
<style>
.logo{
	width: 100upx;
	height: 100upx;
	
}
.log-input{
	height: 100upx;
	border-bottom: 1upx solid #DDDDDD ;
}
.input-fa{
	padding:20upx 20upx 20upx 20upx;
}
.line{
	height: 1upx;
	background-color: #DDDDDD;
	flex-grow: 1;
}
.anniulogo{
	width: 100upx;
	height: 100upx;
}
</style>
