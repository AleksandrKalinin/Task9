import { ShapeArgs } from "@/types/types";

export function drawHexagon(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  const canvasValue = canvas as any;
  ctx.clearRect(0, 0, canvasValue.value.width, canvasValue.value.height);
  ctx.beginPath();
  ctx.moveTo(startX + (endX - startX) / 2, startY);
  ctx.lineTo(endX, startY + (endY - startY) / 3);
  ctx.lineTo(endX, startY + ((endY - startY) / 3) * 2);
  ctx.lineTo(startX + (endX - startX) / 2, endY);
  ctx.lineTo(startX, startY + ((endY - startY) / 3) * 2);
  ctx.lineTo(startX, startY + (endY - startY) / 3);
  ctx.lineTo(startX + (endX - startX) / 2, startY);
  ctx.stroke();
  if (isFilled) {
    ctx.fill();
  }
  return canvas;
}
