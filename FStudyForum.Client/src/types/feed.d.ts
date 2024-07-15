import { Topic } from "./topic";

export interface Feed {
  id: number;
  name: string;
  author: string;
  description: string;
  topics: Topic[];
}

export interface CreateFeed {
  name: string;
  description: string;
}
