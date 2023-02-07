<template>
  <header class="header"></header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainHeader",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.header
  width: 100%
  height: 80px
  background: tomato
</style>
