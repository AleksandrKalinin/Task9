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

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
//const items = computed(() => store.getters["items/items"]);
//const areItemsLoaded = computed(() => store.getters["items/areItemsLoaded"]);
const searchQuery = computed(() => store.getters["items/searchQuery"]);
const themeArray = computed(() => store.getters["theme/themeArray"]);
const themeSelected = computed(() => store.getters["theme/themeSelected"]);
const isSelected = computed(() => {
  return themeArray.value.map((item: string) => item === themeSelected.value);
});
const currentInput = computed({
  get(): string {
    return searchQuery.value;
  },
  set(value: string) {
    store.dispatch("items/updateSearchQuery", value);
  },
});

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  store.dispatch("theme/setTheme", target.value);
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/assets/styles/colorScheme.sass"

.sidebar
  width: 350px
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
