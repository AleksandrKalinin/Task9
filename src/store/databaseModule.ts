import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, DatabaseState } from "../components/types/types";
import { db } from "@/database/index";
import {
  doc,
  collection,
  query,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";

export const databaseModule: Module<DatabaseState, RootState> = {
  state: () => ({
    items: [] as any,
    areItemsLoaded: false as boolean,
  }),

  getters: <GetterTree<DatabaseState, RootState>>{
    items: (state: DatabaseState) => {
      return state.items;
    },

    areItemsLoaded: (state: DatabaseState) => {
      return state.areItemsLoaded;
    },
  },

  mutations: <MutationTree<DatabaseState>>{
    updateItems(state: DatabaseState, value: Array<any>): void {
      state.items = value;
    },

    addItem(state: DatabaseState, value: any): void {
      state.items.push(value);
    },

    changeStatus(state: DatabaseState, value: any): void {
      state.areItemsLoaded = true;
    },
  },

  actions: {
    async fetchItems(
      { commit }: ActionContext<DatabaseState, unknown>,
      itemsDB: any
    ) {
      const array: any = [];
      try {
        const itemsRef = collection(db, "items");
        const queryToDB = query(itemsRef);
        const querySnapshot: any = await getDocs(queryToDB);
        if (querySnapshot) {
          querySnapshot.forEach((doc: any) => {
            array.push(doc.data());
          });
          commit("updateItems", array);
        } else {
          console.log("No such document!");
        }
        commit("changeStatus", true);
      } catch (e) {
        console.log(e);
      }
    },

    addItem({ commit }: ActionContext<DatabaseState, unknown>, value: any) {
      commit("addItem", value);
    },

    async pushIntoDatabase(_, values: any) {
      console.log(values);
      for (let i = 0; i < values.length; i++) {
        const newDate = Timestamp.fromDate(new Date(values[i].date));
        console.log(newDate);
        values[i].date = newDate;
        try {
          await setDoc(doc(db, "items", values[i].id.toString()), values[i]);
        } catch (e) {
          console.log(e);
        }
      }
    },
  },

  namespaced: true,
};
