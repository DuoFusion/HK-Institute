import { KEYS, Url_Keys } from "../Constant";
import { ChangePasswordPayload, LoginPayload, LoginResponse, SettingFormValues, UploadResponse } from "../Types";
import { useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  // ************ Auth ***********
  useLogin: () => useApiPost<LoginPayload, LoginResponse>([KEYS.LOGIN], (input) => Post(Url_Keys.Auth.Login, input, false)),
  useChangePassword: () => useApiPost<ChangePasswordPayload, void>([KEYS.ChANGE_PASSWORD], (input) => Post(Url_Keys.Auth.ChangePassword, input)),

  // ************ Setting ***********
  useSetting: () => useApiPost<{ id: string } & SettingFormValues, void>([KEYS.SETTING, KEYS.USER], (input) => Post(Url_Keys.SettingEdit, input)),

  // ************ Upload ***********
  useUpload: () => useApiPost<FormData, UploadResponse>([KEYS.UPLOAD.ADD], (input) => Post(Url_Keys.Upload.Add, input)),
};

export default Mutations;
