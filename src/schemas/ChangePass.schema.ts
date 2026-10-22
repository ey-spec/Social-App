import * as zod from "zod";

export const ChangePasswordSchema = zod
  .object({
    password: zod.string().nonempty("Current password is required"),
    newPassword: zod
      .string()
      .nonempty("New password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
        "Password must include an uppercase letter, a lowercase letter, and a special character",
      ),
    confirmPassword: zod.string().nonempty("Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = zod.infer<typeof ChangePasswordSchema>;
