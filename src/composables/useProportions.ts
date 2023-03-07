import { Ref } from "vue";

export function useProportions(canvas: Ref<HTMLCanvasElement>) {
  if (canvas.value !== null) {
    const ctx: CanvasRenderingContext2D = canvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    const width = document.body.clientWidth - 465 - 90 - 17;
    const height = (width / 3) * 2;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    const value = canvas.value;
    return { value };
  }
}
