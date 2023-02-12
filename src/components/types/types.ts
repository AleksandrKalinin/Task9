export interface RootState {
  canvas: CanvasState;
}

export interface CanvasState {
  selectedColor: string;
  selectedShape: string;
  lineWidth: number;
  savedItems: Array<any>;
  canvas: HTMLCanvasElement;
}

export interface DatabaseState {
  items: Array<any>;
  areItemsLoaded: boolean;
}
