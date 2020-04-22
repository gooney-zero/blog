


export interface ResGetTagsBody {
  tagList: TagItem[];
  count: number;
}

export interface TagItem {
  creator: string;
  updater: string;
  id: number;
  createdTime: string;
  updatedTime: string;
  name: string;
}