import { ShapeArgs } from "@/types/types";

export function drawEllipse(shapeArgs: ShapeArgs) {
  const { canvas, ctx, startX, startY, endX, endY, isFilled } = shapeArgs;
  const mainAxis: number = Math.sqrt(
    Math.abs(
      Math.pow(Math.abs(endX - startX), 2) -
        Math.pow(Math.abs(endY - startY), 2)
    )
  );
  const angle: number = Math.atan((endY - startY) / (endX - startX));
  const coordX: number =
    endX > startX ? startX + (endX - startX) / 2 : endX + (startX - endX) / 2;
  const coordY: number =
    endY > startY ? startY + (endY - startY) / 2 : endY + (startY - endY) / 2;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.ellipse(
      coordX,
      coordY,
      mainAxis / 2,
      mainAxis / 4,
      angle,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    if (isFilled) {
      ctx.fill();
    }
    ctx.closePath();
  }
  return canvas;
}
