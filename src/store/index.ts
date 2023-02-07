import { createStore } from "vuex";
import { canvasModule } from "@/store/canvasModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    canvas: canvasModule,
  },
});
