import { KEYS, Url_Keys } from "../Constant";
import { AboutUsApiResponse, BannerApiResponse, Params, PrivacyPolicyApiResponse, TermsAndConditionsApiResponse } from "../Types";
import { CategoryApiResponse } from "../Types/Category";
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
};

export default Queries;
