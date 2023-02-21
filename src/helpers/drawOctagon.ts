import { ShapeArgs } from "@/types/types";

export function drawOctagon(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY } = shapeArgs;
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(startX + (endX - startX) / 3, startY);
    ctx.moveTo(startX + ((endX - startX) / 3) * 2, startY);
    ctx.lineTo(endX, startY + (endY - startY) / 3);
    ctx.lineTo(endX, startY + ((endY - startY) / 3) * 2);
    ctx.lineTo(startX + ((endX - startX) / 3) * 2, endY);
    ctx.lineTo(startX + (endX - startX) / 3, endY);
    ctx.lineTo(startX, startY + ((endY - startY) / 3) * 2);
    ctx.lineTo(startX, startY + (endY - startY) / 3);
    ctx.lineTo(startX + (endX - startX) / 3, startY);
    ctx.closePath();
    ctx.stroke();
  }
  return canvas;
}
