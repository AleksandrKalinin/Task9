<template>
  <MainHeader />
  <div class="main-container">
    <SidebarComponent />
    <GalleryComponent />
  </div>
</template>

<script>
import GalleryComponent from "@/components/GalleryComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  name: "GalleryView",
  components: {
    GalleryComponent,
    SidebarComponent,
    MainHeader,
  },
};
</script>
