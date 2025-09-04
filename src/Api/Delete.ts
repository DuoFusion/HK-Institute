import { notification } from "antd";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getToken } from "../Utils";
// import { AntdNotification } from "../Utils/toast";
import { HTTP_STATUS } from "../Constant";

async function Delete<T, TInput>(url: string, data?: TInput): Promise<T> {
  const token = getToken();
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
    headers: {
      Authorization: token,
    },
    data,
  };

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === HTTP_STATUS.OK) {
      // AntdNotification(notification, "success", resData.message);
      return resData;
    } else {
      return null as T;
    }
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;

    const responseData = axiosError.response?.data as { message?: string };

    const message = responseData?.message || axiosError.message || "Something went wrong";

    throw new Error(message);
  }
}

export default Delete;
