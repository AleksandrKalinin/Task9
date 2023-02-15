<template>
  <div class="canvas-menu">
    <div class="canvas-menu__section">
      <div class="canvas-menu__block">
        <h6 class="canvas-menu__category">Instruments</h6>
        <div class="canvas-menu__wrapper canvas-wrapper_regular">
          <div class="canvas-menu__item" title="Pen">
            <img
              class="canvas-menu__icon"
              v-bind:src="require('@/assets/paintbrush-solid.svg')"
            />
          </div>
        </div>
      </div>
      <div class="canvas-menu__block">
        <h6 class="canvas-menu__category">Line width</h6>
        <div class="canvas-menu__wrapper canvas-wrapper_spaced">
          <input
            v-model="width"
            min="1"
            max="10"
            type="range"
            id="lineWidth"
            name="lineWidth"
            class="canvas-menu__input"
          />
        </div>
      </div>
      <div class="canvas-menu__block">
        <h6 class="canvas-menu__category">Shapes</h6>
        <div class="canvas-menu__wrapper canvas-wrapper_spaced">
          <template v-if="shapes.length">
            <div
              v-for="(shape, index) in shapes"
              :key="index"
              class="canvas-menu__item canvas-option"
              @click="setShape(shape.link)"
              :title="shape.name"
            >
              <img
                class="canvas-menu__icon"
                :src="require(`@/assets/${shape.path}`)"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="canvas-menu__block">
        <h6 class="canvas-menu__category">Colors</h6>
        <div class="canvas-menu__wrapper canvas-wrapper_spaced">
          <div
            class="canvas-menu__item"
            v-bind:key="index"
            @click="setColor(item)"
            v-for="(item, index) in colors"
            :style="{ 'background-color': item }"
          ></div>
        </div>
      </div>
      <div class="canvas-menu__block">
        <div
          class="canvas-menu__wrapper canvas-wrapper_large canvas-wrapper_spaced"
        >
          <button
            class="button button_regular button_normal"
            @click="addItemToGallery"
          >
            Save picture
          </button>
          <button
            class="button button_regular button_normal"
            @click="clearCurrentCanvas"
          >
            Clear canvas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { Shape, GalleryItem } from "../components/types/types";
import { auth } from "@/database/index";
import { onAuthStateChanged } from "firebase/auth";

export default defineComponent({
  name: "CanvasMenu",
  data() {
    return {
      shapes: [] as Array<Shape>,
      colors: [
        "#000000",
        "#FFFFFF",
        "#037949",
        "#318CE7",
        "#993300",
        "#CC338B",
        "#BFFF00",
        "#D40000",
        "#F07427",
        "#D470A2",
        "#0F4D92",
        "#18880D",
        "#727472",
        "#D73B3E",
        "#CC397B",
        "#665D1E",
      ] as Array<string>,
    };
  },

  computed: {
    ...mapGetters("canvas", ["lineWidth", "canvas"]),

    width: {
      get() {
        return 1;
      },
      set(value: number) {
        this.setLineWidth(value);
      },
    },
  },

  methods: {
    ...mapActions("canvas", [
      "setColor",
      "setShape",
      "setLineWidth",
      "saveSelectedItem",
    ]),

    ...mapActions("database", ["addItemToDatabase"]),

    checkIfLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          return false;
        } else {
          return true;
        }
      });
    },

    /** Adding item to gallery of recent items */
    addItemToGallery() {
      if (auth.currentUser !== null) {
        const canvas: HTMLCanvasElement = this.canvas;
        const newItem: GalleryItem = {
          id: "",
          author: "",
          date: new Date(),
          link: "",
        };
        newItem.id = uuidv4();
        newItem.author = "George Nevill";
        newItem.date = new Date();
        newItem.link = canvas.toDataURL("image/png");
        this.addItemToDatabase(newItem);
      } else {
        console.log("Log in first!");
      }
    },

    /** Clearing canvas */
    clearCurrentCanvas() {
      const canvas: HTMLCanvasElement = this.canvas;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.saveSelectedItem("");
      }
    },
  },

  mounted() {
    fetch("./shapes.json")
      .then((response) => response.json())
      .then((data) => {
        this.shapes = data;
      });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.canvas-menu
  width: 465px
  height: 600px
  border: 1px solid #CCCCCC
  margin-right: 30px
  .canvas-menu__block
    margin: 0 10px 20px 10px

  .canvas-menu__category
    font-size: 18px
    text-transform: uppercase
    letter-spacing: 1px
    padding: 10px 5px
  .canvas-menu__wrapper
    display: flex
    flex-wrap: wrap
  .canvas-wrapper_regular
    justify-content: flex-start
  .canvas-wrapper_spaced
    justify-content: space-around
  .canvas-wrapper_centered
    justify-content: center
  .canvas-wrapper_large
    padding: 20px 0
    align-items: center

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

  .canvas-menu__item.canvas-option_active
    box-shadow: inset 0 0 3px #4169E1
    border: 1px solid #4169E1

  .canvas-menu__icon
    width: 30px
    height: 30px
    object-fit: cover
    -webkit-filter: invert(100%)
    filter: invert(100%)

  .canvas-menu__input
    width: 100%
</style>
