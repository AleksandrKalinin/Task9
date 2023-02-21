export interface RootState {
  canvas: CanvasState;
}

export interface CanvasState {
  selectedColor: string;
  selectedShape: string;
  lineWidth: number;
  canvas: HTMLCanvasElement;
  selectedItem: string;
}

export interface DatabaseState {
  items: Array<DatabaseItem>;
  areItemsLoaded: boolean;
  searchQuery: string;
}

export interface DatabaseItem {
  id: string;
  authorId: string;
  author: string;
  date: TimestampObject;
  link: string;
}

export interface TimestampObject {
  nanoseconds: number;
  seconds: number;
}

export interface LocalItem {
  id: string;
  author: string;
  authorId: string;
  date: string;
  link: string;
}

export interface GalleryItem {
  id: string;
  author: string;
  authorId: string;
  date: Date;
  link: string;
}

export interface Shape {
  name: string;
  link: string;
  path: string;
}

export interface User {
  id: string;
  email: string;
}

export interface UsersState {
  usersArray: Array<User>;
}

export interface ThemeState {
  themeSelected: string;
  themeArray: Array<string>;
}

export interface ShapeArgs {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
