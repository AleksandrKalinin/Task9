interface StateData {
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
    selectedColor: (state: StateData) => {
      return state.selectedColor;
    },

    selectedShape: (state: StateData) => {
      return state.selectedShape;
    },

    lineWidth: (state: StateData) => {
      return state.lineWidth;
    },
  },

  mutations: {
    setColor(state: StateData, value: string) {
      state.selectedColor = value;
    },

    setShape(state: StateData, value: string) {
      state.selectedShape = value;
    },

    setLineWidth(state: StateData, value: number) {
      state.lineWidth = value;
    },
  },

  actions: {
    setColor({ commit }: any, value: string) {
      commit("setColor", value);
    },

    setShape({ commit }: any, value: string) {
      commit("setShape", value);
    },

    setLineWidth({ commit }: any, value: number) {
      commit("setLineWidth", value);
    },
  },

  namespaced: true,
};
