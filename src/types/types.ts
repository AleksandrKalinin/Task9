export interface RootState {
  canvas: CanvasState;
}

export interface CanvasState {
  selectedColor: string;
  selectedShape: string;
  lineWidth: number;
  fillStyle: string;
  canvas: HTMLCanvasElement;
  selectedItem: string;
}

export interface ItemsState {
  items: Array<SingleItem>;
  areItemsLoaded: boolean;
}

export interface SingleItem {
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
  ctx: CanvasRenderingContext2D;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isFilled: boolean;
}

export enum ShapeTypes {
  TRIANGLE = "TRIANGLE",
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  ELLIPSE = "ELLIPSE",
  DIAMOND = "DIAMOND",
  HEXAGON = "HEXAGON",
  OCTAGON = "OCTAGON",
  STAR = "STAR",
}

export enum CanvasModuleMutations {
  SET_COLOR = "SET_COLOR",
  SET_SHAPE = "SET_SHAPE",
  SET_LINE_WIDTH = "SET_LINE_WIDTH",
  SET_FILL_STYLE = "SET_FILL_STYLE",
  SAVE_CANVAS = "SAVE_CANVAS",
  SAVE_SELECTED_ITEM = "SAVE_SELECTED_ITEM",
}

export enum ItemsModuleMutations {
  UPDATE_ITEMS = "UPDATE_ITEMS",
  CHANGE_STATUS = "CHANGE_STATUS",
  DELETE_ITEM = "DELETE_ITEM",
}

export enum ThemeModuleMutations {
  SET_THEME = "SET_THEME",
  COLOR_TOMATO = "#FF6347",
  COLOR_BLUE = "#4169E1",
  COLOR_GREEN = "#299617",
}

export interface Coordinates {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
