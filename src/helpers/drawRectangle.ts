import { ShapeArgs } from "@/types/types";

export function drawRectangle(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  if (ctx) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, endY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX, startY);
    ctx.lineTo(startX, startY);
    ctx.closePath();
    ctx.stroke();
    if (isFilled) {
      ctx.fill();
    }
  }
  return canvas;
}
