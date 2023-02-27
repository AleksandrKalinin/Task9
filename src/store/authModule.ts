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
        await setDoc(doc(db, "users", user.id), user);
        commit("saveUser", user);
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
          switch (error.code) {
            case "auth/email-already-in-use":
              store.dispatch("showErrorToast", "Email already in use!", {
                root: true,
              });
              break;
            default:
              store.dispatch("showErrorToast", "Incorrect email or password!", {
                root: true,
              });
              break;
          }
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
          switch (error.code) {
            case "auth/invalid-email":
              store.dispatch("showErrorToast", "Invalid Email!", {
                root: true,
              });
              break;
            case "auth/user-not-found":
              store.dispatch(
                "showErrorToast",
                "No user with such email was found!",
                {
                  root: true,
                }
              );
              break;
            case "auth/wrong-password":
              store.dispatch("showErrorToast", "Incorrect password!", {
                root: true,
              });
              break;
            default:
              store.dispatch("showErrorToast", "Incorrect email or password!", {
                root: true,
              });
              break;
          }
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
