export interface User {
  username: string;
  email: string;
  roles: Array<string>;
  avatar: string;
}

export interface EditUser {
  username: string;
  oldRoles: Array<string>;
  newRoles: Array<string>;
  moderatorTopics?: Array<string>;
}
