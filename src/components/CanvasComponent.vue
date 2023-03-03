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
<script setup lang="ts">
import { useStore } from "vuex";
import { ref, computed, onMounted, watch } from "vue";
import { setupCTX } from "@/helpers/setupCTX";
import { setupOverlayCTX } from "@/helpers/setupOverlayCTX";
import { drawSelectedShape } from "@/utils/drawSelectedShape";

const store = useStore();

let myCanvas = ref<HTMLCanvasElement | null>(null);
let overlayCanvas = ref<HTMLCanvasElement | null>(null);
let x = 0 as number;
let y = 0 as number;
let isDrawing = false as boolean;
let startX = 0 as number;
let startY = 0 as number;
let endX = 0 as number;
let endY = 0 as number;

const selectedColor = computed(() => store.getters["canvas/selectedColor"]);
const selectedShape = computed(() => store.getters["canvas/selectedShape"]);
const lineWidth = computed(() => store.getters["canvas/lineWidth"]);
const fillStyle = computed(() => store.getters["canvas/fillStyle"]);
const selectedItem = computed(() => store.getters["canvas/selectedItem"]);
const canvasState = computed(() => {
  return selectedItem;
});

watch(canvasState, (newValue) => {
  initializeCanvas(newValue.value);
  initializeOverlayCanvas(newValue.value);
});

function initializeCanvas(canvasLink: string) {
  if (myCanvas.value !== null) {
    const ctx: CanvasRenderingContext2D = myCanvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    if (canvasLink !== "") {
      const image: HTMLImageElement = new Image();
      image.onload = function () {
        ctx.drawImage(image, 0, 0);
      };
      image.src = canvasLink;
    } else if (canvasLink === "") {
      ctx.clearRect(0, 0, myCanvas.value.width, myCanvas.value.height);
    }
  }
}

function initializeOverlayCanvas(canvasLink: string) {
  if (overlayCanvas.value !== null) {
    const ctxo: CanvasRenderingContext2D = overlayCanvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    if (canvasLink !== "") {
      const image: HTMLImageElement = new Image();
      image.onload = function () {
        ctxo.drawImage(image, 0, 0);
      };
      image.src = canvasLink;
    } else if (canvasLink === "") {
      ctxo.clearRect(
        0,
        0,
        overlayCanvas.value.width,
        overlayCanvas.value.height
      );
    }
  }
}

function setProportions() {
  if (myCanvas.value !== null && overlayCanvas.value !== null) {
    const ctx: CanvasRenderingContext2D = myCanvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const ctxo: CanvasRenderingContext2D = overlayCanvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const width = document.body.clientWidth - 465 - 90 - 17;
    const height = (width / 3) * 2;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctxo.canvas.width = width;
    ctxo.canvas.height = height;
  }
}

function draw(e: MouseEvent) {
  if (isDrawing) {
    drawOnCanvas(x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  } else {
    if (e.buttons == 1) {
      getEndCoords(e);
    }
  }
}

/** Start drawing if pen is selected */
function startDrawing(e: MouseEvent) {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
}

/** Stop drawing if pen is selected */
function stopDrawing(e: MouseEvent) {
  if (isDrawing) {
    drawOnCanvas(x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
    const { overlayCanvasSetup } = setupOverlayCTX(
      overlayCanvas.value,
      selectedColor.value,
      lineWidth.value
    );
    store.dispatch("canvas/saveCanvas", overlayCanvasSetup);
  }
}

/** Draw on canvas and save state to overlay */
function drawOnCanvas(x1: number, y1: number, x2: number, y2: number) {
  const { ctx } = setupCTX(
    overlayCanvas.value,
    selectedColor.value,
    lineWidth.value
  );
  if (ctx) {
    ctx.beginPath();
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }
}

/** Starting coordinates of a shape */
function getStartCoords(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const cX: number = target.getBoundingClientRect().left + window.scrollX;
  const cY: number = target.getBoundingClientRect().top + window.scrollY;
  startX = e.pageX - cX;
  startY = e.pageY - cY;
}

/** Final coordinates of a shape */
function getEndCoords(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const cX: number = target.getBoundingClientRect().left + window.scrollX;
  const cY: number = target.getBoundingClientRect().top + window.scrollY;
  endX = e.pageX - cX;
  endY = e.pageY - cY;
  if (startX !== endX) {
    if (startY > endY) {
      let tempX: number = startX;
      let tempY: number = startY;
      startX = endX;
      startY = endY;
      endX = tempX;
      endY = tempY;
    }
    drawShape(e);
  }
}

/** If shape is selected get it's start coords, else start drawing a line */
function checkIfShapeSelected(e: MouseEvent) {
  if (selectedShape.value === "") {
    startDrawing(e);
  } else {
    getStartCoords(e);
  }
}

/** If shape is selected get it's end coords, else end drawing a line */
function checkIfShapeActive(e: MouseEvent) {
  if (selectedShape.value === "") {
    stopDrawing(e);
  } else {
    getEndCoords(e);
  }
}

/** Draw a shape depending on selected shape and save state in to overlay */
function drawShape(e: MouseEvent) {
  const { myCanvasSetup, ctx } = setupCTX(
    myCanvas.value,
    selectedColor.value,
    lineWidth.value
  );
  const { overlayCanvasSetup, ctxo } = setupOverlayCTX(
    overlayCanvas.value,
    selectedColor.value,
    lineWidth.value
  );
  const coords = {
    startX,
    startY,
    endX,
    endY,
  };
  let isFilled = fillStyle.value === "outline" ? false : true;
  const canvas = myCanvasSetup;
  const shapeArgs = { canvas, ctx, ...coords, isFilled };
  const result = drawSelectedShape(
    shapeArgs,
    selectedShape.value
  ) as unknown as HTMLCanvasElement;
  if (e.buttons !== 1) {
    if (result && ctxo) {
      ctxo.drawImage(result, 0, 0);
      ctx.drawImage(result, 0, 0);
    }
    store.dispatch("canvas/saveCanvas", overlayCanvasSetup);
    ctx.clearRect(0, 0, myCanvas.value?.width, myCanvas.value?.height);
  }
}

onMounted(() => {
  initializeCanvas(selectedItem.value);
  initializeOverlayCanvas(selectedItem.value);
  setProportions();
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
