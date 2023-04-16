"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      iphoneValue: "",
      //手机号码
      passwordValue: "",
      //密码
      testValue: "",
      //验证码
      showPassword: true,
      //是否显示密码
      showClearIcon: false,
      //是否显示清除按钮
      type: 2,
      //登录的状态 - - - 1是验证码登录、2是密码登录
      token: "",
      timer: 0,
      //验证码时间
      showTimer: true
      //是否显示验证码时间
    };
  },
  methods: {
    // 显示隐藏密码
    changePassword: function() {
      this.showPassword = !this.showPassword;
    },
    // 判断是否显示清除按钮
    clearInput: function(event) {
      this.iphoneValue = event.detail.value;
      if (event.detail.value.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
    // 清除内容/隐藏按钮
    clearIcon: function() {
      this.iphoneValue = "";
      this.showClearIcon = false;
    },
    // 切换登录的方式
    setLoginType(type) {
      this.type = type;
    },
    // 密码登录
    Login() {
      let that = this;
      if (!that.iphoneValue || !this.isMobile(that.iphoneValue)) {
        common_vendor.index.showToast({
          title: "请输入正确电话号码",
          icon: "none"
        });
        return false;
      }
      if (that.type == 2 && !that.passwordValue) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return false;
      }
      if (that.type == 1 && !that.testValue) {
        common_vendor.index.showToast({
          title: "请输入验证码",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.request({
        url: "http://127.0.0.1:3007/api/login",
        // 路径
        method: "POST",
        // 请求方法,
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: {
          phone: that.iphoneValue,
          // type: that.type,
          // code: that.testValue,
          password: that.passwordValue
        },
        //发送的数据
        success: (res) => {
          console.log(res);
          if (res.data.status == 200) {
            that.token = res.data.token;
            common_vendor.index.setStorageSync("token", that.token);
            common_vendor.index.setStorageSync("userInfo", JSON.stringify(res.data));
            common_vendor.index.switchTab({
              // 跳转到新闻页面
              url: "/pages/chat/chat"
            });
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "none"
            });
          } else {
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "none"
            });
          }
        }
      });
    },
    // 获取验证码
    getTest() {
      let that = this;
      if (!that.iphoneValue || !this.isMobile(that.iphoneValue)) {
        common_vendor.index.showToast({
          title: "请输入正确电话号码",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.request({
        url: "http://127.0.0.1:3007/api/login",
        // 路径
        method: "GET",
        // 请求方法
        data: {
          phone: that.iphoneValue,
          type: "1"
        },
        //发送的数据
        success: (res) => {
          if (res.data.code == 200) {
            common_vendor.index.showToast({
              title: "验证码发送成功",
              icon: "none"
            });
            that.timer = 60;
            that.timeDown(that.timer);
          }
        }
      });
    },
    // 设置验证码时间动态减少
    timeDown(num) {
      let that = this;
      if (num == 0) {
        that.showTimer = true;
        return clearTimeout();
      } else {
        that.showTimer = false;
        setTimeout(function() {
          that.timer = num - 1;
          that.timeDown(num - 1);
        }, 1e3);
      }
    },
    // 下面是可以封装起来引入的部分
    // 判断是否是正确的手机号码
    isMobile(str) {
      let reg = /^1\d{10}$/;
      return reg.test(str);
    }
  }
};
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.iphoneValue,
    b: common_vendor.o((...args) => $options.clearInput && $options.clearInput(...args)),
    c: $data.showClearIcon
  }, $data.showClearIcon ? {
    d: common_vendor.o($options.clearIcon),
    e: common_vendor.p({
      type: "closeempty",
      color: "#808080",
      size: "25"
    })
  } : {}, {
    f: $data.type == 2
  }, $data.type == 2 ? {
    g: $data.showPassword,
    h: $data.passwordValue,
    i: common_vendor.o(($event) => $data.passwordValue = $event.detail.value),
    j: common_vendor.o($options.changePassword),
    k: common_vendor.p({
      type: "eye-filled",
      color: "#808080",
      size: "25"
    })
  } : {}, {
    l: $data.type == 1
  }, $data.type == 1 ? common_vendor.e({
    m: $data.testValue,
    n: common_vendor.o(($event) => $data.testValue = $event.detail.value),
    o: $data.showTimer
  }, $data.showTimer ? {
    p: common_vendor.o(($event) => $options.getTest())
  } : {
    q: common_vendor.t($data.timer + "s")
  }) : {}, {
    r: $data.type == 2
  }, $data.type == 2 ? {
    s: common_vendor.o(($event) => $options.setLoginType(1))
  } : {}, {
    t: $data.type == 1
  }, $data.type == 1 ? {
    v: common_vendor.o(($event) => $options.setLoginType(2))
  } : {}, {
    w: common_vendor.o(($event) => $options.Login())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/chat/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
