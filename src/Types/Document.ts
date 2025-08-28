import { CommonDataType, MessageStatus } from "./CoreComponents";

export interface TermsAndConditionsType extends CommonDataType {
  _id: string;
  termsCondition: string;
}

export interface TermsAndConditionsApiResponse extends MessageStatus {
  data: TermsAndConditionsType;
}

export interface PrivacyPolicyType extends CommonDataType {
  _id: string;
  privacyPolicy: string;
}

export interface PrivacyPolicyApiResponse extends MessageStatus {
  data: PrivacyPolicyType;
}

export interface AboutUsType extends CommonDataType {
  _id: string;
  aboutUs: string;
}

export interface AboutUsApiResponse extends MessageStatus {
  data: AboutUsType;
}
