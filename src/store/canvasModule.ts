import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, CanvasState } from "../components/types/types";

export const canvasModule: Module<CanvasState, RootState> = {
  state: () => ({
    selectedColor: "#000000" as string,
    selectedShape: "" as string,
    lineWidth: 1 as number,
    savedItems: [] as Array<any>,
    canvas: document.createElement("canvas") as HTMLCanvasElement,
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

    savedItems: (state: CanvasState) => {
      return state.savedItems;
    },

    canvas: (state: CanvasState) => {
      return state.canvas;
    },
  },

  mutations: <MutationTree<CanvasState>>{
    setColor(state: CanvasState, value: string): void {
      state.selectedColor = value;
    },

    setShape(state: CanvasState, value: string): void {
      state.selectedShape = value;
    },

    setLineWidth(state: CanvasState, value: number): void {
      state.lineWidth = value;
    },

    saveItem(state: CanvasState, value: any): void {
      state.savedItems.push(value);
    },

    saveCanvas(state: CanvasState, value: any): void {
      state.canvas = value;
    },
  },

  actions: {
    setColor({ commit }: ActionContext<CanvasState, unknown>, value: string) {
      commit("setColor", value);
    },

    setShape({ commit }: ActionContext<CanvasState, unknown>, value: string) {
      commit("setShape", value);
    },

    setLineWidth(
      { commit }: ActionContext<CanvasState, unknown>,
      value: number
    ) {
      commit("setLineWidth", value);
    },

    saveItem({ commit }: ActionContext<CanvasState, unknown>, value: any) {
      commit("saveItem", value);
    },

    saveCanvas(
      { commit }: ActionContext<CanvasState, unknown>,
      value: HTMLCanvasElement
    ) {
      commit("saveCanvas", value);
    },
  },

  namespaced: true,
};
