import { createStore } from "vuex";
import { RootState } from "../components/types/types";
import { canvasModule } from "@/store/canvasModule";
import { authModule } from "@/store/authModule";
import { databaseModule } from "@/store/databaseModule";

export default createStore({
  state: <RootState>{},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    canvas: canvasModule,
    auth: authModule,
    database: databaseModule,
  },
});
