import { Ref } from "vue";

export function useProportions(
  canvas: Ref<HTMLCanvasElement | null>
): HTMLCanvasElement | null {
  if (canvas !== null && canvas.value !== null) {
    const ctx: CanvasRenderingContext2D = canvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const width = document.body.clientWidth - 465 - 90 - 17;
    const height = (width / 3) * 2;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    return canvas.value;
  } else {
    return null;
  }
}
