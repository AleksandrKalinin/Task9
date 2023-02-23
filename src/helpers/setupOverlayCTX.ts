/** Method for setting up overlay canvas with parameters fillStyle, strokeStyle, lineWidth. Overlay canvas serves for saving temporary data from main canvas before clearing.*/
export function setupOverlayCTX(
  overlayCanvas: HTMLCanvasElement,
  selectedColor: string,
  lineWidth: number
) {
  const ctxo: CanvasRenderingContext2D | null = overlayCanvas.getContext("2d");
  if (ctxo) {
    ctxo.fillStyle = selectedColor;
    ctxo.strokeStyle = selectedColor;
    ctxo.lineWidth = lineWidth;
  }
  return { overlayCanvas, ctxo };
}
