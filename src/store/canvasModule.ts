import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, CanvasState } from "@/types/types";
import router from "@/router";
import {
  SET_COLOR,
  SET_SHAPE,
  SET_LINE_WIDTH,
  SAVE_CANVAS,
  SAVE_SELECTED_ITEM,
} from "@/constants/canvas";

export const canvasModule: Module<CanvasState, RootState> = {
  state: () => ({
    selectedColor: "#000000" as string,
    selectedShape: "" as string,
    lineWidth: 1 as number,
    canvas: document.createElement("canvas") as HTMLCanvasElement,
    selectedItem: "" as string,
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

    canvas: (state: CanvasState) => {
      return state.canvas;
    },

    selectedItem: (state: CanvasState) => {
      return state.selectedItem;
    },
  },

  mutations: <MutationTree<CanvasState>>{
    [SET_COLOR](state: CanvasState, value: string): void {
      state.selectedColor = value;
    },

    [SET_SHAPE](state: CanvasState, value: string): void {
      state.selectedShape = value;
    },

    [SET_LINE_WIDTH](state: CanvasState, value: number): void {
      state.lineWidth = value;
    },

    [SAVE_CANVAS](state: CanvasState, value: HTMLCanvasElement): void {
      state.canvas = value;
    },

    [SAVE_SELECTED_ITEM](state: CanvasState, value: string): void {
      state.selectedItem = value;
    },
  },

  actions: {
    setColor({ commit }: ActionContext<CanvasState, unknown>, value: string) {
      commit(SET_COLOR, value);
    },

    setShape({ commit }: ActionContext<CanvasState, unknown>, value: string) {
      commit(SET_SHAPE, value);
    },

    setLineWidth(
      { commit }: ActionContext<CanvasState, unknown>,
      value: number
    ) {
      commit(SET_LINE_WIDTH, value);
    },

    saveCanvas(
      { commit }: ActionContext<CanvasState, unknown>,
      value: HTMLCanvasElement
    ) {
      commit(SAVE_CANVAS, value);
    },

    saveSelectedItem(
      { commit }: ActionContext<CanvasState, unknown>,
      value: string
    ) {
      try {
        commit(SAVE_SELECTED_ITEM, value);
      } catch (e) {
        console.log(e);
      }
      router.push("/");
    },
  },

  namespaced: true,
};
