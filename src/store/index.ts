import { createStore } from "vuex";
import { RootState, CanvasState } from "../components/types/types";
import { canvasModule } from "@/store/canvasModule";

export default createStore({
  state: <RootState>{},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    canvas: canvasModule,
  },
});
