import { ShapeArgs } from "@/types/types";

export function drawCircle(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  const diameter: number = Math.sqrt(
    Math.abs(
      Math.pow(Math.abs(endX - startX), 2) -
        Math.pow(Math.abs(endY - startY), 2)
    )
  );
  if (ctx) {
    ctx.beginPath();
    ctx.arc(
      startX + (endX - startX) / 2,
      startY + (endY - startY) / 2,
      diameter / 2,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    if (isFilled) {
      ctx.fill();
    }
    ctx.closePath();
    ctx.save();
  }
  return canvas;
}
