export const BASE_URL = process.env.REACT_APP_BASE_URL;

const URL = {
  Auth: {
    Login: "/auth/login",
    ChangePassword: "/auth/change-password",
  },
  AboutUs: "/about-us",
  PrivacyPolicy: "/privacy-policy",
  TermsAndConditions: "/terms-condition",
  Banner: "/banner",
  Category: "/category",
  Course:{
    Course:"/course",
    CoursePurchased:"/course/purchased",
    CourseUnPurchased:"/course/unpurchased"
  },
  Blog: "/blog",
  LatestNews: "/latest-news",
  Faq: "/faq",
  User: "/user",
  SettingEdit: "/user/edit",
  Upload: {
    Add: "/upload",
  },
  Lecture:"/lecture"
} as const;

type UrlMap = typeof URL;
type ResolvedUrlMap = {
  [K in keyof UrlMap]: UrlMap[K] extends string ? string : { [P in keyof UrlMap[K]]: string };
};

export const Url_Keys: ResolvedUrlMap = Object.fromEntries(
  Object.entries(URL).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, `${BASE_URL}${value}`];
    } else {
      const nested = Object.fromEntries(Object.entries(value).map(([subKey, path]) => [subKey, `${BASE_URL}${path}`]));
      return [key, nested];
    }
  })
) as ResolvedUrlMap;
