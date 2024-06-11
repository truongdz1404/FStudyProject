export enum ResponseStatus {
  SUCCESS = "Success",
  ERROR = "Error",
  WARNING = "Warning",
}
export enum Role {
  USER = "User",
  ADMIN = "Admin",
}

export const PhoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
