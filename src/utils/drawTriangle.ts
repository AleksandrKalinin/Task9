import { ShapeArgs } from "@/types/types";

export function drawTriangle(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  const canvasValue = canvas as any;
  ctx.clearRect(0, 0, canvasValue.value.width, canvasValue.value.height);
  ctx.beginPath();
  ctx.moveTo(startX + (endX - startX) / 2, startY);
  ctx.lineTo(startX, endY);
  ctx.lineTo(endX, endY);
  ctx.lineTo(startX + (endX - startX) / 2, startY);
  ctx.stroke();
  ctx.closePath();
  if (isFilled) {
    ctx.fill();
  }
  return canvas;
}
