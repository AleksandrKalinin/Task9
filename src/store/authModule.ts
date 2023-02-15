import router from "@/router";
import { auth } from "@/database/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authModule = {
  state: () => ({}),

  getters: {},

  mutations: {},

  actions: {
    registerUser(
      _: any,
      { email, password }: { email: string; password: string }
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const user = data.user;
          console.log(user);
          router.push("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              //this.errorMessage = "Email already in use";
              console.log("Email already in use");
              break;
            default:
              //this.errorMessage = "Email or password was incorrect";
              console.log("Email or password was incorrect");
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
          router.push("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              //this.errorMessage = "Invalid email";
              console.log("Invalid Email");
              break;
            case "auth/user-not-found":
              //this.errorMessage = "No account with that email was found";
              console.log("No account with that email was found");
              break;
            case "auth/wrong-password":
              //this.errorMessage = "Incorrect password";
              console.log("Incorrect password");
              break;
            default:
              //this.errorMessage = "Email or password was incorrect";
              console.log("Email or password was incorrect");
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
