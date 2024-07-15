import { Topic } from "yet-another-react-lightbox";

export interface Feed {
  id: number;
  name: string;
  description: string;
  topics: Topic[];
}

export interface CreateFeed {
  name: string;
  description: string;
}
