import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import {
  RootState,
  DatabaseState,
  DatabaseItem,
  GalleryItem,
} from "@/types/types";
import { auth } from "@/database/index";
import { db } from "@/database/index";
import {
  doc,
  collection,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { UPDATE_ITEMS, CHANGE_STATUS } from "@/constants/database";

export const databaseModule: Module<DatabaseState, RootState> = {
  state: () => ({
    items: [] as Array<DatabaseItem>,
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
  },

  mutations: <MutationTree<DatabaseState>>{
    [UPDATE_ITEMS](state: DatabaseState, value: Array<DatabaseItem>): void {
      state.items = value;
    },

    [CHANGE_STATUS](state: DatabaseState): void {
      state.areItemsLoaded = true;
    },
  },

  actions: {
    async fetchItems({ commit }: ActionContext<DatabaseState, unknown>) {
      const array: Array<DatabaseItem> = [];
      try {
        const itemsRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "images"
        );
        const queryToDB = query(itemsRef);
        const querySnapshot: any = await getDocs(queryToDB);
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc: { [key: string]: any }) => {
            array.push(doc.data());
          });
          commit(UPDATE_ITEMS, array);
        } else {
          console.log("no documents");
          commit(UPDATE_ITEMS, []);
        }
        commit(CHANGE_STATUS, true);
      } catch (e) {
        console.log(e);
      }
    },

    async addItemToDatabase(_, newItem: DatabaseItem) {
      try {
        await setDoc(
          doc(db, "users", newItem.authorId, "images", newItem.id),
          newItem
        );
      } catch (e) {
        console.log(e);
      }
    },

    async deleteItemFromDatabase(_, item) {
      try {
        await deleteDoc(doc(db, "users", item.authorId, "images", item.id));
        //commit("deleteItem", id);
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
  },

  namespaced: true,
};
