<template>
  <MainHeader />
  <div class="main-container">
    <div class="canvas-wrapper">
      <CanvasMenu />
      <CanvasComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CanvasComponent from "@/components/CanvasComponent.vue";
import MainHeader from "@/components/MainHeader.vue";
import CanvasMenu from "@/components/CanvasMenu.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    CanvasComponent,
    CanvasMenu,
    MainHeader,
  },
});
</script>
