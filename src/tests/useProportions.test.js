import { useProportions } from "@/composables/useProportions";
import { ref } from "vue";

const canvas = ref(document.createElement("canvas"));
const canvasWithParams = useProportions(canvas, 1000, 500);
const ctx = canvasWithParams.getContext("2d");
const width = 1000 - 465 - 90 - 17;
const height = Math.round((width / 3) * 2);

describe("Testing useProportions composable", () => {
  test("Testing canvas width", () => {
    expect(ctx.canvas.width).toEqual(width);
  });
  test("Testing canvas height", () => {
    expect(ctx.canvas.height).toEqual(height);
  });
});
