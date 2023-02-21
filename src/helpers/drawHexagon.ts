import { ShapeArgs } from "@/types/types";

export function drawHexagon(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY } = shapeArgs;
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(startX + (endX - startX) / 2, startY);
    ctx.lineTo(endX, startY + (endY - startY) / 3);
    ctx.lineTo(endX, startY + ((endY - startY) / 3) * 2);
    ctx.lineTo(startX + (endX - startX) / 2, endY);
    ctx.lineTo(startX, startY + ((endY - startY) / 3) * 2);
    ctx.lineTo(startX, startY + (endY - startY) / 3);
    ctx.lineTo(startX + (endX - startX) / 2, startY);
    ctx.stroke();
  }
  return canvas;
}
