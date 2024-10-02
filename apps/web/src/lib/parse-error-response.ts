import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

export function parseErrorResponse(error: any) {
  if (!(error instanceof Error)) {
    return `${error}`;
  }
  // if (error instanceof UnauthorizeError) {
  //   if (!skipAuth) {
  //     const href =  `${window?.location?.origin}/login`;
  //     window.location.href = href;
  //   }

  //   return "Unauthorized";
  // }

  // if (error instanceof ForbiddenError) {
  //   return "FORBIDDEN: You don't have permission to this resource";
  // }

  // if (error instanceof APIError) {
  //   return error.message;
  // }

  if (error instanceof TypeError) {
    return "Server down";
  }

  if (error instanceof FirebaseError) {
    if (error.code === AuthErrorCodes.USER_DELETED) {
      return "User not found.";
    }

    if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
      return "Password incorrect.";
    }

    if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      return "Email or password incorrect.";
    }

    if (error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
      return "Network connection error.";
    }

    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      return "Account already exists with this email address.";
    }

    if (error.code === AuthErrorCodes.EXPIRED_OOB_CODE) {
      return "Verification code expired.";
    }

    if (error.code === AuthErrorCodes.INVALID_OOB_CODE) {
      return "Invalid verification code";
    }

    if (error.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
      return "Too many attempts. Please try again later.";
    }

    return "Something went wrong, please try again";
  }

  return error?.message ?? "Something went wrong, please try again";
}
