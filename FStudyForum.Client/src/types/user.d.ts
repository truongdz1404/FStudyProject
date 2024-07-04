import { TopicBan } from "./topic";

export interface User {
  username: string;
  email: string;
  roles: Array<string>;
  mods: Array<string>;
  banneds: Array<TopicBan>;
  avatar: string;
}
