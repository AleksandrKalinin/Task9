import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, CanvasState, CanvasModuleMutations } from "@/types/types";
import router from "@/router";

export const canvasModule: Module<CanvasState, RootState> = {
  state: () => ({
    selectedColor: "#000000" as string,
    selectedShape: "" as string,
    lineWidth: 1 as number,
    fillStyle: "outline",
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

    fillStyle: (state: CanvasState) => {
      return state.fillStyle;
    },

    canvas: (state: CanvasState) => {
      return state.canvas;
    },

    selectedItem: (state: CanvasState) => {
      return state.selectedItem;
    },
  },

  mutations: <MutationTree<CanvasState>>{
    [CanvasModuleMutations.SET_COLOR](state: CanvasState, value: string): void {
      state.selectedColor = value;
    },

    [CanvasModuleMutations.SET_SHAPE](state: CanvasState, value: string): void {
      state.selectedShape = value;
    },

    [CanvasModuleMutations.SET_LINE_WIDTH](
      state: CanvasState,
      value: number
    ): void {
      state.lineWidth = value;
    },

    [CanvasModuleMutations.SET_FILL_STYLE](
      state: CanvasState,
      value: string
    ): void {
      state.fillStyle = value;
    },

    [CanvasModuleMutations.SAVE_CANVAS](
      state: CanvasState,
      value: HTMLCanvasElement
    ): void {
      state.canvas = value;
    },

    [CanvasModuleMutations.SAVE_SELECTED_ITEM](
      state: CanvasState,
      value: string
    ): void {
      state.selectedItem = value;
    },
  },

  actions: {
    setColor({ commit }: ActionContext<CanvasState, unknown>, value: string) {
      commit(CanvasModuleMutations.SET_COLOR, value);
    },

    setShape({ commit }: ActionContext<CanvasState, unknown>, value: string) {
      commit(CanvasModuleMutations.SET_SHAPE, value);
    },

    setLineWidth(
      { commit }: ActionContext<CanvasState, unknown>,
      value: number
    ) {
      commit(CanvasModuleMutations.SET_LINE_WIDTH, value);
    },

    setFillStyle(
      { commit }: ActionContext<CanvasState, unknown>,
      fillStyle: string
    ) {
      commit(CanvasModuleMutations.SET_FILL_STYLE, fillStyle);
    },

    saveCanvas(
      { commit }: ActionContext<CanvasState, unknown>,
      value: HTMLCanvasElement
    ) {
      commit(CanvasModuleMutations.SAVE_CANVAS, value);
    },

    saveSelectedItem(
      { commit }: ActionContext<CanvasState, unknown>,
      value: string
    ) {
      try {
        commit(CanvasModuleMutations.SAVE_SELECTED_ITEM, value);
      } catch (e) {
        console.log(e);
      }
      router.push("/");
    },
  },

  namespaced: true,
};
