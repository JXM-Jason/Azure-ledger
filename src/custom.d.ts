interface RootState {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  createTagError: Error | null;
}
interface RecordItem {
  tags: Tag[];
  notes: string;
  type: string;
  number: number;
  createdAt?: string;
}
interface Tag {
  id: string;
  name: string;
  type?: string;
}

// type TagListModel = {
//   data: Tag[];
//   fetch: () => Tag[];
//   create: (name: string) => "success" | "duplicated";
//   update: (id: string, name: string) => "success" | "duplicated" | "not found";
//   remove: (id: string) => boolean;
//   save: () => void;
// };
// interface Window {
// tagList: Tag[];
// createTag: (name: string) => void;
// removeTag: (name: string) => boolean;
// updateTag: (
//   id: string,
//   name: string
// ) => "success" | "duplicated" | "not found";
// findTag: (name: string) => void;
// recordList: RecordItem[];
// createRecord: (record: RecordItem) => void;
// }
