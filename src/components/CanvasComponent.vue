<template>
  <canvas
    @mousemove="draw"
    @mousedown="checkIfShapeSelected"
    @mouseup="checkIfShapeActive"
    ref="myCanvas"
    class="canvas"
    id="myCanvas"
  ></canvas>
  <canvas ref="overlayCanvas" class="canvas" id="overlayCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import {
  CIRCLE,
  ELLIPSE,
  TRIANGLE,
  RECTANGLE,
  HEXAGON,
  OCTAGON,
  STAR,
  DIAMOND,
} from "@/constants/shapes";
import { setupCTX } from "@/helpers/setupCTX";
import { setupOverlayCTX } from "@/helpers/setupOverlayCTX";
import { drawTriangle } from "@/helpers/drawTriangle";
import { drawRectangle } from "@/helpers/drawRectangle";
import { drawCircle } from "@/helpers/drawCircle";
import { drawEllipse } from "@/helpers/drawEllipse";
import { drawHexagon } from "@/helpers/drawHexagon";
import { drawOctagon } from "@/helpers/drawOctagon";
import { drawStar } from "@/helpers/drawStar";
import { drawDiamond } from "@/helpers/drawDiamond";

export default defineComponent({
  name: "CanvasComponent",
  data() {
    return {
      canvas: document.createElement("canvas") as HTMLCanvasElement,
      overlayCanvas: document.createElement("canvas") as HTMLCanvasElement,
      x: 0 as number,
      y: 0 as number,
      isDrawing: false as boolean,
      startX: 0 as number,
      startY: 0 as number,
      endX: 0 as number,
      endY: 0 as number,
      saved: [] as string[],
      itemRefs: [] as string[],
    };
  },

  computed: {
    ...mapGetters("canvas", [
      "selectedColor",
      "selectedShape",
      "lineWidth",
      "fillStyle",
      "selectedItem",
    ]),

    canvasState(): "string" {
      return this.selectedItem;
    },
  },

  watch: {
    canvasState(newVal) {
      this.initializeCanvas(newVal);
      this.initializeOverlayCanvas(newVal);
    },
  },

  methods: {
    ...mapActions("canvas", ["saveCanvas"]),

    /** Initializing main canvas state. Main canvas serves as primary canvas for drawing. After user stops drawing canvas state will be saved in to overlay canvas and cleared.*/
    initializeCanvas(canvasLink: string) {
      const myCanvas: HTMLCanvasElement = this.$refs
        .myCanvas as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D = myCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      if (canvasLink !== "") {
        const image: HTMLImageElement = new Image();
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
        };
        image.src = canvasLink;
      } else if (canvasLink === "") {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      }
      this.canvas = myCanvas;
    },
    /** Initializing overlay canvas with the same values as the main canvas. Main canvas state will be saved in to overlay canvas after user stops drawing line or shape*/
    initializeOverlayCanvas(canvasLink: string) {
      const overlayCanvas: HTMLCanvasElement = this.$refs
        .overlayCanvas as HTMLCanvasElement;
      const ctxo: CanvasRenderingContext2D = overlayCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      if (canvasLink !== "") {
        const image: HTMLImageElement = new Image();
        image.onload = function () {
          ctxo.drawImage(image, 0, 0);
        };
        image.src = canvasLink;
      } else if (canvasLink === "") {
        ctxo.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      }
      this.overlayCanvas = overlayCanvas;
    },

    /** Setting proportions of main and overlay canvases*/
    setProportions() {
      const ctx: CanvasRenderingContext2D = this.canvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      const ctxo: CanvasRenderingContext2D = this.overlayCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      const width = document.body.clientWidth - 465 - 90;
      const height = (width / 3) * 2;
      ctx.canvas.width = width;
      ctx.canvas.height = height;
      ctxo.canvas.width = width;
      ctxo.canvas.height = height;
    },

    draw(e: MouseEvent) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      } else {
        if (e.buttons == 1) {
          this.getEndCoords(e);
        }
      }
    },

    /** Start drawing if pen is selected */
    startDrawing(e: MouseEvent) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },

    /** Stop drawing if pen is selected */
    stopDrawing(e: MouseEvent) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },

    /** Draw on canvas and save state to overlay */
    drawOnCanvas(x1: number, y1: number, x2: number, y2: number) {
      const { canvas, ctx } = setupCTX(
        this.canvas,
        this.selectedColor,
        this.lineWidth
      );
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.selectedColor;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        this.saveCanvas(canvas);
      }
      const { overlayCanvas, ctxo } = setupOverlayCTX(
        this.overlayCanvas,
        this.selectedColor,
        this.lineWidth
      );
      if (ctxo) {
        ctxo.drawImage(canvas, 0, 0);
      }
      this.saveCanvas(overlayCanvas);
    },

    /** Starting coordinates of a shape */
    getStartCoords(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const cX: number = target.getBoundingClientRect().left + window.scrollX;
      const cY: number = target.getBoundingClientRect().top + window.scrollY;
      this.startX = e.pageX - cX;
      this.startY = e.pageY - cY;
    },

    /** Final coordinates of a shape */
    getEndCoords(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const cX: number = target.getBoundingClientRect().left + window.scrollX;
      const cY: number = target.getBoundingClientRect().top + window.scrollY;
      this.endX = e.pageX - cX;
      this.endY = e.pageY - cY;
      if (this.startX !== this.endX) {
        if (this.startY > this.endY) {
          let tempX: number = this.startX;
          let tempY: number = this.startY;
          this.startX = this.endX;
          this.startY = this.endY;
          this.endX = tempX;
          this.endY = tempY;
        }
        this.drawShape(e);
      }
    },

    /** If shape is selected get it's start coords, else start drawing a line */
    checkIfShapeSelected(e: MouseEvent) {
      if (this.selectedShape === "") {
        this.startDrawing(e);
      } else {
        this.getStartCoords(e);
      }
    },

    /** If shape is selected get it's end coords, else end drawing a line */
    checkIfShapeActive(e: MouseEvent) {
      if (this.selectedShape === "") {
        this.stopDrawing(e);
      } else {
        this.getEndCoords(e);
      }
    },

    /** Draw a shape depending on selected shape and save state in to overlay */
    drawShape(e: MouseEvent) {
      const { canvas, ctx } = setupCTX(
        this.canvas,
        this.selectedColor,
        this.lineWidth
      );
      const { overlayCanvas, ctxo } = setupOverlayCTX(
        this.overlayCanvas,
        this.selectedColor,
        this.lineWidth
      );
      const coords = {
        startX: this.startX,
        startY: this.startY,
        endX: this.endX,
        endY: this.endY,
      };
      let isFilled = this.fillStyle === "outline" ? false : true;
      const shapeArgs = { canvas, ctx, ...coords, isFilled };
      let result: HTMLCanvasElement | null = null;
      if (this.selectedShape === TRIANGLE) {
        result = drawTriangle(shapeArgs);
      } else if (this.selectedShape === CIRCLE) {
        result = drawCircle(shapeArgs);
      } else if (this.selectedShape === RECTANGLE) {
        result = drawRectangle(shapeArgs);
      } else if (this.selectedShape === ELLIPSE) {
        result = drawEllipse(shapeArgs);
      } else if (this.selectedShape === OCTAGON) {
        result = drawOctagon(shapeArgs);
      } else if (this.selectedShape === HEXAGON) {
        result = drawHexagon(shapeArgs);
      } else if (this.selectedShape === STAR) {
        result = drawStar(shapeArgs);
      } else if (this.selectedShape === DIAMOND) {
        result = drawDiamond(shapeArgs);
      }
      if (e.buttons !== 1) {
        if (result && ctxo) {
          ctxo.drawImage(result, 0, 0);
        }
        this.saveCanvas(overlayCanvas);
      }
    },
  },

  mounted() {
    this.initializeCanvas(this.selectedItem);
    this.initializeOverlayCanvas(this.selectedItem);
    this.setProportions();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.canvas
  border: 1px solid #CCCCCC
  position: absolute
  top: 0
  left: 0

#overlayCanvas
  z-index: 1

#myCanvas
  z-index: 2
</style>
