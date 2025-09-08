import { AxiosError } from "axios";

export const handleError = (error: AxiosError): never => {
  let message = "An unknown error occurred.";

  if (error.response) {
    const data: any = error.response.data;
    message = data?.message || data?.error || message;
    throw {
      status: error.response.status,
      message,
      data,
    };
  } else if (error.request) {
    throw { status: 0, message: "No response from server" };
  } else {
    throw { status: 0, message: error.message };
  }
};
