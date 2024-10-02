export function parseErrorResponse(error: any) {
  if (!(error instanceof Error)) {
    return `${error}`;
  }

  if (error instanceof TypeError) {
    return "Server down";
  }

  return error.message ?? "Something went wrong, please try again";
}
