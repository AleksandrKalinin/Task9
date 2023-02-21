import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, ThemeState } from "@/types/types";

import {
  SET_THEME,
  COLOR_TOMATO,
  COLOR_BLUE,
  COLOR_GREEN,
} from "@/constants/theme";

export const themeModule: Module<ThemeState, RootState> = {
  state: () => ({
    themeSelected: "#FF6347" as string,
    themeArray: [COLOR_TOMATO, COLOR_BLUE, COLOR_GREEN],
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
