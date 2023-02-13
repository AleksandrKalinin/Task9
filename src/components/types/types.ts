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
  filteredItems: Array<DatabaseItem>;
  areItemsLoaded: boolean;
  searchQuery: string;
}

export interface DatabaseItem {
  author: string;
  date: TimestampObject;
  id: string;
  link: string;
}

export interface TimestampObject {
  nanoseconds: number;
  seconds: number;
}

export interface LocalItem {
  author: string;
  date: string;
  id: string;
  link: string;
}

export interface GalleryItem {
  author: string;
  date: Date;
  id: string;
  link: string;
}

export interface Shape {
  name: string;
  link: string;
  path: string;
}

/*
export const firestore = getFirestore()

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

export const usersCol = createCollection<DatabaseItem>('items')
*/
