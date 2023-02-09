import { ActionContext } from "vuex";

interface ModuleData {
  selectedColor: string;
  selectedShape: string;
  lineWidth: number;
}

export const canvasModule = {
  state: () => ({
    selectedColor: "#000000" as string,
    selectedShape: "" as string,
    lineWidth: 1 as number,
  }),

  getters: {
    selectedColor: (state: ModuleData) => {
      return state.selectedColor;
    },

    selectedShape: (state: ModuleData) => {
      return state.selectedShape;
    },

    lineWidth: (state: ModuleData) => {
      return state.lineWidth;
    },
  },

  mutations: {
    setColor(state: ModuleData, value: string): void {
      state.selectedColor = value;
    },

    setShape(state: ModuleData, value: string): void {
      state.selectedShape = value;
    },

    setLineWidth(state: ModuleData, value: number): void {
      state.lineWidth = value;
    },
  },

  actions: {
    setColor({ commit }: ActionContext<ModuleData, unknown>, value: string) {
      commit("setColor", value);
    },

    setShape({ commit }: ActionContext<ModuleData, unknown>, value: string) {
      commit("setShape", value);
    },

    setLineWidth(
      { commit }: ActionContext<ModuleData, unknown>,
      value: number
    ) {
      commit("setLineWidth", value);
    },
  },

  namespaced: true,
};
