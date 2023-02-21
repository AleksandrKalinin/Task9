import router from "@/router";
import { UsersState, User } from "@/types/types";
import { auth } from "@/database/index";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db } from "@/database/index";
import store from "@/store";

export const authModule = {
  state: () => ({
    usersArray: [] as Array<any>,
  }),

  getters: {
    usersArray: (state: UsersState) => {
      return state.usersArray;
    },
  },

  mutations: {
    saveUser(state: UsersState, value: any): void {
      state.usersArray.push(value);
    },
  },

  actions: {
    async saveUser(
      { commit }: any,
      { id, email }: { id: string; email: string }
    ) {
      const user: User = { id, email };
      commit("saveUser", user);
      try {
        await setDoc(doc(db, "users", user.id), user);
      } catch (e) {
        console.log(e);
      }
    },

    registerUser(
      _: any,
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
      _: any,
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
          console.log("User log out!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  namespaced: true,
};
