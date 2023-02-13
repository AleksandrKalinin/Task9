import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import {
  RootState,
  DatabaseState,
  DatabaseItem,
  GalleryItem,
} from "../components/types/types";
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
    items: [] as Array<DatabaseItem>,
    filteredItems: [] as Array<DatabaseItem>,
    areItemsLoaded: false as boolean,
    searchQuery: "" as string,
  }),

  getters: <GetterTree<DatabaseState, RootState>>{
    items: (state: DatabaseState) => {
      return state.items;
    },

    areItemsLoaded: (state: DatabaseState) => {
      return state.areItemsLoaded;
    },

    searchQuery: (state: DatabaseState) => {
      return state.searchQuery;
    },

    filteredItems: (state: DatabaseState, getters) => {
      if (state.searchQuery === "") {
        return getters.items;
      } else {
        return [
          ...getters.items.filter((item: DatabaseItem) =>
            item.author.toLowerCase().includes(state.searchQuery.toLowerCase())
          ),
        ];
      }
    },
  },

  mutations: <MutationTree<DatabaseState>>{
    updateItems(state: DatabaseState, value: Array<DatabaseItem>): void {
      state.items = value;
    },

    changeStatus(state: DatabaseState): void {
      state.areItemsLoaded = true;
    },

    updateSearchQuery(state: DatabaseState, value: string): void {
      state.searchQuery = value;
    },
  },

  actions: {
    async fetchItems({ commit }: ActionContext<DatabaseState, unknown>) {
      const array: Array<DatabaseItem> = [];
      try {
        const itemsRef = collection(db, "items");
        const queryToDB = query(itemsRef);
        const querySnapshot: any = await getDocs(queryToDB);
        if (querySnapshot) {
          querySnapshot.forEach((doc: { [key: string]: any }) => {
            console.log(doc);
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

    async addItemToDatabase(_, newItem: DatabaseItem) {
      try {
        await setDoc(doc(db, "items", newItem.id), newItem);
      } catch (e) {
        console.log(e);
      }
    },

    async pushIntoDatabase(_, values: Array<GalleryItem>) {
      for (let i = 0; i < values.length; i++) {
        const newDate: any = Timestamp.fromDate(new Date(values[i].date));
        values[i].date = newDate;
        try {
          await setDoc(doc(db, "items", values[i].id.toString()), values[i]);
        } catch (e) {
          console.log(e);
        }
      }
    },

    updateSearchQuery(
      { commit }: ActionContext<DatabaseState, unknown>,
      value: string
    ) {
      commit("updateSearchQuery", value);
    },
  },

  namespaced: true,
};
