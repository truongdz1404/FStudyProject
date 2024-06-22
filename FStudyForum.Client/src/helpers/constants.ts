export const ROLE = {
  User: "User",
  Admin: "Admin"
};

export const PHONE_EXP =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$|^$/;

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];
export const MAX_FILE_SIZE = 5000000; // 5MB
