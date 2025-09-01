import { FormEvent, ReactNode } from "react";
import type { GlobalConfigProps } from "antd/es/config-provider";
import { InputProps } from "reactstrap";
import { GetProp, UploadProps } from "antd";
import { UploadListType } from "antd/es/upload/interface";
import { Params } from "./Api";

export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}
export interface FetchApiParams {
  page?: number;
  limit?: number;
  search?: string;
  typeFilter?: string;
  category?: string;
  id?: string;
  courseFilter?: string;
  blockFilter?: string;
  role?: string;
  senderId?: string;
  receiverId?: string;
}

export interface CustomCheckboxType {
  register: any;
  name: string;
  title?: string;
}

export interface SvgProps {
  iconId: string | undefined;
  className?: string;
  style?: {
    height?: number;
    width?: number;
    fill?: string;
    marginRight?: number;
  };
  onClick?: () => void;
}

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  style?: Object;
  height?: number;
  id?: string;
  title?: string;
  width?: number;
}

export interface BreadcrumbsProps {
  mainTitle: string;
  parent: string;
}

export interface TypeFilterData {
  value?: string;
  label?: string;
}

export interface CardHeaderProp {
  title?: string;
  headClass?: string;
  tagClass?: string;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
  Search?: (key: string) => void;
  searchClass?: string;
  btnTitle?: string;
  btnClick?: () => void;
  btnLink?: string;
  typeFilter?: (id: string) => void;
  typeFilterData?: TypeFilterData[];
  rowClass?: string;
}

export interface ModalPassPropsType {
  isModal: boolean;
  setModal: (isEdit: boolean) => void;
  link?: string;
  pdf?: string;
}

export interface CustomTypeaheadType {
  errors: any;
  control: any;
  title?: string;
  name?: string;
  options?: any;
  disabled?: boolean;
  allowNew?: boolean;
  required?: boolean;
  onChangeOverride?: (selected: any[], onChange: (val: any) => void) => void;
}

export interface SelectOption {
  label: string;
  id?: string;
  customOption?: boolean;
  value?: string;
}

export interface InformationProp {
  headerTitle?: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}


export type AntdNotificationType = "success" | "error" | "info" | "warning" | "open";

export interface GlobalConfigPropsWithStack extends GlobalConfigProps {
  stack?: {
    threshold?: number;
  };
}


// ************ Form/Input Fields ***********

export interface TextInputProps extends InputProps {
  label?: string;
  name: string;
  children?: ReactNode;
  required?: boolean;
  inputGroupIcon?: any;
}

// ************ Common Api Data Type ***********

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface PageStatus {
  totalData: number;
  state: PageState;
}

export interface MessageStatus {
  status: number;
  message: string;
  error: Record<string, unknown>;
}

export interface CommonDataType {
  isDeleted?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ************ Upload ***********

export interface UploadResponse {
  data: string;
  error: Record<string, unknown>;
  message: string;
  status: number;
}

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface ImageUploadProps {
  multiple?: boolean;
  name?: string;
  accept?: string;
  isListType?: UploadListType;
  label?: string;
  required?: boolean;
}

// ************ Basic Table Filter Helper Options ***********

export interface UseBasicTableFilterHelperOptions {
  initialParams?: Params;
  debounceDelay?: number;
  sortKey?: string;
}