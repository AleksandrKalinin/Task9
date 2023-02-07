<template>
  <canvas
    @mousemove="draw"
    @mousedown="checkIfShapeSelected"
    @mouseup="checkIfShapeActive"
    ref="myCanvas"
    class="canvas"
    id="myCanvas"
    width="1000"
    height="500"
  ></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CanvasComponent",

  data() {
    return {
      canvas: null as any,
      x: 0 as number,
      y: 0 as number,
      isDrawing: false as boolean,
      lineWidth: 1 as number,
      color: "000000" as string,
      selectedShape: null as string | null,
      startX: 0 as number,
      startY: 0 as number,
      endX: 0 as number,
      endY: 0 as number,
      saved: [] as string[],
      itemRefs: [] as string[],
    };
  },

  methods: {
    draw(e: any) {
      console.log(e);
    },

    checkIfShapeSelected(e: any) {
      console.log(e);
    },

    checkIfShapeActive(e: any) {
      console.log(e);
    },

    initializeCanvas() {
      const myCanvas: any = this.$refs.myCanvas;
      this.canvas = myCanvas;
    },

    clearCanvas() {
      const canvas: HTMLCanvasElement | any = this.canvas;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas = canvas;
    },

    saveCanvas() {
      const canvas: HTMLCanvasElement = this.canvas;
      const imgPath: any = canvas.toDataURL("image/png");
      this.saved.push(imgPath);
    },
  },

  mounted() {
    this.initializeCanvas();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.canvas
  border: 1px solid #CCCCCC
</style>
