import z from "zod";

export const shippingAddressSchema = z.object({
  details: z
    .string()
    .nonempty("details is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be at most 200 characters"),
  phone: z
    .string()
    .nonempty("phone is required")
    .regex(/^(\+2)?01[01245][0-9]{8}$/,"Invalid Egyptian Phone Number"),
  city: z
    .string()
    .nonempty("city is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters"),
});

export type ShippingAddressValues = z.infer<typeof shippingAddressSchema>;
