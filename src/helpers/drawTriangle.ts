import { ShapeArgs } from "../components/types/types";

export function drawTriangle(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY } = shapeArgs;
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(startX + (endX - startX) / 2, startY);
    ctx.lineTo(startX, endY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX + (endX - startX) / 2, startY);
    ctx.stroke();
    ctx.closePath();
  }
  return canvas;
}
