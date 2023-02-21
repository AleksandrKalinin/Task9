<template>
  <aside class="sidebar">
    <div class="theme-selection">
      <span class="theme-selection__text">Select color:</span>
      <select
        class="theme-selection__dropdown theme-dropdown"
        @change="onChange($event)"
        :style="{ backgroundColor: themeSelected }"
      >
        <option
          class="theme-selection__option"
          v-for="(theme, index) in themeArray"
          :key="index"
          :style="{ backgroundColor: theme }"
          :selected="isSelected[index]"
        >
          {{ theme }}
        </option>
      </select>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "SidebarComponent",

  data() {
    return {};
  },

  computed: {
    ...mapGetters("database", ["items" , "areItemsLoaded" , "searchQuery"]),

    ...mapGetters("theme", ["themeArray", "themeSelected"]),

    isSelected(): boolean {
      return this.themeArray.map((item: string) => item === this.themeSelected);
    },

    currentInput: {
      get(): string {
        return this.searchQuery;
      },
      set(value: string) {
        this.updateSearchQuery(value);
      },
    },
  },

  methods: {
    ...mapActions("database", ["updateSearchQuery"]),

    ...mapActions("theme", ["setTheme"]),

    onChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.setTheme(target.value);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/styles/colorScheme.sass"

.sidebar
  min-width: 350px
  height: 362px
  padding: 30px
  display: flex
  flex-direction: column
  border: 1px solid #cccccc

.theme-selection
  margin-left: 10px
.theme-selection__text
  font-size: 18px
  margin-right: 12px
.theme-selection__dropdown
  padding: 12px 20px
  cursor: pointer
  font-size: 17px
  border-radius: 0
  outline: none
  cursor: pointer
  border: 1px solid #ffffff
  color: #ffffff
  .theme-selection__option
    padding: 15px
    cursor: pointer
</style>
