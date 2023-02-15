import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, CanvasState } from "../types/types";
import { SET_COLOR, SET_SHAPE, SET_LINE_WIDTH } from "@/constants";

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
    [SET_COLOR](state: CanvasState, color: string): void {
      state.selectedColor = color;
    },

    [SET_SHAPE](state: CanvasState, shape: string): void {
      state.selectedShape = shape;
    },

    [SET_LINE_WIDTH](state: CanvasState, width: number): void {
      state.lineWidth = width;
    },
  },

  actions: {
    setColor({ commit }: ActionContext<CanvasState, unknown>, color: string) {
      commit(SET_COLOR, color);
    },

    setShape({ commit }: ActionContext<CanvasState, unknown>, shape: string) {
      commit(SET_SHAPE, shape);
    },

    setLineWidth(
      { commit }: ActionContext<CanvasState, unknown>,
      width: number
    ) {
      commit(SET_LINE_WIDTH, width);
    },
  },

  namespaced: true,
};
