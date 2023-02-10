<template>
  <div class="main-container">
    <SidebarComponent />
    <GalleryComponent />
  </div>
</template>

<script>
import GalleryComponent from "@/components/GalleryComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";

export default {
  name: "GalleryView",
  components: {
    GalleryComponent,
    SidebarComponent,
  },
};
</script>
