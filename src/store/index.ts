import clone from "@/lib/clone";
import createID from "@/lib/createID";
import dayjs from "dayjs";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createTagError: null,
  } as RootState,
  mutations: {
    //recordList
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      );
      // return store.state.recordList;
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      console.log("jxm");

      console.log(record2.createdAt);
      console.log(dayjs(record2.createdAt).format("YYYY-MM-DD"));

      record2.createdAt =
        dayjs(record2.createdAt).format("YYYY-MM-DD") ||
        new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    //tagList
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", { name: "衣服", type: "-", flag: true });
        store.commit("createTag", { name: "食物", type: "-", flag: true });
        store.commit("createTag", { name: "住宿", type: "-", flag: true });
        store.commit("createTag", { name: "出行", type: "-", flag: true });

        store.commit("createTag", { name: "工资", type: "+", flag: true });
        store.commit("createTag", { name: "理财", type: "+", flag: true });
        store.commit("createTag", { name: "兼职", type: "+", flag: true });
        store.commit("createTag", { name: "零花钱", type: "+", flag: true });
      }
      return state.tagList;
    },
    createTag(state, { name, type, flag }) {
      const names = state.tagList.map((t: { name: string }) => t.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复了");
        // state.createTagError = new Error("tag name duplicated ");
        return;
      } else if (name === "") {
        window.alert("标签名不能为空");
      } else if (name === null) {
        return;
      } else {
        const id = createID().toString();
        state.tagList.push({ id: id, name: name, type: type });
        store.commit("saveTags");
        if (flag === true) {
          return;
        } else {
          window.alert("添加成功");
        }
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    //删除
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i]["id"] === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit("saveTags");
    },
    //修改
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item: any) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item: any) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复了！");
        } else {
          const tag: any = state.tagList.filter(
            (item: any) => item.id === id
          )[0];
          tag.name = name;
          // tag.type = type;
          store.commit("saveTags");
        }
      }
    },

    setcurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(
        (t: { id: string }) => t.id === id
      )[0];
    },
  },
});
store.commit("fetchTags");
export default store;
