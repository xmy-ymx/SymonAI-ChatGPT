"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "todo",
  setup(__props) {
    const cloud = new common_vendor.Cloud({
      baseUrl: "https://ayebvv.laf.dev",
      // 这里的 <AppID> 需要换成自己的 AppID
      getAccessToken: () => ""
      // 这里先为空
    });
    const newTodo = common_vendor.ref("");
    const list = common_vendor.ref([]);
    getList();
    async function getList() {
      const res = await cloud.invoke("todo");
      list.value = res.data;
    }
    async function submit() {
      if (!newTodo.value)
        return;
      const obj = {
        name: newTodo.value,
        complete: false
      };
      await cloud.invoke("add-todo", obj);
      newTodo.value = "";
      getList();
    }
    async function complete(index, id) {
      list.value[index].complete = !list.value[index].complete;
      await cloud.invoke("update-todo", {
        id,
        data: list.value[index]
      });
    }
    async function del(id) {
      await cloud.invoke("del-todo", { id });
      getList();
    }
    return (_ctx, _cache) => {
      return {
        a: newTodo.value,
        b: common_vendor.o(($event) => newTodo.value = $event.detail.value),
        c: common_vendor.o(submit),
        d: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: item.complete,
            b: common_vendor.o(($event) => complete(index, item._id)),
            c: common_vendor.t(item.name),
            d: common_vendor.o(($event) => del(item._id)),
            e: common_vendor.n(item.complete ? "completed todo-row" : "todo-row")
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/chat/pages/todo/todo.vue"]]);
wx.createPage(MiniProgramPage);
