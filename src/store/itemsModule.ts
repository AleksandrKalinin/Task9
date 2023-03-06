import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import {
  RootState,
  ItemsState,
  SingleItem,
  GalleryItem,
  ItemsModuleMutations,
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
import store from "@/store";

export const itemsModule: Module<ItemsState, RootState> = {
  state: () => ({
    items: [] as Array<SingleItem>,
    areItemsLoaded: false as boolean,
    searchQuery: "" as string,
  }),

  getters: <GetterTree<ItemsState, RootState>>{
    items: (state: ItemsState) => {
      return [...state.items];
    },

    areItemsLoaded: (state: ItemsState) => {
      return state.areItemsLoaded;
    },
  },

  mutations: <MutationTree<ItemsState>>{
    [ItemsModuleMutations.UPDATE_ITEMS](
      state: ItemsState,
      value: Array<SingleItem>
    ): void {
      state.items = value;
    },

    [ItemsModuleMutations.CHANGE_STATUS](state: ItemsState): void {
      state.areItemsLoaded = true;
    },

    [ItemsModuleMutations.DELETE_ITEM](state: ItemsState, id: string): void {
      const index = state.items.map((item: SingleItem) => item.id).indexOf(id);
      state.items.splice(index, 1);
    },
  },

  actions: {
    async fetchItems({ commit }: ActionContext<ItemsState, unknown>) {
      const array: Array<SingleItem> = [];
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
              array.push(doc.data() as SingleItem);
            });
            commit(ItemsModuleMutations.UPDATE_ITEMS, array);
          } else {
            commit(ItemsModuleMutations.UPDATE_ITEMS, []);
          }
          commit(ItemsModuleMutations.CHANGE_STATUS, true);
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
        commit(ItemsModuleMutations.DELETE_ITEM, item.id);
      } catch (e) {
        console.log(e);
      }
    },
  },

  namespaced: true,
};
