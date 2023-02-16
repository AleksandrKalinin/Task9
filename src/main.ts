import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
//import { VueFire, VueFireFirestoreOptionsAPI } from "vuefire";
//import { firebaseApp } from "./database/index";

createApp(App).use(store).use(router).use(Toast).mount("#app");
