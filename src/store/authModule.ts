import router from "@/router";
import { ActionContext, MutationTree, GetterTree, Module } from "vuex";
import { RootState, UsersState, User } from "@/types/types";
import { auth } from "@/database/index";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "@/database/index";
import store from "@/store";
import { authErrorHandler } from "../helpers/authErrorHandler";

export const authModule: Module<UsersState, RootState> = {
  state: () => ({
    usersArray: [] as Array<User>,
  }),

  getters: <GetterTree<UsersState, RootState>>{
    usersArray: (state: UsersState) => {
      return state.usersArray;
    },
  },

  mutations: <MutationTree<UsersState>>{
    saveUser(state: UsersState, value: User): void {
      state.usersArray.push(value);
    },
  },

  actions: {
    async saveUser(
      { commit }: ActionContext<UsersState, unknown>,
      { id, email }: { id: string; email: string }
    ) {
      const user: User = { id, email };
      try {
        await setDoc(doc(db, "users", user.id), user)
          .then(() => commit("saveUser", user))
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    },

    registerUser(
      _: ActionContext<UsersState, unknown>,
      { email, password }: { email: string; password: string }
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const id = data.user.uid;
          store.dispatch(
            "showSuccessToast",
            "You are registered succesfully!",
            {
              root: true,
            }
          );
          store.dispatch("auth/saveUser", { id, email }, { root: true });
          router.push("/");
        })
        .catch((error) => {
          const { toast, message } = authErrorHandler(error.code);
          store.dispatch(toast, message, {
            root: true,
          });
        });
    },

    signInUser(
      _: ActionContext<UsersState, unknown>,
      { email, password }: { email: string; password: string }
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          store.dispatch("showSuccessToast", "You are logged in!", {
            root: true,
          });
          router.push("/");
        })
        .catch((error) => {
          const { toast, message } = authErrorHandler(error.code);
          store.dispatch(toast, message, {
            root: true,
          });
        });
    },

    logoutUser() {
      signOut(auth)
        .then(() => {
          router.push("/signin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  namespaced: true,
};
