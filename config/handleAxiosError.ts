import axios from "axios";

export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      code: error.response.data?.code || error.response.status,
      message: error.response.data?.error || "An unknown error occurred",
    };
  }

  return {
    code: 500,
    message:  "Network error or unexpected issue occurred",
  };
};
