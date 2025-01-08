export enum LoginError {
    INVALID_DATA = 'INVALID_DATA',
    LOGGED_IN = 'LOGGED_IN',
    INCORRECT_CREDENTIALS = 'INCORRECT_CREDENTIALS',
  }

  // type ZodIssue = {
  //   message: string;
  //   path: string[];
  //   // Dodatne karakteristike koje ZodIssues mogu imati, zavisi od implementacije
  // };
  
  // export type APIErrorCommon = {
  //   failed: true;
  //   code: ErrorCode;
  //   extra?: ZodIssue[]; // Polje koje se koristi za dodatne informacije u slučaju validacijskih grešaka
  // };
  
  // type ErrorCode =
  //   | "DUPLICATE_USERNAME"
  //   | "BAD_PICTURE_DATA"
  //   | "LOGGED_IN"
  //   | "INCORRECT_CREDENTIALS"
  //   | "INVALID_DATA"
  //   | "NO_SUCH_ENTITY"
  //   | "NOT_YOURS"
  //   | "NOT_AUTHENTICATED"
  //   | "INTERNAL_ERROR";

