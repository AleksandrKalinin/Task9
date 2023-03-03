/** Method for setting up canvas with parameters fillStyle, strokeStyle, lineWidth */
export function setupCTX(
  myCanvas: HTMLCanvasElement,
  selectedColor: string,
  lineWidth: number
) {
  const canvas = myCanvas as any;
  const ctx: CanvasRenderingContext2D = canvas.value.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  ctx.fillStyle = selectedColor;
  ctx.strokeStyle = selectedColor;
  ctx.lineWidth = lineWidth;
  const myCanvasSetup = myCanvas;
  return { myCanvasSetup, ctx };
}
