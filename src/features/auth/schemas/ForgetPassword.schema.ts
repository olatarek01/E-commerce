import { z } from "zod";

const forgetPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
});

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;

export default forgetPasswordSchema;
