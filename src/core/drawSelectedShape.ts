import { drawTriangle } from "@/core/drawTriangle";
import { drawRectangle } from "@/core/drawRectangle";
import { drawCircle } from "@/core/drawCircle";
import { drawEllipse } from "@/core/drawEllipse";
import { drawHexagon } from "@/core/drawHexagon";
import { drawOctagon } from "@/core/drawOctagon";
import { drawStar } from "@/core/drawStar";
import { drawDiamond } from "@/core/drawDiamond";
import { ShapeTypes, ShapeArgs } from "@/types/types";

export function drawSelectedShape(shapeArgs: ShapeArgs, selectedShape: string) {
  let result = null as unknown as HTMLCanvasElement;
  if (selectedShape === ShapeTypes.TRIANGLE) {
    result = drawTriangle(shapeArgs);
  } else if (selectedShape === ShapeTypes.CIRCLE) {
    result = drawCircle(shapeArgs);
  } else if (selectedShape === ShapeTypes.RECTANGLE) {
    result = drawRectangle(shapeArgs);
  } else if (selectedShape === ShapeTypes.ELLIPSE) {
    result = drawEllipse(shapeArgs);
  } else if (selectedShape === ShapeTypes.OCTAGON) {
    result = drawOctagon(shapeArgs);
  } else if (selectedShape === ShapeTypes.HEXAGON) {
    result = drawHexagon(shapeArgs);
  } else if (selectedShape === ShapeTypes.STAR) {
    result = drawStar(shapeArgs);
  } else if (selectedShape === ShapeTypes.DIAMOND) {
    result = drawDiamond(shapeArgs);
  }
  return result;
}
