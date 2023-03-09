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
import { ref, computed, onMounted, watch, Ref } from "vue";
import { setupCTX } from "@/helpers/setupCTX";
import { setupOverlayCTX } from "@/helpers/setupOverlayCTX";
import { drawSelectedShape } from "@/utils/drawSelectedShape";
import { Coordinates } from "@/types";
import { useProportions } from "@/composables/useProportions";

const store = useStore();

const myCanvas: Ref<HTMLCanvasElement | null> = ref(null);
const overlayCanvas: Ref<HTMLCanvasElement | null> = ref(null);
const x: Ref<number> = ref(0);
const y: Ref<number> = ref(0);
const isDrawing: Ref<boolean> = ref(false);
const startX: Ref<number> = ref(0);
const startY: Ref<number> = ref(0);
const endX: Ref<number> = ref(0);
const endY: Ref<number> = ref(0);

const newCanvas: Ref<HTMLCanvasElement | null> = ref(
  document.createElement("canvas")
);
console.log("new", newCanvas.value);
const newCTX = newCanvas.value?.getContext("2d");
console.log(newCTX?.canvas);

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
  myCanvas.value = useProportions(myCanvas);
  overlayCanvas.value = useProportions(overlayCanvas);
  newCanvas.value = useProportions(newCanvas);
}

function draw(e: MouseEvent) {
  if (isDrawing.value) {
    drawOnCanvas(x.value, y.value, e.offsetX, e.offsetY);
    x.value = e.offsetX;
    y.value = e.offsetY;
  } else {
    if (e.buttons == 1) {
      getEndCoords(e);
    }
  }
}

/** Start drawing if pen is selected */
function startDrawing(e: MouseEvent) {
  x.value = e.offsetX;
  y.value = e.offsetY;
  isDrawing.value = true;
}

/** Stop drawing if pen is selected */
function stopDrawing(e: MouseEvent) {
  if (isDrawing.value) {
    drawOnCanvas(x.value, y.value, e.offsetX, e.offsetY);
    x.value = 0;
    y.value = 0;
    isDrawing.value = false;
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
    ctx.strokeStyle = selectedColor.value;
    ctx.lineWidth = lineWidth.value;
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
  startX.value = e.pageX - cX;
  startY.value = e.pageY - cY;
}

/** Final coordinates of a shape */
function getEndCoords(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const cX: number = target.getBoundingClientRect().left + window.scrollX;
  const cY: number = target.getBoundingClientRect().top + window.scrollY;
  endX.value = e.pageX - cX;
  endY.value = e.pageY - cY;
  if (startX.value !== endX.value) {
    if (startY.value > endY.value) {
      let tempX: number = startX.value;
      let tempY: number = startY.value;
      startX.value = endX.value;
      startY.value = endY.value;
      endX.value = tempX;
      endY.value = tempY;
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
  const coords: Coordinates = {};
  coords.startX = startX.value;
  coords.startY = startY.value;
  coords.endX = endX.value;
  coords.endY = endY.value;
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
  console.log(newCanvas.value);
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
