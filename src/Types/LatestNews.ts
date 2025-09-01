import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface LatestNewsType extends CommonDataType {
  _id: string;
  thumbnail: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  priority: number;
}

export interface LatestNewsResponse extends PageStatus {
  latestNews_data: LatestNewsType[];
}

export interface LatestNewsApiResponse extends MessageStatus {
  data: LatestNewsResponse;
}

export interface LatestNewsDescriptionApiResponse extends MessageStatus {
  data: LatestNewsType;
}