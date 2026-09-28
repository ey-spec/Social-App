import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .email()
    .nonempty("Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
  password: zod
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      "Password must include an uppercase letter, a lowercase letter, and a special character",
    ),
});

export type LoginFormData = zod.infer<typeof loginSchema>;
