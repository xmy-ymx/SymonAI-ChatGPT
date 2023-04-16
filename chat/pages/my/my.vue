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
			<view class="item" @click="goToSettings" v-show="userInfo.status">设置</view>
			<view class="item" @click="goToAbout" v-show="userInfo.status">关于</view>
			<view class="item" @click="logout" v-show="userInfo.status">退出登录</view>
		</view>


		<view class="is—login">
			<button class="loginBtn" @click="login" v-show="!userInfo.status">登录后查看更多信息</button>

		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';

	import {
		onShow
	} from "@dcloudio/uni-app"

	const userInfo = reactive({
		avatar: '',
		nickname: '',
		status: false
	});

	const orderList = reactive([]);

	const showOrderList = ref(true);

	const goToOrderDetail = (orderId) => {
		// 进入订单详情
	};

	const goToSettings = () => {
		// 进入s设置页面
	};
	const goToAbout = () => {
		// 进入关于页面
	};
	const logout = () => {
		// 退出登录
		uni.clearStorageSync()

		uni.reLaunch({
			url: '/pages/login/login'
		})

		uni.showToast({
			title: '退出登录',
			icon: 'none'
		})

	};

	const login = () => {
		// 点击登录
		uni.navigateTo({
			url: '/pages/login/login'
		})
	};
	onShow(() => {
		// 获取用户信息
		uni.request({
			url: 'http://127.0.0.1:3007/my/userinfo?id=1',
			method: 'GET',
			header: {
				"Authorization": uni.getStorageSync('token')
			},


			success: (res) => {
				if (res.data.status == 200) {
					const userinfo = JSON.parse(JSON.stringify(res.data))
					userInfo.avatar = userinfo.data.user_pic;
					userInfo.nickname = userinfo.data.name;
					userInfo.status = true
				} else {
					userInfo.avatar =
						'../../public/u=3438742520,3870787236&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto.webp';
					userInfo.nickname = '未登录';
					userInfo.status = false
				}

			},




		});
	})


	// 获取订单列表
	// uni.request({
	// 	url: '/api/order/list',
	// 	success: (res) => {
	// 		// orderList = res.data.orderList;
	// 	}
	// });
</script>
<style scoped lang="scss">

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		height: 180px;
		background-color: #f0f0f0;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
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

	.loginBtn {
		margin-bottom: 500rpx
	}
</style>
