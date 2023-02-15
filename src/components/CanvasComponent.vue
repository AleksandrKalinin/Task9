<template>
  <canvas
    @mousemove="draw"
    @mousedown="checkIfShapeSelected"
    @mouseup="checkIfShapeActive"
    ref="myCanvas"
    class="canvas"
    id="myCanvas"
    width="1000"
    height="600"
  ></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

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
    ...mapGetters("canvas", ["selectedColor", "selectedShape", "lineWidth"]),
  },

  methods: {
    /** method for initializing canvas */
    initializeCanvas() {
      const myCanvas: HTMLCanvasElement = this.$refs
        .myCanvas as HTMLCanvasElement;
      this.canvas = myCanvas;
    },

    /** Method for assigning parameters to canvas - lineWidth, strokeStyle, fillStyle */
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

    /** Method checking if shape is selected. If true calculates start coordinates, if false starts drawing a line */
    checkIfShapeSelected(e: MouseEvent) {
      if (this.selectedShape === "") {
        this.startDrawing(e);
      } else {
        this.getStartCoords(e);
      }
    },

    /** Method checking if shape is selected. If true calculates end coordinates, if false stops drawing a line */
    checkIfShapeActive(e: MouseEvent) {
      if (this.selectedShape === "") {
        this.stopDrawing(e);
      } else {
        this.getEndCoords(e);
      }
    },

    /** Method for calling function depending on current selectedShape value  */
    drawShape() {
      if (this.selectedShape === "triangle") {
        this.drawTriangle();
      } else if (this.selectedShape === "circle") {
        this.drawCircle();
      } else if (this.selectedShape === "rectangle") {
        this.drawRectangle();
      } else if (this.selectedShape === "ellipse") {
        this.drawEllipse();
      } else if (this.selectedShape === "octagon") {
        this.drawOctagon();
      } else if (this.selectedShape === "hexagon") {
        this.drawHexagon();
      } else if (this.selectedShape === "star") {
        this.drawStar();
      } else if (this.selectedShape === "diamond") {
        this.drawDiamond();
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

    draw(e: MouseEvent) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },

    drawOnCanvas(x1: number, y1: number, x2: number, y2: number) {
      const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.selectedColor;
        ctx.lineWidth = this.lineWidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
      }
    },

    /** Method setting initial coordinates on m */
    getStartCoords(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const cX: number = target.getBoundingClientRect().left + window.scrollX;
      const cY: number = target.getBoundingClientRect().top + window.scrollY;
      this.startX = e.pageX - cX;
      this.startY = e.pageY - cY;
    },

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

    /** Method for drawing ellipse */
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
    },

    /** Method for drawing circle */
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
    },

    /** Method for drawing star */
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
    },

    /** Method for drawing rectangle */
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
    },

    /** Method for drawing diamond */
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
    },

    /** Method for drawing hexagon */
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
    },

    /** Method for drawing octagon */
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
    },

    /** Method for drawing triangle */
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
    },

    clearCanvas() {
      const canvas: HTMLCanvasElement = this.canvas;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas = canvas;
      }
    },

    saveCanvas() {
      const canvas: HTMLCanvasElement = this.canvas;
      const imgPath: string = canvas.toDataURL("image/png");
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
