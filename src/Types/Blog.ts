import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface BlogType extends CommonDataType{
  _id: string;
  thumbnail: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  priority: number;
}

export interface BlogDataResponse extends PageStatus {
  blog_data: BlogType[];
}

export interface BlogApiResponse extends MessageStatus {
  data: BlogDataResponse;
}
