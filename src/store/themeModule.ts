import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, ThemeState } from "../components/types/types";

import { SET_THEME } from "@/constants/theme";

export const themeModule: Module<ThemeState, RootState> = {
  state: () => ({
    themeSelected: "#FF6347" as string,
    themeArray: ["#FF6347", "#4169E1", "#299617"],
  }),

  getters: <GetterTree<ThemeState, RootState>>{
    themeSelected: (state: ThemeState) => {
      return state.themeSelected;
    },

    themeArray: (state: ThemeState) => {
      return state.themeArray;
    },
  },

  mutations: <MutationTree<ThemeState>>{
    [SET_THEME](state: ThemeState, theme: string): void {
      state.themeSelected = theme;
    },
  },

  actions: {
    setTheme({ commit }: ActionContext<ThemeState, unknown>, theme: string) {
      commit(SET_THEME, theme);
    },
  },

  namespaced: true,
};
