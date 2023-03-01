<template>
  <div class="gallery">
    <div class="gallery-wrapper">
      <template v-if="!areItemsLoaded && items.length === 0">
        <div class="gallery-preloader">
          <img src="@/assets/preloader.gif" />
        </div>
      </template>
      <template v-if="areItemsLoaded && items.length === 0">
        <div class="gallery-preloader">
          <span class="gallery-placeholder"
            >You have no images for display yet</span
          >
        </div>
      </template>
      <template v-if="items.length > 0">
        <div
          class="gallery__item gallery-item"
          v-for="(item, index) in items"
          :key="item.id"
        >
          <div class="gallery-item__preview gallery-preview">
            <img class="gallery-preview__image" :src="item.link" />
          </div>
          <div class="gallery-item__description">
            <p class="gallery-item__date">
              Published:
              {{ formattedDates[index] }}
            </p>
          </div>
          <div class="gallery-item__footer">
            <Button
              class="button button_regular button_normal"
              @click="selectCanvas(item.id)"
              :style="{ backgroundColor: themeSelected }"
              >Edit item</Button
            >
            <Button
              class="button button_regular button_normal"
              @click="deleteItemFromDatabase(item)"
              :style="{ backgroundColor: themeSelected }"
              >Delete item</Button
            >
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { SingleItem } from "@/types/types";
import { auth } from "@/database/index";
import { onAuthStateChanged } from "firebase/auth";
import router from "@/router";
import Button from "@/components/Button.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "MainHeader",
  components: {
    Button,
  },
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const themeSelected = computed(() => store.getters["theme/themeSelected"]);
    const items = computed(() => store.getters["items/items"]);
    const areItemsLoaded = computed(
      () => store.getters["items/areItemsLoaded"]
    );
    const canvas = computed(() => store.getters["canvas/canvas"]);
    const formattedDates = computed(() => {
      return items.value.map((item: SingleItem) => {
        const date = new Date(item.date.seconds * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const newDate: string =
          ("0" + day.toString()).slice(-2) +
          "." +
          ("0" + month.toString()).slice(-2) +
          "." +
          year.toString();
        return newDate;
      });
    });
    function selectCanvas(id: string): void {
      const index: number = items.value
        .map((item: SingleItem) => item.id)
        .indexOf(id);
      const curItem: SingleItem = items.value[index];
      store.dispatch("canvas/saveSelectedItem", curItem.link);
    }
    function fetchItems() {
      store.dispatch("items/fetchItems");
    }
    function deleteItemFromDatabase(item: SingleItem) {
      store.dispatch("items/deleteItemFromDatabase", item);
    }
    function showErrorToast(message: string) {
      store.dispatch("showErrorToast", message);
    }
    onMounted(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchItems();
        } else {
          showErrorToast("You are not authorized to see access this page!");
          unsubscribe();
          router.push("/signin");
        }
      });
    });
    return {
      themeSelected,
      items,
      areItemsLoaded,
      canvas,
      formattedDates,
      selectCanvas,
      fetchItems,
      deleteItemFromDatabase,
      showErrorToast,
    };
  },
  computed: {},
  methods: {},
  watch: {},
});
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/styles/colorScheme.sass"
.gallery-preloader
  font-size: 20px
.gallery-preloader
  width: calc(100vw - 120px - 350px)
  display: flex
  justify-content: center
  align-items: center
.newCanvas
  border: 1px solid red
.gallery
  padding: 0 30px
  width: calc(100% - 350px)
  display: flex
  .gallery-wrapper
    margin: 0 auto
    display: flex
    flex-wrap: wrap
  .gallery-item
    width: 600px
    margin: 0 20px 40px
    border: 1px solid #CCCCCC
    overflow: hidden
    .gallery-item__preview
      width: 600px
      height: 400px
      overflow: hidden
      cursor: pointer
      .gallery-preview__image
        width: 100%
        height: 100%
        object-fit: cover
        transition: .2s all
    .gallery-item__preview:hover
      .gallery-preview__image
        transform: scale(1.02)
    .gallery-item__footer
      padding: 20px
      display: flex
      justify-content: flex-end
      button
        margin: 0 5px
    .gallery-item__description
      display: flex
      justify-content: space-between
      padding: 0 20px
      font-size: 18px
      .gallery-item__author
        font-weight: 600
        color: $main-color
        margin-bottom: 6px
      .gallery-item__email
        color: $main-color
      .gallery-item__date
        color: #CCCCCC
        display: flex
        width: 100%
        justify-content: flex-end
        align-items: center
      .gallery-item__icon
        display: block
        width: 18px
        height: 18px
        margin-right: 3px
        img
          height: 100%
          width: auto
          object-fit: cover
</style>
