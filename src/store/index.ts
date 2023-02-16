import { createStore } from "vuex";
import { RootState } from "../components/types/types";
import { canvasModule } from "@/store/canvasModule";
import { authModule } from "@/store/authModule";
import { databaseModule } from "@/store/databaseModule";
import { useToast } from "vue-toastification";

const toast = useToast();

export default createStore({
  state: <RootState>{},
  getters: {},
  mutations: {},
  actions: {
    showSuccessToast(_, message: string) {
      toast.success(message, { timeout: 3000 });
    },

    showErrorToast(_, message: string) {
      toast.error(message, { timeout: 3000 });
    },

    showWarningToast(_, message: string) {
      toast.warning(message, { timeout: 3000 });
    },
  },
  modules: {
    canvas: canvasModule,
    auth: authModule,
    database: databaseModule,
  },
});
