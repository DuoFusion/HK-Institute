import { CategoryType } from "./Category";
import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface CourseType extends CommonDataType {
  _id: string;
  name: string;
  image: string;
  feature: boolean;
  action: boolean;
  locked: boolean;
  categoryIds: CategoryType[];
  userIds: string[];
  priority: number;
}

export interface CourseDataResponse extends PageStatus {
  course_data: CourseType[];
}

export interface CourseApiResponse extends MessageStatus {
  data: CourseDataResponse;
}

export interface CourseDescriptionApiResponse extends MessageStatus {
  data: CourseType;
}