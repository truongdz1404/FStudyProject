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
export const LIMIT_SCROLLING_PAGNATION_RESULT = 4;
export const SessionStorageKey = {
  SelectedFilter: "Filter"
};

//TODO: Chuyen no sang phai dotenv "DIT ME TRONG"
export const API_KEY =
  "AK_CS.191baec033b011efb7127b03250987c0.lG7OIri9Waqh4xRrRXm5qLSRhhXsNAhDXqa6Mv1YDERU6Jf1jj6FR2ZY4M2fv8MgU6XwJ2lo";
export const API_GET = "https://oauth.casso.vn/v2/transactions";
