import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./database/index";

createApp(App)
  .use(VueFire, { firebaseApp, modules: [VueFireAuth()] })
  .use(store)
  .use(router)
  .mount("#app");
