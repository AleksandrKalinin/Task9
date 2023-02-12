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
  filteredItems: Array<any>;
  areItemsLoaded: boolean;
  searchQuery: string;
}
