"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import forgetPasswordSchema, { ForgetPasswordType } from "../schemas/ForgetPassword.schema";

export default async function ForgetPasswordAction(values: ForgetPasswordType) {
    const validationResult = forgetPasswordSchema.safeParse(values);

    if (!validationResult.success) {
        const errors: Record<string, string> = {};

        validationResult.error?.issues.forEach((issue) => {
            const field = String(issue.path[0]);
            const message = issue.message;

            if (!errors[field]) {
                errors[field] = message;
            }
        });

        return {
            success: false,
            message: `Validation errors`,
            errors,
        };
    }

    try {
        const options: AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            method: "POST",
            data: values,
        };

        const { data } = await axios.request(options);

        // The API usually returns a status text like "success" or a message
        if (data.statusMsg === "success" || data.message === "Reset code sent to your email") {
            return {
                success: true,
                message: data.message || "Reset link sent to your email",
                data,
            };
        }

        return {
            success: false,
            message: data.message || "Something went wrong",
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message;
            return {
                success: false,
                message: errorMessage || "An error occurred while sending the reset link",
            };
        }
        return {
            success: false,
            message: "An error occurred during the request",
        };
    }
}
