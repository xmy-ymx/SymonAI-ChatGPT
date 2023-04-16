"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_circle = common_vendor.resolveComponent("circle");
  const _component_line = common_vendor.resolveComponent("line");
  const _component_svg = common_vendor.resolveComponent("svg");
  const _component_path = common_vendor.resolveComponent("path");
  const _component_polygon = common_vendor.resolveComponent("polygon");
  (_component_circle + _component_line + _component_svg + _component_path + _component_polygon)();
}
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const cloud = new common_vendor.Cloud({
      baseUrl: "https://ayebvv.laf.dev",
      getAccessToken: () => ""
    });
    const list = common_vendor.ref([]);
    const question = common_vendor.ref("");
    const parentMessageId = common_vendor.ref("");
    const loading = common_vendor.ref(false);
    async function send() {
      if (loading.value)
        return;
      list.value.push({
        text: question.value,
        avatar: "../../public/u=2742191467,3729002290&fm=253&fmt=auto&app=138&f=JPEG.webp"
      });
      setScreen();
      const message = question.value;
      question.value = "";
      loading.value = true;
      let res;
      if (message == "") {
        loading.value = false;
        list.value.push({
          text: "问题不能为空！",
          avatar: "../../public/log.png"
        });
        setScreen();
        return;
      }
      try {
        if (!parentMessageId.value) {
          res = await cloud.invoke("chat", { message });
        } else {
          res = await cloud.invoke("chat", {
            message,
            parentMessageId: parentMessageId.value
          });
        }
      } catch (error) {
        console.log(error);
        loading.value = false;
        list.value.push({
          text: "出错了，请重试！",
          avatar: "../../public/log.png"
        });
        setScreen();
        return;
      }
      parentMessageId.value = res.id;
      res.text = common_vendor.marked.parse(res.text);
      list.value.push({
        text: res.text,
        avatar: "../../public/log.png"
      });
      loading.value = false;
      setScreen();
    }
    function setScreen() {
      setTimeout(() => {
      }, 0);
    }
    return (_ctx, _cache) => {
      return {
        a: !list.value.length,
        b: common_vendor.o(send),
        c: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.avatar,
            b: item.text,
            c: common_vendor.n(item.type === 0 ? "problemList" : "answerList")
          };
        }),
        d: common_assets._imports_0,
        e: common_assets._imports_1,
        f: loading.value,
        g: common_vendor.p({
          cx: "12",
          cy: "12",
          r: "5"
        }),
        h: common_vendor.p({
          x1: "12",
          x2: "12",
          y1: "1",
          y2: "3"
        }),
        i: common_vendor.p({
          x1: "12",
          x2: "12",
          y1: "21",
          y2: "23"
        }),
        j: common_vendor.p({
          x1: "4.22",
          x2: "5.64",
          y1: "4.22",
          y2: "5.64"
        }),
        k: common_vendor.p({
          x1: "18.36",
          x2: "19.78",
          y1: "18.36",
          y2: "19.78"
        }),
        l: common_vendor.p({
          x1: "1",
          x2: "3",
          y1: "12",
          y2: "12"
        }),
        m: common_vendor.p({
          x1: "21",
          x2: "23",
          y1: "12",
          y2: "12"
        }),
        n: common_vendor.p({
          x1: "4.22",
          x2: "5.64",
          y1: "19.78",
          y2: "18.36"
        }),
        o: common_vendor.p({
          x1: "18.36",
          x2: "19.78",
          y1: "5.64",
          y2: "4.22"
        }),
        p: common_vendor.p({
          fill: "none",
          height: "1em",
          stroke: "currentColor",
          ["stroke-linecap"]: "round",
          ["stroke-linejoin"]: "round",
          ["stroke-width"]: "1.5",
          viewBox: "0 0 24 24",
          width: "1em",
          xmlns: "http://www.w3.org/2000/svg"
        }),
        q: common_vendor.p({
          d: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
          ["stroke-linecap"]: "round",
          ["stroke-linejoin"]: "round"
        }),
        r: common_vendor.p({
          ["aria-hidden"]: "true",
          fill: "none",
          stroke: "currentColor",
          ["stroke-width"]: "1.5",
          viewBox: "0 0 24 24",
          xmlns: "http://www.w3.org/2000/svg"
        }),
        s: common_vendor.p({
          d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        }),
        t: common_vendor.p({
          x1: "12",
          x2: "12",
          y1: "9",
          y2: "13"
        }),
        v: common_vendor.p({
          x1: "12",
          x2: "12.01",
          y1: "17",
          y2: "17"
        }),
        w: common_vendor.p({
          fill: "none",
          height: "1em",
          stroke: "currentColor",
          ["stroke-linecap"]: "round",
          ["stroke-linejoin"]: "round",
          ["stroke-width"]: "1.5",
          viewBox: "0 0 24 24",
          width: "1em",
          xmlns: "http://www.w3.org/2000/svg"
        }),
        x: !list.value.length,
        y: loading.value,
        z: common_vendor.o(send),
        A: common_vendor.o(send),
        B: question.value,
        C: common_vendor.o(($event) => question.value = $event.detail.value),
        D: common_vendor.p({
          x1: "22",
          y1: "2",
          x2: "11",
          y2: "13"
        }),
        E: common_vendor.p({
          points: "22 2 15 22 11 13 2 9 22 2"
        }),
        F: common_vendor.p({
          stroke: "currentColor",
          fill: "none",
          ["stroke-width"]: "2",
          viewBox: "0 0 24 24",
          ["stroke-linecap"]: "round",
          ["stroke-linejoin"]: "round",
          height: "1.5em",
          width: "1.5em",
          xmlns: "http://www.w3.org/2000/svg"
        }),
        G: common_vendor.o(send)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a633310"], ["__file", "D:/chat/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
