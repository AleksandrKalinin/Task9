<template>
  <MainHeader />
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
import { mapActions } from "vuex";

export default defineComponent({
  name: "HomeView",

  components: {
    CanvasComponent,
    CanvasMenu,
    MainHeader,
  },

  data() {
    return {
      isShowed: false as boolean,
    };
  },

  methods: {
    ...mapActions(["showErrorToast"]),
  },
});
</script>
