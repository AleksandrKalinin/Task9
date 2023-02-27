/** Method for setting up canvas with parameters fillStyle, strokeStyle, lineWidth */
export function setupCTX(
  canvas: HTMLCanvasElement,
  selectedColor: string,
  lineWidth: number
) {
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  ctx.fillStyle = selectedColor;
  ctx.strokeStyle = selectedColor;
  ctx.lineWidth = lineWidth;
  return { canvas, ctx };
}
