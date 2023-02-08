<template>
  <div class="canvas-menu">
    <div class="canvas-menu__section">
      <h6 class="canvas-menu__category">Instruments</h6>
      <div class="canvas-menu__wrapper">
        <div class="canvas-menu__item">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/paintbrush-solid.svg')"
          />
        </div>
      </div>
      <h6 class="canvas-menu__category">Colors</h6>
      <div class="canvas-menu__wrapper">
        <div
          class="canvas-menu__item"
          v-bind:key="index"
          @click="setColor(item)"
          v-for="(item, index) in colors"
          :style="{ 'background-color': item }"
        ></div>
      </div>
      <h6 class="canvas-menu__category">Shapes</h6>
      <div class="canvas-menu__wrapper">
        <div class="canvas-menu__item" @click="setShape('triangle')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/triangle-solid.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('circle')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/circle-regular.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('ellipse')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/ellipse.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('rectangle')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/rectangle.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('square')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/square-regular.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('star')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/star.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('octagon')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/octagon.svg')"
          />
        </div>
        <div class="canvas-menu__item" @click="setShape('hexagon')">
          <img
            class="canvas-menu__icon"
            v-bind:src="require('@/assets/hexagon.svg')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "CanvasMenu",

  data() {
    return {
      colors: [
        "#000000",
        "#FFFFFF",
        "#037949",
        "#318CE7",
        "#993300",
        "#CC338B",
        "#BFFF00",
        "#D40000",
        "#000000",
        "#FFFFFF",
        "#037949",
        "#318CE7",
        "#993300",
        "#CC338B",
        "#BFFF00",
        "#D40000",
      ],
    };
  },

  methods: {
    ...mapActions("canvas", ["setColor", "setShape", "setLineWidth"]),
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.canvas-menu
  width: 445px
  height: 500px
  border: 1px solid #CCCCCC
  margin-right: 30px

  .canvas-menu__category
    font-size: 18px
    text-transform: uppercase
    letter-spacing: 1px
    padding: 10px 5px
  .canvas-menu__wrapper
    display: flex
    justify-content: space-around
    flex-wrap: wrap
  .canvas-menu__item
    width: 50px
    height: 50px
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 5px
    overflow: hidden
    border: 1px solid #333333

  .canvas-menu__icon
    width: 30px
    height: 30px
    object-fit: cover
    -webkit-filter: invert(100%)
    filter: invert(100%)
</style>
