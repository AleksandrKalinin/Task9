import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import { VueFire, VueFireFirestoreOptionsAPI } from "vuefire";
//import { firebaseApp } from "./database/index";

createApp(App).use(store).use(router).mount("#app");
