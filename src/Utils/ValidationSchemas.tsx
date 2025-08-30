import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
});

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Old Password must include at least one special character"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "New Password must include at least one special character"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const SettingSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
});
