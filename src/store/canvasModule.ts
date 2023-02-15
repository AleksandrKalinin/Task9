import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, CanvasState } from "../types/types";

export const canvasModule: Module<CanvasState, RootState> = {
  state: () => ({
    selectedColor: "#000000" as string,
    selectedShape: "" as string,
    lineWidth: 1 as number,
  }),

  getters: <GetterTree<CanvasState, RootState>>{
    selectedColor: (state: CanvasState) => {
      return state.selectedColor;
    },

    selectedShape: (state: CanvasState) => {
      return state.selectedShape;
    },

    lineWidth: (state: CanvasState) => {
      return state.lineWidth;
    },
  },

  mutations: <MutationTree<CanvasState>>{
    setColor(state: CanvasState, color: string): void {
      state.selectedColor = color;
    },

    setShape(state: CanvasState, shape: string): void {
      state.selectedShape = shape;
    },

    setLineWidth(state: CanvasState, width: number): void {
      state.lineWidth = width;
    },
  },

  actions: {
    setColor({ commit }: ActionContext<CanvasState, unknown>, color: string) {
      commit("setColor", color);
    },

    setShape({ commit }: ActionContext<CanvasState, unknown>, shape: string) {
      commit("setShape", shape);
    },

    setLineWidth(
      { commit }: ActionContext<CanvasState, unknown>,
      width: number
    ) {
      commit("setLineWidth", width);
    },
  },

  namespaced: true,
};
