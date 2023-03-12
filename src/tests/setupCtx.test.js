import { setupCTX } from "@/helpers/setupCTX";

const myCanvas = document.createElement("canvas");
const selectedColor = "#222222";
const lineWidth = 3;
const { myCanvasSetup: canvas, ctx } = setupCTX(
  myCanvas,
  selectedColor,
  lineWidth
);
describe("Testing setupCTX helper function", () => {
  test("Function should return canvas and it's context", () => {
    expect(canvas.nodeName.toLowerCase()).toBe("canvas");
    expect(ctx.constructor.name).toBe("CanvasRenderingContext2D");
  });
  test("Color and line width should be equal to arguments", () => {
    expect(ctx.fillStyle).toBe(selectedColor);
    expect(ctx.strokeStyle).toBe(selectedColor);
    expect(ctx.lineWidth).toBe(lineWidth);
  });
});
