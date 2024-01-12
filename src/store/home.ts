import { defineStore } from "pinia";

const useMain = defineStore("main", {
  state: () => {
    return {
      userInfo: {},
      tagLists: [],
      counter: 0,
      name: "Eduardo",
    };
  },
  getters: {
    doubleCount: (state) => {
      return state.counter * 2;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
  persist: {
    enabled: true,
  },
});

export default useMain;
