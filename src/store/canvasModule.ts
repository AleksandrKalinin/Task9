import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, CanvasState } from "../components/types/types";
import router from "@/router";

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
    setColor(state: CanvasState, value: string): void {
      state.selectedColor = value;
    },

    setShape(state: CanvasState, value: string): void {
      state.selectedShape = value;
    },

    setLineWidth(state: CanvasState, value: number): void {
      state.lineWidth = value;
    },

    saveCanvas(state: CanvasState, value: HTMLCanvasElement): void {
      state.canvas = value;
    },

    saveSelectedItem(state: CanvasState, value: string): void {
      state.selectedItem = value;
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

    saveCanvas(
      { commit }: ActionContext<CanvasState, unknown>,
      value: HTMLCanvasElement
    ) {
      commit("saveCanvas", value);
    },

    saveSelectedItem(
      { commit }: ActionContext<CanvasState, unknown>,
      value: string
    ) {
      try {
        commit("saveSelectedItem", value);
      } catch (e) {
        console.log(e);
      }
      router.push("/");
    },
  },

  namespaced: true,
};
