export interface RootState {
  canvas: CanvasState;
}

export interface CanvasState {
  selectedColor: string;
  selectedShape: string;
  lineWidth: number;
}

export interface Shape {
  name: string;
  link: string;
  path: string;
}
