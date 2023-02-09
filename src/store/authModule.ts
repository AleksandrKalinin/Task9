export const authModule = {
  state: () => ({}),

  getters: {},

  mutations: {},

  actions: {
    registerUser() {
      console.log("register");
    },

    signInUser() {
      console.log("siginin");
    },

    logoutUser() {
      console.log("logout");
    },
  },

  namespaced: true,
};
