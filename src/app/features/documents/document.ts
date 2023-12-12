// export interface Document {
//   id:string;
//   title: string;
//   items?: Document[];
// }

export interface Document {
  id:number;
  name: string;
  items?: Document[];
  file_url?: string;
}

export interface Leaf {
  name: string;
  parent?: number|null;
  file?: File|null;
}

export interface RodDocument {
  id:number;
  name: string;
  file: string;
}
