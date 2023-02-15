<template>
  <div class="gallery">
    <template v-if="formattedData.length > 0">
      <div
        class="gallery__item gallery-item"
        v-for="item in formattedData"
        :key="item.id"
        @click="selectCanvas(item.id)"
      >
        <div class="gallery-item__preview gallery-preview">
          <img class="gallery-preview__image" :src="item.link" />
        </div>
        <div class="gallery-item__description">
          <p class="gallery-item__author">by: {{ item.author }}</p>
          <p class="gallery-item__date">Published: {{ item.date }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { DatabaseItem, LocalItem } from "../components/types/types";

export default defineComponent({
  name: "MainHeader",

  data() {
    return {
      formattedData: [] as Array<LocalItem>,
    };
  },

  computed: {
    ...mapGetters("database", ["items", "areItemsLoaded", "filteredItems"]),

    ...mapGetters("canvas", ["canvas"]),

    computedItems(): Array<DatabaseItem> {
      return this.filteredItems;
    },
  },

  methods: {
    ...mapActions("database", ["pushIntoDatabase", "fetchItems"]),
    ...mapActions("canvas", ["saveCanvas", "saveSelectedItem"]),

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
        dataItem.date = `${day}/${month}/${year}`;
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
      this.formatData(this.filteredItems);
    },

    computedItems(newVal) {
      this.formatData(newVal);
    },
  },

  mounted() {
    this.fetchItems();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/styles/colorScheme.sass"
.newCanvas
  border: 1px solid red
.gallery
  display: flex
  flex-wrap: wrap
  padding: 0 30px
  .gallery-item
    width: 450px
    max-height: 362px
    margin: 0 10px 20px
    border: 1px solid #CCCCCC
    .gallery-item__preview
      width: 450px
      height: 300px
      overflow: hidden
      cursor: pointer
      .gallery-preview__image
        width: 100%
        height: 100%
        object-fit: cover
        transition: .2s all
    .gallery-item__preview:hover
      .gallery-preview__image
        transform: scale(1.05)
    .gallery-item__description
      display: flex
      justify-content: space-between
      padding: 20px
</style>
