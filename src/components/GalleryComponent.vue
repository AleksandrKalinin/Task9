<template>
  <div class="gallery">
    <template v-if="formattedData.length > 0">
      <div
        class="gallery__item gallery-item"
        v-for="(item, index) in formattedData"
        :key="index"
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

interface GalleryItem {
  author: string;
  date: string;
  link: string;
}

export default defineComponent({
  name: "MainHeader",

  data() {
    return {
      formattedData: [],
    };
  },

  computed: {
    ...mapGetters("database", ["items", "areItemsLoaded", "filteredItems"]),

    computedItems(): Array<any> {
      return this.filteredItems as any;
    },
  },

  methods: {
    ...mapActions("database", ["pushIntoDatabase", "fetchItems"]),

    formatData(values: Array<any>) {
      const data: Array<GalleryItem> | any = [];
      for (let i = 0; i < values.length; i++) {
        const dataItem: any = {};
        const el = values[i];
        const date = new Date(el.date.seconds * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        dataItem.author = el.author;
        dataItem.link = el.link;
        dataItem.date = `${day}/${month}/${year}`;
        data.push(dataItem);
      }
      this.formattedData = data;
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
