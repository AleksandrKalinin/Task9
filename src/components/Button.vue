<template>
  <button class="" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "ButtonComponent",

  data() {
    return {};
  },

  props: {
    onClick: Function as PropType<() => void>,
  },

  methods: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass"></style>
