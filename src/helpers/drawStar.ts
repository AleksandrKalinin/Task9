import { ShapeArgs } from "@/types/types";

export function drawStar(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  const diameter: number = Math.sqrt(
    Math.abs(
      Math.pow(Math.abs(endX - startX), 2) -
        Math.pow(Math.abs(endY - startY), 2)
    )
  );
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.translate(startX + (endX - startX) / 2, startY + (endY - startY) / 2);
    ctx.moveTo(0, 0 - diameter / 2);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - diameter / 4);
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - diameter / 2);
    }
    ctx.closePath();
    ctx.stroke();
    if (isFilled) {
      ctx.fill();
    }
    ctx.restore();
  }
  return canvas;
}
