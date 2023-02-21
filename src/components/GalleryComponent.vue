<template>
  <div class="gallery">
    <template v-if="!areItemsLoaded && formattedData.length === 0">
      <div class="gallery-preloader">
        <img src="@/assets/preloader.gif" />
      </div>
    </template>
    <template v-if="areItemsLoaded && formattedData.length === 0">
      <div class="gallery-preloader">
        <span class="gallery-placeholder"
          >You have no images for display yet</span
        >
      </div>
    </template>
    <template v-if="formattedData.length > 0">
      <div
        class="gallery__item gallery-item"
        v-for="item in formattedData"
        :key="item.id"
        @click="selectCanvas(item.id)"
        title="Click to copy to canvas"
      >
        <div class="gallery-item__preview gallery-preview">
          <img class="gallery-preview__image" :src="item.link" />
        </div>
        <div class="gallery-item__description">
          <p>Published:</p>
          <p class="gallery-item__date">
            <span class="gallery-item__icon">
              <img src="@/assets/clock-regular.svg" />
            </span>
            {{ item.date }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { DatabaseItem, LocalItem } from "../components/types/types";
import { auth } from "@/database/index";
import { onAuthStateChanged } from "firebase/auth";
import router from "@/router";

export default defineComponent({
  name: "MainHeader",

  data() {
    return {
      formattedData: [] as Array<LocalItem>,
      isShowed: false as boolean,
    };
  },

  computed: {
    ...mapGetters("database", ["items", "areItemsLoaded"]),

    ...mapGetters("canvas", ["canvas"]),

    computedItems(): Array<DatabaseItem> {
      return this.items;
    },
  },

  methods: {
    ...mapActions("database", ["pushIntoDatabase", "fetchItems"]),
    ...mapActions("canvas", ["saveCanvas", "saveSelectedItem"]),
    ...mapActions(["showErrorToast"]),

    formatData(values: Array<DatabaseItem>) {
      const data: Array<LocalItem> = [];
      for (let i = 0; i < values.length; i++) {
        const dataItem: LocalItem = { id: "", author: "", link: "", date: "" };
        const el = values[i];
        const date = new Date(el.date.seconds * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        dataItem.id = el.id;
        dataItem.author = el.author;
        dataItem.link = el.link;
        dataItem.date = `${day}.${month}.${year}`;
        dataItem.date =
          ("0" + day.toString()).slice(-2) +
          "." +
          ("0" + month.toString()).slice(-2) +
          "." +
          year.toString();
        data.push(dataItem);
      }
      this.formattedData = data;
    },

    selectCanvas(id: string) {
      const index: number = this.computedItems
        .map((item: DatabaseItem) => item.id)
        .indexOf(id);
      const curItem = this.computedItems[index];
      this.saveSelectedItem(curItem.link);
    },
  },

  watch: {
    areItemsLoaded: function () {
      this.formatData(this.items);
    },

    computedItems(newVal) {
      this.formatData(newVal);
    },
  },

  mounted() {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.fetchItems();
      } else {
        this.showErrorToast("You are not authorized to see access this page!");
        unsubscribe();
        router.push("/signin");
      }
    });
  },
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
  display: flex
  flex-wrap: wrap
  padding: 0 30px
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
    .gallery-item__description
      display: flex
      justify-content: space-between
      padding: 20px
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
