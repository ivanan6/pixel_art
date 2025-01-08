export type ErrorCode =
  | "DUPLICATE_USERNAME"
  | "BAD_PICTURE_DATA"
  | "LOGGED_IN"
  | "INCORRECT_CREDENTIALS"
  | "INVALID_DATA"
  | "NO_SUCH_ENTITY"
  | "NOT_YOURS"
  | "NOT_AUTHENTICATED"
  | "INTERNAL_ERROR";


export type APIErrorCommon = {
  failed: true;
  code: ErrorCode;
  extra?: any; // Za dodatne informacije poput validacionih grešaka
};

