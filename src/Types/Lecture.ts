import { CommonDataType, MessageStatus, PageStatus } from "./CoreComponents";

export interface LectureType extends CommonDataType{
  _id: string;
  title: string;
  youtubeLink: string;
  priority: number;
  thumbnail: string;
  PDF: string;
  userIds: string[];
}

export interface LectureDataResponse extends PageStatus {
  lecture_data: LectureType[];
}

export interface LectureApiResponse extends MessageStatus {
  data: LectureDataResponse;
}
