<template>
	<view>
		<!-- 用户信息 -->
		<view class="user-info">
			<image class="avatar" :src="userInfo.avatar"></image>
			<view class="nickname"><text>{{ userInfo.nickname }}</text></view>

		</view>

		<!-- 订单列表 -->
		<view class="order-list" v-if="showOrderList">
			<view class="order-item" v-for="(item, index) in orderList" :key="index">
				<image class="cover" :src="item.cover"></image>
				<text class="title">{{ item.title }}</text>
				<text class="status">{{ item.status }}</text>
				<!-- 点击进入订单详情页面 -->
				<button class="btn" @click="goToOrderDetail(item.id)">查看详情</button>
			</view>
		</view>

		<!-- 设置 -->
		<view class="settings">
			<view class="item" @click="goToProfile">个人资料</view>
			<view class="item" @click="logout">退出登录</view>
		</view>
		
		
		<view class="is—login">
			<button class="loginBtn"  @click="login">登录后查看更多信息</button>
			
		</view>
		
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';

	const userInfo = reactive({
		avatar: '',
		nickname: '',
	});

	const orderList = reactive([]);

	const showOrderList = ref(true);

	const goToOrderDetail = (orderId) => {
		// 进入订单详情
	};

	const goToProfile = () => {
		// 进入个人资料页面
	};

	const logout = () => {
		// 退出登录
	};

	const login = () => {
		// 点击登录
		uni.navigateTo({
			url:'/pages/login/login'
		})
	};
	
	// 获取用户信息
	uni.request({
		url: '/api/user/info',
		success: (res) => {
			userInfo.avatar =
				'../../public/u=3438742520,3870787236&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto.webp';
			userInfo.nickname = '张三丰';
		}
	});

	// 获取订单列表
	uni.request({
		url: '/api/order/list',
		success: (res) => {
			// orderList = res.data.orderList;
		}
	});
</script>
<style scoped>
	.user-info {	
display: flex;
flex-direction: column;
align-items: center;
align-items: center;
		padding: 20rpx;
		background-color: #f0f0f0;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.nickname {
		font-size: 36rpx;
	}

	.order-list {
		margin-top: 20rpx;
	}

	.order-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #e5e5e5;
	}

	.cover {
		width: 120rpx;
		height: 160rpx;
		margin-right: 20rpx;
	}

	.title {
		font-size: 36rpx;
		margin-bottom: 10rpx;
	}

	.status {
		font-size: 30rpx;
		color: #999999;
	}

	.btn {
		padding: 10rpx 20rpx;
		font-size: 30rpx;
	}

	.settings {
		margin-top: 40rpx;
		background-color: #ffffff;
	}

	.item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1rpx solid #e5e5e5;
		font-size: 36rpx;
	}
	.loginBtn{
		margin-bottom: 500rpx
	}
	
</style>
