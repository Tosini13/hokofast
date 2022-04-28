export enum ECheckTokenMessage {
  "TOKEN_VALID" = "TOKEN_VALID",
  "TOKEN_INVALID" = "TOKEN_INVALID",
  "TOKEN_EXPIRED" = "TOKEN_EXPIRED",
}

export enum EVerifyTokenMessage {
  "TOKEN_INVALID" = "TOKEN_INVALID",
}

export enum EResetPasswordMessage {
  "EMAIL_IS_REQUIRED" = "EMAIL_IS_REQUIRED",
  "EMAIL_SENT" = "EMAIL_SENT",
  "EMAIL_SENT_ERROR" = "EMAIL_SENT_ERROR",
  "INTERNAL_ERROR" = "INTERNAL_ERROR",
}

export enum ESetNewPasswordMessage {
  "TOKEN_IS_REQUIRED" = "TOKEN_IS_REQUIRED",
  "PASSWORD_IS_REQUIRED" = "PASSWORD_IS_REQUIRED",
  "TOKEN_INVALID" = "TOKEN_INVALID",
  "TOKEN_EXPIRED" = "TOKEN_EXPIRED",
  "USER_DOES_NOT_EXISTS" = "USER_DOES_NOT_EXISTS",
  "NEW_PASSWORD_SET" = "NEW_PASSWORD_SET",
}

export enum EIsLoggedIn {
  "LOGGED_IN" = "LOGGED_IN",
  "LOGGED_OUT" = "LOGGED_OUT",
}

export enum ELogIn {
  "INVALID_CREDENTIALS" = "INVALID_CREDENTIALS",
}
