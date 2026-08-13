export function getApiErrorMessage(response, fallback = "Something went wrong.") {
  if (!response) {
    return fallback;
  }

  if (response.status === 0) {
    return "Unable to connect to the server. Please try again.";
  }

  switch (response.status) {
    case 401:
      return "Your session has expired. Please log in again.";

    case 403:
      return "You do not have permission to perform this action.";

    case 404:
      return response.data?.error || "The requested resource was not found.";

    case 422:
      return (
        response.data?.errors?.join("\n") ||
        "Please check the information you entered."
      );

    default:
      if (response.status >= 500) {
        return "Something went wrong on the server. Please try again later.";
      }

      return response.data?.error || fallback;
  }
}