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
  categories: number[];
}

export interface UpdateTopicDTO {
  name: string;
  description: string;
  categories: number[];
}
export interface TopicBan {
  username: string,
  topicId: number,
  action: string,
  bannerTime: number
}
export interface TopicBanDTO {
  username: string,
  topicId: number,
}
export interface Unlocktime {
  unlockTime: DateTime
}
