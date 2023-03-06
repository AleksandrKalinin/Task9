import { ShapeArgs } from "@/types/types";

export function drawDiamond(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(startX + (endX - startX) / 2, startY);
  ctx.lineTo(endX, startY + (endY - startY) / 2);
  ctx.lineTo(startX + (endX - startX) / 2, endY);
  ctx.lineTo(startX, startY + (endY - startY) / 2);
  ctx.lineTo(startX + (endX - startX) / 2, startY);
  ctx.stroke();
  if (isFilled) {
    ctx.fill();
  }
  return canvas;
}
