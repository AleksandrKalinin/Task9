<template>
  <canvas
    @mousemove="draw"
    @mousedown="checkIfShapeSelected"
    @mouseup="checkIfShapeActive"
    ref="myCanvas"
    class="canvas"
    id="myCanvas"
    width="900"
    height="600"
  ></canvas>
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

export default defineComponent({
  name: "CanvasComponent",
  data() {
    return {
      canvas: document.createElement("canvas") as HTMLCanvasElement,
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
      "selectedItem",
    ]),

    canvasState(): "string" {
      return this.selectedItem;
    },
  },

  watch: {
    canvasState(newVal) {
      this.initializeCanvas(newVal);
    },
  },

  methods: {
    ...mapActions("canvas", ["saveCanvas"]),

    /** Initializing canvas state */
    initializeCanvas(canvasLink: string) {
      const myCanvas: HTMLCanvasElement = this.$refs
        .myCanvas as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D | null = myCanvas.getContext("2d");
      if (canvasLink !== "" && ctx) {
        const image: HTMLImageElement = new Image();
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
        };
        image.src = canvasLink;
      } else if (canvasLink === "" && ctx) {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      }
      this.canvas = myCanvas;
    },

    /** Method for setting up canvas with parameters fillStyle, strokeStyle, lineWidth */
    setupCTX() {
      const canvas: HTMLCanvasElement = this.canvas;
      const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = this.selectedColor;
        ctx.strokeStyle = this.selectedColor;
        ctx.lineWidth = this.lineWidth;
      }
      return { canvas, ctx };
    },

    draw(e: MouseEvent) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },

    startDrawing(e: MouseEvent) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },

    stopDrawing(e: MouseEvent) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },

    drawOnCanvas(x1: number, y1: number, x2: number, y2: number) {
      const { canvas, ctx } = this.setupCTX();
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
    },

    /** Initial coords of shape */
    getStartCoords(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const cX: number = target.getBoundingClientRect().left + window.scrollX;
      const cY: number = target.getBoundingClientRect().top + window.scrollY;
      this.startX = e.pageX - cX;
      this.startY = e.pageY - cY;
    },

    /** Final coords of shape */
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
        this.drawShape();
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

    /** Draw a shape depending on selected shape */
    drawShape() {
      if (this.selectedShape === TRIANGLE) {
        this.drawTriangle();
      } else if (this.selectedShape === CIRCLE) {
        this.drawCircle();
      } else if (this.selectedShape === RECTANGLE) {
        this.drawRectangle();
      } else if (this.selectedShape === ELLIPSE) {
        this.drawEllipse();
      } else if (this.selectedShape === OCTAGON) {
        this.drawOctagon();
      } else if (this.selectedShape === HEXAGON) {
        this.drawHexagon();
      } else if (this.selectedShape === STAR) {
        this.drawStar();
      } else if (this.selectedShape === DIAMOND) {
        this.drawDiamond();
      }
    },

    drawEllipse() {
      const { canvas, ctx } = this.setupCTX();
      let mainAxis: number = Math.sqrt(
        Math.abs(
          Math.pow(Math.abs(this.endX - this.startX), 2) -
            Math.pow(Math.abs(this.endY - this.startY), 2)
        )
      );
      let angle: number = Math.atan(
        (this.endY - this.startY) / (this.endX - this.startX)
      );
      let coordX: number =
        this.endX > this.startX
          ? this.startX + (this.endX - this.startX) / 2
          : this.endX + (this.startX - this.endX) / 2;
      let coordY: number =
        this.endY > this.startY
          ? this.startY + (this.endY - this.startY) / 2
          : this.endY + (this.startY - this.endY) / 2;
      if (ctx) {
        ctx.beginPath();
        ctx.ellipse(
          coordX,
          coordY,
          mainAxis / 2,
          mainAxis / 4,
          angle,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawCircle() {
      const { canvas, ctx } = this.setupCTX();
      const diameter: number = Math.sqrt(
        Math.abs(
          Math.pow(Math.abs(this.endX - this.startX), 2) -
            Math.pow(Math.abs(this.endY - this.startY), 2)
        )
      );
      if (ctx) {
        ctx.beginPath();
        ctx.arc(
          this.startX + (this.endX - this.startX) / 2,
          this.startY + (this.endY - this.startY) / 2,
          diameter / 2,
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();
        ctx.save();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawStar() {
      const { canvas, ctx } = this.setupCTX();
      let diameter: number = Math.sqrt(
        Math.abs(
          Math.pow(Math.abs(this.endX - this.startX), 2) -
            Math.pow(Math.abs(this.endY - this.startY), 2)
        )
      );
      if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(
          this.startX + (this.endX - this.startX) / 2,
          this.startY + (this.endY - this.startY) / 2
        );
        ctx.moveTo(0, 0 - diameter / 2);
        for (let i = 0; i < 5; i++) {
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, 0 - diameter / 4);
          ctx.rotate(Math.PI / 5);
          ctx.lineTo(0, 0 - diameter / 2);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawRectangle() {
      const { canvas, ctx } = this.setupCTX();
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.startX, this.endY);
        ctx.lineTo(this.endX, this.endY);
        ctx.lineTo(this.endX, this.startY);
        ctx.lineTo(this.startX, this.startY);
        ctx.closePath();
        ctx.stroke();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawDiamond() {
      const { canvas, ctx } = this.setupCTX();
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX + (this.endX - this.startX) / 2, this.startY);
        ctx.lineTo(this.endX, this.startY + (this.endY - this.startY) / 2);
        ctx.lineTo(this.startX + (this.endX - this.startX) / 2, this.endY);
        ctx.lineTo(this.startX, this.startY + (this.endY - this.startY) / 2);
        ctx.lineTo(this.startX + (this.endX - this.startX) / 2, this.startY);
        ctx.stroke();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawHexagon() {
      const { canvas, ctx } = this.setupCTX();
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX + (this.endX - this.startX) / 2, this.startY);
        ctx.lineTo(this.endX, this.startY + (this.endY - this.startY) / 3);
        ctx.lineTo(
          this.endX,
          this.startY + ((this.endY - this.startY) / 3) * 2
        );
        ctx.lineTo(this.startX + (this.endX - this.startX) / 2, this.endY);
        ctx.lineTo(
          this.startX,
          this.startY + ((this.endY - this.startY) / 3) * 2
        );
        ctx.lineTo(this.startX, this.startY + (this.endY - this.startY) / 3);
        ctx.lineTo(this.startX + (this.endX - this.startX) / 2, this.startY);
        ctx.stroke();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawOctagon() {
      const { canvas, ctx } = this.setupCTX();
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX + (this.endX - this.startX) / 3, this.startY);
        ctx.moveTo(
          this.startX + ((this.endX - this.startX) / 3) * 2,
          this.startY
        );
        ctx.lineTo(this.endX, this.startY + (this.endY - this.startY) / 3);
        ctx.lineTo(
          this.endX,
          this.startY + ((this.endY - this.startY) / 3) * 2
        );
        ctx.lineTo(
          this.startX + ((this.endX - this.startX) / 3) * 2,
          this.endY
        );
        ctx.lineTo(this.startX + (this.endX - this.startX) / 3, this.endY);
        ctx.lineTo(
          this.startX,
          this.startY + ((this.endY - this.startY) / 3) * 2
        );
        ctx.lineTo(this.startX, this.startY + (this.endY - this.startY) / 3);
        ctx.lineTo(this.startX + (this.endX - this.startX) / 3, this.startY);
        ctx.closePath();
        ctx.stroke();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },

    drawTriangle() {
      const { canvas, ctx } = this.setupCTX();
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX + (this.endX - this.startX) / 2, this.startY);
        ctx.lineTo(this.startX, this.endY);
        ctx.lineTo(this.endX, this.endY);
        ctx.lineTo(this.startX + (this.endX - this.startX) / 2, this.startY);
        ctx.stroke();
        ctx.closePath();
      }
      this.canvas = canvas;
      this.saveCanvas(canvas);
    },
  },

  mounted() {
    this.initializeCanvas(this.selectedItem);
  },

  updated() {
    console.log("updating");
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.canvas
  border: 1px solid #CCCCCC
</style>
