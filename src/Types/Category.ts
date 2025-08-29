import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface CategoryType extends CommonDataType {
  _id: string;
  image: string;
  name: string;
  feature: boolean;
  action: boolean;
  priority: number;
}

export interface CategoryDataResponse extends PageStatus {
  category_data: CategoryType[];
}

export interface CategoryApiResponse extends MessageStatus {
  data: CategoryDataResponse;
}
