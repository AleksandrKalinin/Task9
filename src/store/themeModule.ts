import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, ThemeState, ThemeModuleMutations } from "@/types/types";

export const themeModule: Module<ThemeState, RootState> = {
  state: () => ({
    themeSelected: "#FF6347" as string,
    themeArray: [
      ThemeModuleMutations.COLOR_TOMATO,
      ThemeModuleMutations.COLOR_BLUE,
      ThemeModuleMutations.COLOR_GREEN,
    ],
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
    [ThemeModuleMutations.SET_THEME](state: ThemeState, theme: string): void {
      state.themeSelected = theme;
    },
  },

  actions: {
    setTheme({ commit }: ActionContext<ThemeState, unknown>, theme: string) {
      commit(ThemeModuleMutations.SET_THEME, theme);
    },
  },

  namespaced: true,
};
