import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from "@/database/index";
import { onAuthStateChanged, User } from "firebase/auth";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/SignInView.vue"),
  },
  {
    path: "/recent",
    name: "recent",
    component: () => import("../views/GalleryView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

async function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      next({ name: "signin" });
      store.dispatch(
        "showErrorToast",
        "You are not authorized to see access this page!",
        {
          root: true,
        }
      );
    }
  } else {
    next();
  }
});

export default router;
