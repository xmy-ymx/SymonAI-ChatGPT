"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      avatar: "",
      nickname: ""
    });
    const orderList = common_vendor.reactive([]);
    const showOrderList = common_vendor.ref(true);
    const goToOrderDetail = (orderId) => {
    };
    const goToProfile = () => {
    };
    const logout = () => {
    };
    const login = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    common_vendor.index.request({
      url: "/api/user/info",
      success: (res) => {
        userInfo.avatar = "../../public/u=3438742520,3870787236&fm=253&app=138&size=w931&n=0&f=PNG&fmt=auto.webp";
        userInfo.nickname = "张三丰";
      }
    });
    common_vendor.index.request({
      url: "/api/order/list",
      success: (res) => {
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.avatar,
        b: common_vendor.t(userInfo.nickname),
        c: showOrderList.value
      }, showOrderList.value ? {
        d: common_vendor.f(orderList, (item, index, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.status),
            d: common_vendor.o(($event) => goToOrderDetail(item.id), index),
            e: index
          };
        })
      } : {}, {
        e: common_vendor.o(goToProfile),
        f: common_vendor.o(logout),
        g: common_vendor.o(login)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"], ["__file", "D:/chat/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
