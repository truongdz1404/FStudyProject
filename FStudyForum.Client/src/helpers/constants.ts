export const ROLE = {
  User: "User",
  Admin: "Admin"
};
export const VOTE_TYPE = {
  UNVOTE: 0,
  UP: 1,
  DOWN: -1
};

export const PHONE_EXP =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$|^$/;

export const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];
export const MAX_FILE_SIZE = 5000000; // 5MB
export const LIMIT_SCROLLING_PAGNATION_RESULT = 1;
export const SessionStorageKey = {
  SelectedFeature: "SelectedFeature",
  SelectedTopic: "selectedTopic"
}
