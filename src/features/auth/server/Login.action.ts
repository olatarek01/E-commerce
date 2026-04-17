"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import loginSchema, { LoginScreenType } from "../schemas/Login.schema";

export default async function LoginAction(values: LoginScreenType) {
  const validationResult = loginSchema.safeParse(values);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    if (validationResult.error) {
      validationResult.error?.issues.forEach((issue) => {
        const field = String(issue.path[0]);
        const message = issue.message;

        if (!errors[field]) {
          errors[field] = message;
        }
      });
    }

    return {
      success: false,
      message: `validation errors`,
      errors,
    };
  }

  const { ...requestBody } = values;

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: requestBody,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: data.message,
        data,
      };
    }

    return {
      success: false,
      message: data.message || "Signin failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "Account Already Exists") {
        return {
          success: false,
          message: errorMessage,
          errors: {
            email: "Email already exists",
          },
        };
      }
    }
    return {
      success: false,
      message: "An error occurred during signin",
    };
  }
}
