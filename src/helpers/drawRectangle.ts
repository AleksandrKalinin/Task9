import { ShapeArgs } from "@/types/types";

export function drawRectangle(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY } = shapeArgs;
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, endY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX, startY);
    ctx.lineTo(startX, startY);
    ctx.closePath();
    ctx.stroke();
  }
  return canvas;
}
