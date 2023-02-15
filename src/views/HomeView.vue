<template>
  <MainHeader :username="username" />
  <div class="main-container">
    <div class="canvas-wrapper">
      <CanvasMenu />
      <div class="canvas-inner">
        <CanvasComponent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CanvasComponent from "@/components/CanvasComponent.vue";
import MainHeader from "@/components/MainHeader.vue";
import CanvasMenu from "@/components/CanvasMenu.vue";
import { auth } from "@/database/index";
import { onAuthStateChanged } from "firebase/auth";
import router from "@/router";

export default defineComponent({
  name: "HomeView",
  components: {
    CanvasComponent,
    CanvasMenu,
    MainHeader,
  },

  data() {
    return {
      username: null as any,
    };
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("not authorised");
        //alert("You are not authorised to see this page");
        // router.push("/signin");
      } else {
        this.username = user.email;
      }
    });
  },
});
</script>
