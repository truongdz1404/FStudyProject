// types/topic.d.ts
export interface Topic {
  id: number
  name: string
  description: string
  isDeleted: boolean
  categories: number[]
}

export interface CreateTopicDTO {
  name: string
  description: string
  categories: number[]
}

export interface UpdateTopicDTO {
  name: string
  description: string
  categories: number[]
}
export interface TopicBan {
  username: string,
  topicId: number,
  bannedTime: DateTime
}
export interface TopicBanDTO {
  username: string,
  topicId: number,
}
export interface Unlocktime {
  unlockTime: DateTime
}
