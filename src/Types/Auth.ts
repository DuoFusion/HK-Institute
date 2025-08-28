import { MessageStatus } from "./CoreComponents";

// ************ Login ***********
export interface LoginPayload {
  email: string;
  password: string;
}

export interface User extends LoginPayload{
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userType: string;
  image:string;
}

export interface LoginResponse extends MessageStatus{
  data: {
    token: string;
    user: User;
  };
}


// ************ Change Password ***********

export interface ChangePasswordPayload {
  email?: string | null;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}