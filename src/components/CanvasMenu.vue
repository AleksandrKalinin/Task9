<template>
  <div class="canvas-menu"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CanvasMenu",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.canvas-menu
  width: 300px
  height: 500px
  border: 1px solid #CCCCCC
  margin-right: 30px
</style>
