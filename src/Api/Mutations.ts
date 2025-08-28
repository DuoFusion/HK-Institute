import { KEYS, Url_Keys } from "../Constant";
import { ChangePasswordPayload, LoginPayload, LoginResponse } from "../Types";
import { useApiPost } from "./hooks";
import Post from "./Post";

const Mutations = {
  // ************ Auth ***********
  useLogin: () => useApiPost<LoginPayload, LoginResponse>([KEYS.LOGIN], (input) => Post(Url_Keys.Auth.Login, input, false)),
  useChangePassword: () => useApiPost<ChangePasswordPayload, void>([KEYS.ChANGE_PASSWORD], (input) => Post(Url_Keys.Auth.ChangePassword, input)),
};

export default Mutations;
