import { drawTriangle } from "@/utils/drawTriangle";
import { drawRectangle } from "@/utils/drawRectangle";
import { drawCircle } from "@/utils/drawCircle";
import { drawEllipse } from "@/utils/drawEllipse";
import { drawHexagon } from "@/utils/drawHexagon";
import { drawOctagon } from "@/utils/drawOctagon";
import { drawStar } from "@/utils/drawStar";
import { drawDiamond } from "@/utils/drawDiamond";
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
