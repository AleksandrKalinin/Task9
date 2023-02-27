import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
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
} from "firebase/firestore";
import { UPDATE_ITEMS, CHANGE_STATUS, DELETE_ITEM } from "@/constants/database";
import store from "@/store";

export const databaseModule: Module<DatabaseState, RootState> = {
  state: () => ({
    items: [] as Array<DatabaseItem>,
    areItemsLoaded: false as boolean,
    searchQuery: "" as string,
  }),

  getters: <GetterTree<DatabaseState, RootState>>{
    items: (state: DatabaseState) => {
      return [...state.items];
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

    [DELETE_ITEM](state: DatabaseState, id: string): void {
      const index = state.items
        .map((item: DatabaseItem) => item.id)
        .indexOf(id);
      state.items.splice(index, 1);
    },
  },

  actions: {
    async fetchItems({ commit }: ActionContext<DatabaseState, unknown>) {
      const array: Array<DatabaseItem> = [];
      try {
        if (auth.currentUser) {
          const itemsRef = collection(
            db,
            "users",
            auth.currentUser.uid,
            "images"
          );
          const queryToDB = query(itemsRef);
          const querySnapshot = await getDocs(queryToDB);
          if (querySnapshot.size > 0) {
            querySnapshot.forEach((doc) => {
              array.push(doc.data() as DatabaseItem);
            });
            commit(UPDATE_ITEMS, array);
          } else {
            commit(UPDATE_ITEMS, []);
          }
          commit(CHANGE_STATUS, true);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async addItemToDatabase(_, canvas: HTMLCanvasElement) {
      if (auth.currentUser !== null) {
        const newItem: GalleryItem = {} as GalleryItem;
        newItem.id = uuidv4();
        newItem.authorId = auth.currentUser.uid;
        newItem.author =
          auth.currentUser.email !== null ? auth.currentUser.email : "John Doe";
        newItem.date = new Date();
        newItem.link = canvas.toDataURL("image/png");
        try {
          await setDoc(
            doc(db, "users", newItem.authorId, "images", newItem.id),
            newItem
          );
          store.dispatch("showSuccessToast", "Saved to gallery!", {
            root: true,
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        store.dispatch(
          "showWarningToast",
          "You are not authorized! Please log in.",
          {
            root: true,
          }
        );
      }
    },

    async deleteItemFromDatabase({ commit }, item) {
      try {
        await deleteDoc(doc(db, "users", item.authorId, "images", item.id));
        commit(DELETE_ITEM, item.id);
      } catch (e) {
        console.log(e);
      }
    },
  },

  namespaced: true,
};
