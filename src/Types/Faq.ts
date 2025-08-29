import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface FaqType extends CommonDataType{
  _id: string;
  question: string;
  answer: string;
  priority: number;
}

export interface FaqState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface FaqResponse extends PageStatus {
  faq_data: FaqType[];
}

export interface FaqApiResponse extends MessageStatus{
  data: FaqResponse;
}