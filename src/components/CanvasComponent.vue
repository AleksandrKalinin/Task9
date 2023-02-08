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
import { mapGetters } from "vuex";

export default defineComponent({
  name: "CanvasComponent",
  data() {
    return {
      canvas: null as any,
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

    draw(e: MouseEvent) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },

    startDrawing(e: any) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },

    stopDrawing(e: any) {
      if (this.isDrawing) {
        this.drawOnCanvas(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },

    drawOnCanvas(x1: any, y1: any, x2: any, y2: any) {
      const ctx = this.canvas.getContext("2d");
      ctx.beginPath();
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = this.lineWidth;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },

    getStartCoords(e: any) {
      const cX = e.target.getBoundingClientRect().left + window.scrollX;
      const cY = e.target.getBoundingClientRect().top + window.scrollY;
      this.startX = e.pageX - cX;
      this.startY = e.pageY - cY;
    },

    getEndCoords(e: any) {
      const cX = e.target.getBoundingClientRect().left + window.scrollX;
      const cY = e.target.getBoundingClientRect().top + window.scrollY;
      this.endX = e.pageX - cX;
      this.endY = e.pageY - cY;
      if (this.startX !== this.endX) {
        if (this.startY > this.endY) {
          let tempX = this.startX;
          let tempY = this.startY;
          this.startX = this.endX;
          this.startY = this.endY;
          this.endX = tempX;
          this.endY = tempY;
        }
        this.drawShape(e);
      }
    },

    drawEllipse(e: any) {
      const canvas = this.canvas;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = this.selectedColor;
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = this.lineWidth;
      let mainAxis = Math.sqrt(
        Math.abs(
          Math.pow(Math.abs(this.endX - this.startX), 2) -
            Math.pow(Math.abs(this.endY - this.startY), 2)
        )
      );
      let angle = Math.atan(
        (this.endY - this.startY) / (this.endX - this.startX)
      );
      let coordX =
        this.endX > this.startX
          ? this.startX + (this.endX - this.startX) / 2
          : this.endX + (this.startX - this.endX) / 2;
      let coordY =
        this.endY > this.startY
          ? this.startY + (this.endY - this.startY) / 2
          : this.endY + (this.startY - this.endY) / 2;
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
      this.canvas = canvas;
    },

    drawStar(e: any) {
      const canvas = this.canvas;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = this.selectedColor;
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = this.lineWidth;
      var rot = (Math.PI / 2) * 3;
      var x = this.startX;
      var y = this.startY;
      var step = Math.PI / 5;
      let outerRadius = Math.sqrt(
        Math.pow(this.endX - this.startX, 2) -
          Math.pow(this.endY - this.startY, 2)
      );
      let innerRadius = outerRadius / 2;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY - outerRadius);
      for (var i = 0; i < 5; i++) {
        x = this.startX + Math.cos(rot) * outerRadius;
        y = this.startY + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        x = this.startX + Math.cos(rot) * innerRadius;
        y = this.startY + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(this.startX, this.startY - outerRadius);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.stroke();
      ctx.fillStyle = "skyblue";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      this.canvas = canvas;
    },

    drawRectangle(e: any) {
      const canvas = this.canvas;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = this.selectedColor;
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = this.lineWidth;
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.startX, this.endY);
      ctx.lineTo(this.endX, this.endY);
      ctx.lineTo(this.endX, this.startY);
      ctx.lineTo(this.startX, this.startY);
      ctx.stroke();
      ctx.closePath();
      ctx.closePath();
      this.canvas = canvas;
    },

    drawCircle(e: any) {
      const canvas = this.canvas;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = this.selectedColor;
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = this.lineWidth;
      let diameter = Math.sqrt(
        Math.abs(
          Math.pow(Math.abs(this.endX - this.startX), 2) -
            Math.pow(Math.abs(this.endY - this.startY), 2)
        )
      );
      ctx.arc(
        this.startX + (this.endX - this.startX) / 2,
        this.startY + (this.endY - this.startY) / 2,
        diameter / 2,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.closePath();
      this.canvas = canvas;
    },

    drawTriangle(e: any) {
      const canvas = this.canvas;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = this.selectedColor;
      ctx.strokeStyle = this.selectedColor;
      ctx.lineWidth = this.lineWidth;
      ctx.moveTo(this.startX + (this.endX - this.startX) / 2, this.startY);
      ctx.lineTo(this.startX, this.endY);
      ctx.lineTo(this.endX, this.endY);
      ctx.lineTo(this.startX + (this.endX - this.startX) / 2, this.startY);
      ctx.stroke();
      ctx.closePath();
      this.canvas = canvas;
    },

    checkIfShapeSelected(e: MouseEvent) {
      if (this.selectedShape === "") {
        this.startDrawing(e);
      } else {
        this.getStartCoords(e);
      }
    },

    checkIfShapeActive(e: MouseEvent) {
      if (this.selectedShape === "") {
        this.stopDrawing(e);
      } else {
        this.getEndCoords(e);
      }
    },

    drawShape(e: any) {
      if (this.selectedShape === "triangle") {
        this.drawTriangle(e);
      } else if (this.selectedShape === "circle") {
        this.drawCircle(e);
      } else if (this.selectedShape === "rectangle") {
        this.drawRectangle(e);
      } else if (this.selectedShape === "ellipse") {
        this.drawEllipse(e);
      } else if (this.selectedShape === "octagon") {
        //this.drawOctagon(e);
      } else if (this.selectedShape === "hexagon") {
        //this.drawHexagon(e);
      } else if (this.selectedShape === "star") {
        this.drawStar(e);
      } else if (this.selectedShape === "square") {
        //this.drawSquare(e);
      }
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
