import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface SettingFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  image?: any;
}

export interface SettingType extends SettingFormValues, CommonDataType {
  _id: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
  lastMessage?: string;
}

export interface SettingResponse extends PageStatus {
  user_data: SettingType[];
}

export interface SettingApiResponse extends MessageStatus {
  data: SettingType;
}
