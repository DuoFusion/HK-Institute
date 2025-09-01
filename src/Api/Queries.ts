import { KEYS, Url_Keys } from "../Constant";
import { AboutUsApiResponse, BannerApiResponse, BlogApiResponse, BlogDescriptionApiResponse, CategoryApiResponse, CourseApiResponse, FaqApiResponse, LatestNewsApiResponse, LatestNewsDescriptionApiResponse, Params, PrivacyPolicyApiResponse, SettingApiResponse, TermsAndConditionsApiResponse } from "../Types";
import { LectureApiResponse } from "../Types/Lecture";
import Get from "./Get";
import { useApiGet } from "./hooks";

const Queries = {
  // ************ About Us ***********
  useGetAboutUs: () => useApiGet<AboutUsApiResponse>([KEYS.ABOUT_US], () => Get(Url_Keys.AboutUs)),

  // ************ Privacy Policy ***********
  useGetPrivacyPolicy: () => useApiGet<PrivacyPolicyApiResponse>([KEYS.PRIVACY_POLICY], () => Get(Url_Keys.PrivacyPolicy)),

  // ************  Terms And Conditions ***********
  useGetTermsAndConditions: () => useApiGet<TermsAndConditionsApiResponse>([KEYS.TERMS_AND_CONDITIONS], () => Get(Url_Keys.TermsAndConditions)),
  // useGetCategory: (params: Params, id?: string) => useApiGet<CategoryApiResponse>([KEYS.CATEGORY.ALL, id, params], () => Get(id ? `${URL_KEYS.CATEGORY.ALL}/${id}` : URL_KEYS.CATEGORY.ALL, params)),

  // ************ Banner ***********
  useGetBanner: (params: Params) => useApiGet<BannerApiResponse>([KEYS.BANNER, params], () => Get(Url_Keys.Banner, params)),

  // ************ Category ***********
  useGetCategory: (params: Params) => useApiGet<CategoryApiResponse>([KEYS.CATEGORY, params], () => Get(Url_Keys.Category, params)),

  // ************ Course ***********
  useGetCourse: (params: Params) => useApiGet<CourseApiResponse>([KEYS.COURSE, params], () => Get(Url_Keys.Course, params)),

  // ************ Blog ***********
  useGetBlog: (params: Params) => useApiGet<BlogApiResponse>([KEYS.BLOG, params], () => Get(Url_Keys.Blog, params)),
  useGetBlogDescription: (id: string) => useApiGet<BlogDescriptionApiResponse>([KEYS.BLOG, id], () => Get(`${Url_Keys.Blog}/${id}`)),

  // ************ Latest News ***********
  useGetLatestNews: (params: Params) => useApiGet<LatestNewsApiResponse>([KEYS.LATEST_NEWS, params], () => Get(Url_Keys.LatestNews, params)),
  useGetLatestNewsDescription: (id: string) => useApiGet<LatestNewsDescriptionApiResponse>([KEYS.LATEST_NEWS, id], () => Get(`${Url_Keys.LatestNews}/${id}`)),
  // ************ Faq ***********
  useGetFaq: () => useApiGet<FaqApiResponse>([KEYS.FAQ], () => Get(Url_Keys.Faq)),

  // ************ Faq ***********
  useGetSetting: (id: string) => useApiGet<SettingApiResponse>([KEYS.USER, id], () => Get(`${Url_Keys.User}/${id}`)),

  // ************ Lecture ***********
  useGetLecture: (params: Params) => useApiGet<LectureApiResponse>([KEYS.LECTURE, params], () => Get(Url_Keys.Lecture, params)),
};

export default Queries;
