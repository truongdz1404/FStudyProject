export interface Topic {
  id: number;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  postCount: number;
  isDeleted: boolean;
  categories: number[];
}

export interface CreateTopicDTO {
  name: string;
  description: string;
  avatar: string;
  banner: string;
  postCount: number;
  isDeleted: boolean;
  categories: number[];
}

export interface UpdateTopicDTO {
  name: string;
  description: string;
  avatar: string;
  banner: string;
  postCount: number;
  isDeleted: boolean;
  categories: number[];
}
