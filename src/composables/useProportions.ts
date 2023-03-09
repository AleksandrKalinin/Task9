import { Ref } from "vue";

export function useProportions(
  canvas: Ref<HTMLCanvasElement | null>,
  defaultWidth?: number,
  defaultHeight?: number
): HTMLCanvasElement | null {
  if (canvas !== null && canvas.value !== null) {
    const ctx: CanvasRenderingContext2D = canvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let width = 0;
    let height = 0;
    if (defaultWidth && defaultHeight) {
      width = defaultWidth - 465 - 90 - 17;
    } else {
      width = document.body.clientWidth - 465 - 90 - 17;
    }
    height = Math.round((width / 3) * 2);
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    return canvas.value;
  } else {
    return null;
  }
}
