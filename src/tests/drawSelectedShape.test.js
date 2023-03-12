import { drawSelectedShape } from "@/core/drawSelectedShape";
import { ShapeTypes } from "@/types/types";
import { ref } from "vue";

const selectedShape = ShapeTypes.TRIANGLE;
const canvas = ref(document.createElement("canvas"));
const ctx = canvas.value.getContext("2d");
const coords = {};
coords.startX = 100;
coords.startY = 100;
coords.endX = 200;
coords.endY = 200;
const isFilled = "outline";
const shapeArgs = { canvas, ctx, ...coords, isFilled };

describe("Testing drawSelectedShape function", () => {
  test("Should return canvas", () => {
    const returnCanvas = drawSelectedShape(shapeArgs, selectedShape);
    expect(returnCanvas.value.nodeName.toLowerCase()).toBe("canvas");
  });
});
