<template>
  <aside class="sidebar">
    <input
      type="text"
      class="sidebar-input"
      placeholder="Search for users"
      v-model="currentInput"
    />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "SidebarComponent",

  data() {
    return {
      currentInput: "" as string,
    };
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

.sidebar-input
  padding: 10px
  font-size: 16px
</style>
