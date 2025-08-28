import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface BannerType extends CommonDataType {
  _id: string;
  image: string;
  youtubeLink: string;
  title: string;
  action: boolean;
  priority: number;
}

export interface BannerDataResponse extends PageStatus {
  banner_data: BannerType[];
}

export interface BannerApiResponse extends MessageStatus {
  data: BannerDataResponse;
}
