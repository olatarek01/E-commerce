"use server";

import { SignupSchema } from "@/schemas/Signup.schema";
import { SignupFormValues } from "../types/Signup.types";
import axios, { AxiosRequestConfig } from "axios";

export default async function signupActions(values: SignupFormValues) {
  const validationResult = SignupSchema.safeParse(values);

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

  const { terms, ...requestBody } = values;

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
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
      message: data.message || "Signup failed",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "An error occurred during signup. Please try again later.",
    };
  }
}
