/** Method for setting up overlay canvas with parameters fillStyle, strokeStyle, lineWidth. Overlay canvas serves for saving temporary data from main canvas before clearing.*/
export function setupOverlayCTX(
  overlayCanvas: HTMLCanvasElement,
  selectedColor: string,
  lineWidth: number
) {
  const ctxo: CanvasRenderingContext2D = overlayCanvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  ctxo.fillStyle = selectedColor;
  ctxo.strokeStyle = selectedColor;
  ctxo.lineWidth = lineWidth;
  const overlayCanvasSetup = overlayCanvas;
  return { overlayCanvasSetup, ctxo };
}
